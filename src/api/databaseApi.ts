// db.ts
const DB_NAME = "LanguageLearningDB";
const STORE_NAME = "words";

let db: IDBDatabase;

export const openDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onerror = () => reject("Database error");
		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};
		request.onupgradeneeded = () => {
			db = request.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: "word" });
			}
		};
	});
};

export const checkWordInDB = async (word: string): Promise<string | null> => {
	if (!db) await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readonly");
		const store = transaction.objectStore(STORE_NAME);
		const request = store.get(word);
		request.onsuccess = () => resolve(request.result?.definition || null);
		request.onerror = () => reject("Error checking word");
	});
};

export const saveWordToDB = async (word: string, definition: string): Promise<void> => {
	if (!db) await openDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);
		store.put({ word, definition });
		transaction.oncomplete = () => resolve();
		transaction.onerror = () => reject("Error saving word");
	});
};
