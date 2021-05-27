import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kana, LessonType } from '../interfaces';

interface InitialState {
  selectedMaterialsBlock?: string;
  lessonType?: LessonType;
  successStreak: number;
  totalAnswers: number;
  preparedKanas: Kana[];
  currentKana?: Kana;
}

const initialState: InitialState = {
  successStreak: 0,
  totalAnswers: 0,
  preparedKanas: [],
};

const slice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setMaterialBlockID: (state, { payload }: PayloadAction<string>) => {
      // If new block is selected, clear lesson data, else do nothing
      if (state.selectedMaterialsBlock !== payload) {
        state.selectedMaterialsBlock = payload;
        state.preparedKanas = [];
        state.currentKana = undefined;
        state.successStreak = 0;
        state.totalAnswers = 0;
      }
    },
    setLessonType: (state, { payload }: PayloadAction<LessonType>) => {
      state.lessonType = payload;
    },
    setPreparedKanas: (state, { payload }: PayloadAction<Kana[]>) => {
      state.preparedKanas = payload;
    },
    addPreparedKanas: (state, { payload }: PayloadAction<Kana[]>) => {
      // Adds only new kanas, makes sure there is no duplication
      payload.forEach((payloadKana) => {
        if (!state.preparedKanas.some((preparedKana) => preparedKana.id === payloadKana.id)) {
          state.preparedKanas.push(payloadKana);
        }
      });
    },
    removePreparedKanas: (state, { payload }: PayloadAction<Kana[]>) => {
      state.preparedKanas = state.preparedKanas.filter((preparedKana) => (
        !payload.some((payloadKana) => payloadKana.id === preparedKana.id)));
    },
    clearPreparedKanas: (state) => {
      state.preparedKanas = [];
    },
  },
});

export const {
  setMaterialBlockID,
  setLessonType,
  setPreparedKanas,
  addPreparedKanas,
  removePreparedKanas,
  clearPreparedKanas,
} = slice.actions;
export default slice.reducer;
