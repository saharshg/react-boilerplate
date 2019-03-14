import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://testerstoreapp.myshopify.com',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
