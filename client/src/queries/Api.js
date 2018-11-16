const axios = require('axios');

export const Api = {
  get: (url, params = {}) => {
    return axios.get(url, { params });
  },
  post: (url, data = {}) => {
    return axios.post(url, data, { params });
  },
  delete: (url, params = {}) => {
    return axios.delete(url, { params });
  },
  put: (url, data = {}) => {
    return axios.put(url, data, { params });
  }
};

