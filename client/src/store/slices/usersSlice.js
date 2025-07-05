import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const USERS_SLICE_NAME = 'users';

const initialState = {
  trainers: [],
  isFetching: false,
  error: null,
};

export const getTrainersThunk = createAsyncThunk(
  `get/${USERS_SLICE_NAME}/trainers`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getTrainers();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTrainersThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTrainersThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.trainers = payload;
    });
    builder.addCase(getTrainersThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const {reducer} = usersSlice;

export default reducer;