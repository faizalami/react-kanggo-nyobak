import axiosLib from 'axios';

const axios = axiosLib.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;
