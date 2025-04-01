import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { 
	setDefinition, 
	setLoading, 
	setError, 
	hideDictionary 
} from "../store/slices/dictionarySlice";
import { fetchWordDefinition } from "../api/dictionaryApi";

/**
 * DictionaryLookup Component
 * Displays a popup with definitions for selected text on the page
 */
const DictionaryLookup = () => {
	const dispatch = useDispatch();
	const { definition, isLoading, error, isVisible, selectedText } = useSelector((state: RootState) => state.dictionary);
	const dictionaryRef = useRef<HTMLDivElement>(null);

	// Handle clicks outside the dictionary popup
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dictionaryRef.current && !dictionaryRef.current.contains(event.target as Node)) {
				dispatch(hideDictionary());
			}
		};

		// Add click listener when popup is visible
		if (isVisible) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		// Cleanup listener on unmount or when popup is hidden
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isVisible, dispatch]);

	// Fetch definition when selected text changes
	useEffect(() => {
		const lookupSelectedText = async () => {
			if (selectedText) {
				try {
					dispatch(setLoading(true));
					dispatch(setError(null));
					
					// Fetch definition from API
					const meanings = await fetchWordDefinition(selectedText);
					
					// Update state with definition or error message
					if (meanings.length > 0) {
						dispatch(setDefinition(meanings[0].definitions[0]?.definition || "No definition found."));
					} else {
						dispatch(setDefinition("Word not found."));
					}
				} catch (err) {
					dispatch(setError("Failed to fetch definition"));
					dispatch(setDefinition(""));
				} finally {
					dispatch(setLoading(false));
				}
			}
		};

		lookupSelectedText();
	}, [selectedText, dispatch]);

	// Don't render anything if popup is hidden
	if (!isVisible) return null;

	return (
		<div 
			ref={dictionaryRef}
			className="fixed top-4 right-4 bg-white p-4 shadow-lg rounded-lg border z-50"
		>
			<h1 className="text-xl font-bold mb-2">Dictionary Lookup</h1>
			
			{/* Display selected text */}
			{selectedText && (
				<div className="mb-2 p-2 bg-gray-100 rounded">
					<span className="font-medium">Selected text:</span> {selectedText}
				</div>
			)}

			{/* Loading state */}
			{isLoading && <p className="text-gray-600">Loading definition...</p>}

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
