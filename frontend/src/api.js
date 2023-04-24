const API_ENDPOINT = "http://localhost:4001";

const api = {
  fetchCats: async (keyword) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    return res.json();
  },
  fetchRandomCats: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return res.json();
  },
  fetchInfo: async (id) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    return res.json();
  },
};
