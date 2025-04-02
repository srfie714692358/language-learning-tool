import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import DictionaryLookup from "./components/DictionaryLookup";
import "./styles/tailwind.css";
import { showDictionary } from "./store/slices/dictionarySlice";
import { openDB } from './api/databaseApi';

/**
 * Initialize the dictionary lookup extension
 * Creates a container for the React app and sets up event listeners
 */
const init = async () => {
	await openDB();

	// Create and append container for React app
	const container = document.createElement("div");
	container.id = "dictionary-root";
	document.body.appendChild(container);

	// Initialize React app with Redux provider
	const root = ReactDOM.createRoot(container);
	root.render(
		<Provider store={store}>
			<DictionaryLookup />
		</Provider>
	);

	// Listen for text selection events
	document.addEventListener("mouseup", (e) => {
		const selection = window.getSelection();
		const selectedText = selection?.toString().trim();

		// Show dictionary popup if text is selected
		if (selectedText) {
			store.dispatch(showDictionary(selectedText));
		}
	});
};

// Start the extension
init();
