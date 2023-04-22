const API_ENDPOINT = "http://localhost:4001";

const api = {
  fetchCats: async (keyword) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    return await res.json();
  },
};
