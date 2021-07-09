import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ENDPOINT from '../../api/constants';
import { FetchStatus, IDLE, MaterialBlock } from '../interfaces';

type InitialState = {
  materials: MaterialBlock[];
  status: FetchStatus;
  error: string | undefined;
}

const initialState: InitialState = {
  materials: [],
  status: IDLE,
  error: undefined,
};

export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async () => {
  const response = await axios.get<MaterialBlock[]>(`${API_ENDPOINT}/materials`);

  return response.data;
});

const slice = createSlice({
  name: 'materials',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const { setMaterialBlockID } = slice.actions;
export default slice.reducer;
