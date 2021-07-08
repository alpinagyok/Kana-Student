import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchStatus, IDLE, MaterialBlock } from '../interfaces';
import materialsJson from './materials.json';

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
  // const response = await client.get('/fakeApi/materials')
  const response = await new Promise((res) => setTimeout(() => res(materialsJson), 500));
  return response;
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
        state.materials = action.payload as MaterialBlock[];
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const { setMaterialBlockID } = slice.actions;
export default slice.reducer;
