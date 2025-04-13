import axios from "axios";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export const fetchWordDefinition = async (word: string): Promise<any[]> => {
	try {
		const response = await axios.get(`${API_URL}/${word}`);
		return response.data[0]?.meanings || [];
	} catch (error) {
		console.error("Error fetching definition:", error);
		return [];
	}
};
