import cookies from 'isomorphic-cookie';
import {
  API_URL
} from '../constants';
import axios from 'axios';

module.exports = () => {
  // Grab the token
  const token = cookies.load("token");

  const options = {
    baseURL: `${API_URL}`,
    headers: {
      'authorization': `Bearer ${token}`
    }
  };

  return axios.create(options)
}