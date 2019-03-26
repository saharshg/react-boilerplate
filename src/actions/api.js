import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://jsonplaceholder.typicode.com',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
