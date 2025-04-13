const STORAGE_KEY = "savedWords"; // Key to store the list of words in extension storage.

// Check if a word exists in the extension's storage.
export const checkWordInStorage = async (word: string): Promise<string | null> => {
	const result = await chrome.storage.local.get(STORAGE_KEY); // Retrieve saved words from storage.
	const savedWords = result[STORAGE_KEY] || []; // Default to an empty array if no words are saved.
	const entry = savedWords.find((w: any) => w.word === word); // Find the word in the saved list.
	return entry ? entry.definition : null; // Return the definition if found, otherwise null.
};

// Save a word-definition pair to the extension's storage if it doesn't already exist.
export const saveWordToStorage = async (word: string, definition: string): Promise<void> => {
	const result = await chrome.storage.local.get(STORAGE_KEY); // Retrieve saved words from storage.
	const savedWords = result[STORAGE_KEY] || []; // Default to an empty array if no words are saved.
	if (!savedWords.some((w: any) => w.word === word)) {
		// Check if the word is already saved.
		await chrome.storage.local.set({
			[STORAGE_KEY]: [...savedWords, { word, definition }], // Add the new word to the list.
		});
	}
};
