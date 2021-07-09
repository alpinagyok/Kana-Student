import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ENDPOINT from '../../api/constants';
import { Achievement, FetchStatus, IDLE } from '../interfaces';

type InitialState = {
  achievements: Achievement[];
  status: FetchStatus;
  error: string | undefined;
}

const initialState: InitialState = {
  achievements: [],
  status: IDLE,
  error: undefined,
};

export const fetchAchievements = createAsyncThunk('achievements/fetchAchievements', async () => {
  const response = await axios.get<Achievement[]>(`${API_ENDPOINT}/achievements`);

  return response.data;
});

const slice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.achievements = action.payload as Achievement[];
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const { setMaterialBlockID } = slice.actions;
export default slice.reducer;
