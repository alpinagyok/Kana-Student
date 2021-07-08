import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Achievement, FetchStatus, IDLE } from '../interfaces';
import achievementsJson from './achievements.json';

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

export const fetchAchievements = createAsyncThunk('achievements/fetchMaterials', async () => {
  // const response = await client.get('/fakeApi/achievements')
  const response = await new Promise((res) => setTimeout(() => res(achievementsJson), 500));
  return response;
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
