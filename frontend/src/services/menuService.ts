import axios from 'axios';
import baseUrl from '../utils/baseurl';

export const fetchMenuData = async () => {
  const response = await axios.get(`${baseUrl}/menu`); 
  return response.data;
};