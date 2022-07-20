import axios from 'axios';

const BACKEND_URI = process.env.BASE_API_URL || 'http://localhost:3000';

const http = axios.create({
  baseURL: `${BACKEND_URI}/api`,
});

http.interceptors.request.use(function (config) {
  const currentToken = localStorage.getItem('TOKEN');

  if (currentToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${currentToken}`;
  }

  return config;
});

// http.interceptors.response.use(
//   (r) => r,
//   (err) => {
//     console.error(err);
//     console.log({response: err?.response?.data});
//     throw err;
//   }
// );

export const fetchUser = async (): Promise<any> => {
  const response = await http.get('/user');
  return response.data;
};
