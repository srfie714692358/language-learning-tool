import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface defining the shape of our dictionary state
interface DictionaryState {
  selectedText: string;    // The text selected by the user
  definition: string;      // The definition of the selected text
  isLoading: boolean;      // Loading state for API calls
  error: string | null;    // Error message if API call fails
  isVisible: boolean;      // Controls visibility of the dictionary popup
}

// Initial state for the dictionary slice
const initialState: DictionaryState = {
  selectedText: '',
  definition: '',
  isLoading: false,
  error: null,
  isVisible: false,
};

// Create the dictionary slice with reducers
const dictionarySlice = createSlice({
  name: 'dictionary',
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
      state.selectedText = '';
      state.definition = '';
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { 
  setDefinition, 
  setLoading, 
  setError, 
  showDictionary, 
  hideDictionary 
} = dictionarySlice.actions;

export default dictionarySlice.reducer;