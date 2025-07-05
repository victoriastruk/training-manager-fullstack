import { configureStore } from '@reduxjs/toolkit';
import trainingsReducer from './slices/trainingsSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    trainingsData: trainingsReducer,
    usersData: usersReducer,
  },
});

export default store;
