import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Kana {
  id: string;
  name: string;
  imgURL: string;
}

type MaterialName = 'Hiragana' | 'Katakana'

type MaterialBlock = {
  name: MaterialName;
  img: string;
  kanas: Kana[];
}

type InitialState = MaterialBlock[]

const initialState: InitialState = [
  {
    name: 'Hiragana',
    img: 'adad',
    kanas: [],
  },
];

const slice = createSlice({
  name: 'materials',
  initialState,
  reducers: {

  },
});

// export const { setMaterialBlock } = slice.actions;
export default slice.reducer;
