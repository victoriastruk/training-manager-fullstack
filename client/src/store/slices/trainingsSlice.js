import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const TRAINING_SLICE_NAME = 'trainings';

const initialState = {
  trainings: [],
  training: null,
  userTrainings: [],
  registrationResult: null,
  isFetching: false,
  error: null,
};

export const getTrainingsThunk = createAsyncThunk(
  `/get/${TRAINING_SLICE_NAME}`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getTrainings();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getTrainingByIdThunk = createAsyncThunk(
  `/get/${TRAINING_SLICE_NAME}/byId`,
  async (id, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getTrainingById(id);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const registerOnTrainingThunk = createAsyncThunk(
  `/post/${TRAINING_SLICE_NAME}/registration`,
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await API.registerOnTraining(id, values);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getUserTrainingsThunk = createAsyncThunk(
  `/get/${TRAINING_SLICE_NAME}/usersId`,
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.getUserTrainings(id);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const unsubscribeUserFromTrainingThunk = createAsyncThunk(
  `delete/${TRAINING_SLICE_NAME}/unsubscribe`,
  async ({ id, trainingId }, { rejectWithValue }) => {
    try {
      const { data } = await API.unsubscribeUserFromTraining(id, trainingId);
      return { id, trainingId };
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);
const trainingsSlice = createSlice({
  name: TRAINING_SLICE_NAME,
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getTrainingsThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTrainingsThunk.fulfilled, (state, { payload }) => {
      state.trainings = [...payload];
      state.isFetching = false;
    });
    builder.addCase(getTrainingsThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(getTrainingByIdThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTrainingByIdThunk.fulfilled, (state, { payload }) => {
      state.training = payload;
      state.isFetching = false;
    });
    builder.addCase(getTrainingByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(registerOnTrainingThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(registerOnTrainingThunk.fulfilled, (state, { payload }) => {
      state.registrationResult = payload;
      state.isFetching = false;
    });
    builder.addCase(registerOnTrainingThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(getUserTrainingsThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserTrainingsThunk.fulfilled, (state, { payload }) => {
      state.userTrainings = payload;
      state.isFetching = false;
    });
    builder.addCase(getUserTrainingsThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(unsubscribeUserFromTrainingThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(
      unsubscribeUserFromTrainingThunk.fulfilled,
      (state, { payload }) => {
        state.userTrainings = state.userTrainings.filter(
          (t) => t.id !== payload.trainingId
        );
        state.isFetching = false;
      }
    );
    builder.addCase(
      unsubscribeUserFromTrainingThunk.rejected,
      (state, { payload }) => {
        state.error = payload;
        state.isFetching = false;
      }
    );
  },
});

const { reducer } = trainingsSlice;

export default reducer;
