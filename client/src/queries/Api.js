const axios = require('axios');

const Api = {
  get: (url, params = {}) => axios.get(url, { params }),
  post: (url, data = {}) => axios.post(url, data),
  delete: (url, params = {}) => axios.delete(url, { params }),
  put: (url, data = {}) => axios.put(url, data)
};

export { Api as default };
