// content.tsx
// Entry point for browser extension initialization

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import DictionaryLookup from "./components/DictionaryLookup";
import "./styles/tailwind.css";
import { showDictionary } from "./store/slices/dictionarySlice";
import { openDB } from "./api/databaseApi";

// Initialize extension components and event listeners
const init = async () => {
	await openDB(); // Initialize database connection

	// Create container for React app
	const container = document.createElement("div");
	container.id = "dictionary-root";
	document.body.appendChild(container);

	// Render React app with Redux
	const root = ReactDOM.createRoot(container);
	root.render(
		<Provider store={store}>
			<DictionaryLookup />
		</Provider>
	);

	// Handle text selection events
	document.addEventListener("mouseup", (e) => {
		const selection = window.getSelection();
		const selectedText = selection?.toString().trim();

		if (selectedText) {
			store.dispatch(showDictionary(selectedText));
		}
	});
};

init();
