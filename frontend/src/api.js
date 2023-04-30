const API_ENDPOINT = "http://localhost:4001";

const REQUEST_ERROR = {
  500: { msg: "요청 실패" },
};

const request = async (url) => {
  try {
    const result = await fetch(url);

    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    alert(error.msg);
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

export default api;
