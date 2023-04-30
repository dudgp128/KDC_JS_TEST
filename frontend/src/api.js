const API_ENDPOINT = "http://localhost:4001";

const request = async (url) => {
  try {
    const result = await fetch(url);

    if (result.status === 200) {
      return result.json();
    }
  } catch (error) {
    alert(error);
  }
};

const api = {
  fetchCats: async (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsPage: async (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: async () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchInfo: async (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
