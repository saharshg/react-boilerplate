import axios from 'axios';

export default axios.create({
  baseURL: 'https://us-central1-react-boilerplate-d8946.cloudfunctions.net',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
