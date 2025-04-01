import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from './slices/dictionarySlice';

// Configure the Redux store with our reducers
export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 