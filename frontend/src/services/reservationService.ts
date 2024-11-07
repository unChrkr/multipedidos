import axios from 'axios';

export const reserveDate = async (data: { date: string; time: string }, token: string) => {
  try {
    const response = await axios.post(
      '/api/reservation',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao realizar a reserva.');
  }
};
