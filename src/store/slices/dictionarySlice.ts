import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkWordInDB, saveWordToDB } from "../../api/databaseApi";
import { fetchWordDefinition } from "../../api/dictionaryApi";

// Interface defining the shape of our dictionary state
interface DictionaryState {
	selectedText: string; // The text selected by the user
	definition: string; // The definition of the selected text
	isLoading: boolean; // Loading state for API calls
	error: string | null; // Error message if API call fails
	isVisible: boolean; // Controls visibility of the dictionary popup
}

// Initial state for the dictionary slice
const initialState: DictionaryState = {
	selectedText: "",
	definition: "",
	isLoading: false,
	error: null,
	isVisible: false,
};

export const fetchDefinitionWithDBCheck = createAsyncThunk<
	string, // Return type
	string, // Argument type
	{ rejectValue: string } // ThunkAPI config
>("dictionary/fetchDefinitionWithDBCheck", async (word: string, thunkAPI) => {
	try {
		const existing = await checkWordInDB(word);
		if (existing) return existing;

		const meanings = await fetchWordDefinition(word);
		const definition = meanings[0]?.definitions[0]?.definition || "Not found";
		await saveWordToDB(word, definition);
		return definition;
	} catch (err) {
		return thunkAPI.rejectWithValue("Failed to fetch definition");
	}
});

// Create the dictionary slice with reducers
const dictionarySlice = createSlice({
	name: "dictionary",
	initialState,
	reducers: {
		// Set the definition for the selected text
		setDefinition: (state, action: PayloadAction<string>) => {
			state.definition = action.payload;
		},
		// Update loading state during API calls
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		// Set error message if API call fails
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		// Show dictionary popup with selected text
		showDictionary: (state, action: PayloadAction<string>) => {
			state.isVisible = true;
			state.selectedText = action.payload;
		},
		// Hide dictionary popup and clear selected text
		hideDictionary: (state) => {
			state.isVisible = false;
			state.selectedText = "";
			state.definition = "";
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDefinitionWithDBCheck.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchDefinitionWithDBCheck.fulfilled, (state, action) => {
				state.isLoading = false;
				state.definition = action.payload;
			})
			.addCase(fetchDefinitionWithDBCheck.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || "Unknown error";
			});
	},
});

// Export actions and reducer
export const { setDefinition, setLoading, setError, showDictionary, hideDictionary } = dictionarySlice.actions;

export default dictionarySlice.reducer;
