import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkWordInStorage, saveWordToStorage } from "../../api/databaseApi"; // Updated to use extension storage functions.
import { fetchWordDefinition } from "../../api/dictionaryApi";

interface DictionaryState {
	selectedText: string;
	definition: string;
	isLoading: boolean;
	error: string | null;
	isVisible: boolean;
}

const initialState: DictionaryState = {
	selectedText: "",
	definition: "",
	isLoading: false,
	error: null,
	isVisible: false,
};

// Async thunk for cached definition lookup using extension storage.
export const fetchDefinitionWithDBCheck = createAsyncThunk<string, string, { rejectValue: string }>(
	"dictionary/fetchDefinitionWithDBCheck", // Action type prefix.
	async (word: string, thunkAPI) => {
		try {
			const existing = await checkWordInStorage(word); // Check if the word exists in extension storage.
			if (existing) return existing;

			const meanings = await fetchWordDefinition(word); // Fetch the word's definition from the API.
			const definition = meanings[0]?.definitions[0]?.definition || "Not found"; // Extract the definition.
			await saveWordToStorage(word, definition); // Save the word to extension storage if not already saved.
			return definition;
		} catch (err) {
			return thunkAPI.rejectWithValue("Failed to fetch definition");
		}
	}
);

const dictionarySlice = createSlice({
	name: "dictionary",
	initialState,
	reducers: {
		// Clear state when hiding popup
		hideDictionary: (state) => {
			state.isVisible = false;
			state.selectedText = "";
			state.definition = "";
			state.error = null;
		},
		// Show popup with selected text
		showDictionary: (state, action: PayloadAction<string>) => {
			state.isVisible = true;
			state.selectedText = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Handle async operation states
		builder
			.addCase(fetchDefinitionWithDBCheck.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchDefinitionWithDBCheck.fulfilled, (state, action) => {
				state.isLoading = false;
				state.definition = action.payload;
			})
			.addCase(fetchDefinitionWithDBCheck.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.isLoading = false;
				state.error = action.payload || "Unknown error";
			});
	},
});

export const { hideDictionary, showDictionary } = dictionarySlice.actions;
export default dictionarySlice.reducer;
