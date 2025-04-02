import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchDefinitionWithDBCheck, hideDictionary } from "../store/slices/dictionarySlice";

const DictionaryLookup = () => {
	const dispatch = useDispatch<AppDispatch>();
	const popupRef = useRef<HTMLDivElement>(null);
	const { definition, isLoading, error, isVisible, selectedText } = useSelector((state: RootState) => state.dictionary);

	// Handle outside clicks to close popup
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				dispatch(hideDictionary());
			}
		};

		if (isVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isVisible, dispatch]);

	// Fetch definition when selected text changes
	useEffect(() => {
		if (selectedText) {
			dispatch(fetchDefinitionWithDBCheck(selectedText));
		}
	}, [selectedText, dispatch]);

	if (!isVisible) return null;

	return (
		<div
			ref={popupRef}
			className="fixed top-4 right-4 p-4 shadow-lg rounded-lg border z-50 
                 bg-white text-black dark:bg-gray-800 dark:text-white"
		>
			<h1 className="text-xl font-bold mb-2">Dictionary Lookup</h1>

			{/* Selected text display */}
			{selectedText && (
				<div className="mb-2 p-2 bg-gray-100 rounded dark:bg-gray-700">
					<span className="font-medium">Selected text:</span> {selectedText}
				</div>
			)}

			{/* Loading state */}
			{isLoading && <p className="text-gray-600 dark:text-gray-400">Loading definition...</p>}

			{/* Error message */}
			{error && <p className="text-red-500 mt-2">{error}</p>}

			{/* Definition display */}
			{definition && (
				<div className="mt-4">
					<h2 className="font-bold">Definition:</h2>
					<p>{definition}</p>
				</div>
			)}
		</div>
	);
};

export default DictionaryLookup;
