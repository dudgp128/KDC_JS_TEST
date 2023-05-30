import config from "./config.js";

const API_ENDPOINT = config.API_ENDPOINT;
const REQUEST_ERROR = config.REQUEST_ERROR;

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
  fetchCatsLimit: async (keyword, limitCount) => {
    return request(
      `${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limitCount}`
    );
  },
  fetchCatsPage: async (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: async () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchRandomCats: async () => {
    let result = await request(`${API_ENDPOINT}/api/cats/random50`);

    return result.data.slice(0, 5);
  },
  fetchInfo: async (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;
