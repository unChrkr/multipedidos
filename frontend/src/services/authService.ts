import axios from 'axios';
import baseUrl from '../utils/baseurl';
import { toast } from 'react-toastify';


export const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, data);
    toast.success('Registro efeituado com sucesso!');
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, data);
    toast.success('Login efeituado com sucesso!');
    return response.data;
    
  } catch (error) {
    console.error('Login failed:', error);
    throw error; 
  }
};
