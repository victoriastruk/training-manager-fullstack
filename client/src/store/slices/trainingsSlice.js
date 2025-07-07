import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const TRAINING_SLICE_NAME = 'trainings';

const initialState = {
  trainings: [],
  training: null,
  userTrainings: [],
  registrationResult: null,
  filter: 'all',
  customDateRange: null,
  isFetching: false,
  error: null,
};

export const createTrainingThunk = createAsyncThunk(
  `${TRAINING_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createTraining(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const updateTrainingThunk = createAsyncThunk(
  `${TRAINING_SLICE_NAME}/update`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const {
        data: { data: updated },
      } = await API.updateTraining(id, data);
      return updated;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getTrainingsThunk = createAsyncThunk(
  `/get/${TRAINING_SLICE_NAME}`,
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filter, customDateRange } = getState().trainingsData;
      const params = {};
      if (filter && filter !== 'all') {
        if (filter === 'other' && customDateRange) {
          params.startDate = customDateRange.startDate;
          params.endDate = customDateRange.endDate;
        } else if (filter !== 'other') {
          params.dateFilter = filter;
        }
      }

      const {
        data: { data },
      } = await API.getTrainings(params);
      return data;
    } catch (err) {
      return rejectWithValue({
        errors: err.response?.data || { message: err.message },
      });
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
      await API.unsubscribeUserFromTraining(id, trainingId);
      return { id, trainingId };
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const deleteTrainingThunk = createAsyncThunk(
  `${TRAINING_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.deleteTraining(payload);
      return payload;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const trainingsSlice = createSlice({
  name: TRAINING_SLICE_NAME,
  initialState,
  reducers: {
    clearRegistrationResult: (state) => {
      state.registrationResult = null;
    },
    setFilter(state, action) {
      state.filter = action.payload;
      if (action.payload !== 'other') {
        state.customDateRange = null;
      }
    },
    setCustomDateRange(state, action) {
      state.customDateRange = action.payload;
    },
  },
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

    builder.addCase(createTrainingThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createTrainingThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.trainings = [...state.trainings, payload];
    });
    builder.addCase(createTrainingThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(updateTrainingThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(updateTrainingThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const index = state.trainings.findIndex((t) => t.id === payload.id);
      if (index !== -1) {
        state.trainings[index] = payload;
      }
    });
    builder.addCase(updateTrainingThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(deleteTrainingThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteTrainingThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.trainings = state.trainings.filter((t) => t.id !== payload);
    });
    builder.addCase(deleteTrainingThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});
export const { clearRegistrationResult, setFilter, setCustomDateRange } = trainingsSlice.actions;
const { reducer } = trainingsSlice;

export default reducer;
