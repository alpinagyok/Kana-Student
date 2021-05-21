import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Kana {
  id: string;
  name: string;
  imgURL: string;
}

type LessonType = 'guesser' | 'writer' | 'exam'

interface InitialState {
  selectedMaterialsBlock?: string;
  lessonType?: LessonType;
  successStreak: number;
  totalAnswers: number;
  preparedKanas?: Kana[];
  currentKana?: Kana;
}

const initialState: InitialState = {
  successStreak: 0,
  totalAnswers: 0,
}

const slice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setMaterialBlock: (state, { payload }: PayloadAction<{ newMaterial: string }>) => {
      const { newMaterial } = payload
      state.selectedMaterialsBlock = newMaterial
    }
  }
})

export const { setMaterialBlock } = slice.actions;
export default slice.reducer;