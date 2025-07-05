import { configureStore } from "@reduxjs/toolkit";
import trainingsReducer from "./slices/trainingsSlice";
const store = configureStore({
  reducer: {
    trainingsData: trainingsReducer,
  },
});

export default store;
