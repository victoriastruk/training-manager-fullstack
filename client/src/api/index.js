import axios from 'axios';

const httpClient = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/api"});

export const getTrainings = (params) =>
  httpClient.get('/trainings', { params });

export const getTrainingById = (id) => httpClient.get(`/trainings/${id}`);

export const registerOnTraining = (id, data) =>
  httpClient.post(`/trainings/${id}/registration`, data);

export const getUserTrainings = (id) =>
  httpClient.get(`/users/${id}/trainings`);

export const unsubscribeUserFromTraining = (userId, trainingId) =>
  httpClient.delete(`/users/${userId}/trainings`, {
    data: { trainingId },
  });

export const getTrainers = () => httpClient.get(`/users?role=trainer`);

export const createTraining = (data) => httpClient.post(`/trainings`, data);

export const updateTraining = (id, data) =>
  httpClient.patch(`/trainings/${id}`, data);

export const deleteTraining = (id) => httpClient.delete(`/trainings/${id}`);
