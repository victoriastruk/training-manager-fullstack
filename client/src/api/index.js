import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTrainings = () => httpClient.get('/trainings');
export const getTrainingById = (id) => httpClient.get(`/trainings/${id}`);

export const registerOnTraining = (id, data) =>
  httpClient.post(`/trainings/${id}/registration`, data);

export const getUserTrainings = (id) =>
  httpClient.get(`/users/${id}/trainings`);

export const unsubscribeUserFromTraining = (userId, trainingId) =>
  httpClient.delete(`/users/${userId}/trainings`, {
    data: { trainingId },
  });
