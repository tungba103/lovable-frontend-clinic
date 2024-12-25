import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api'

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicApi;
