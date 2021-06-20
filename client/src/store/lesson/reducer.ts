import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Kana, LessonType, SimplifiedMaterialBlock,
} from '../interfaces';

interface InitialState {
  selectedMaterialsBlock?: SimplifiedMaterialBlock;
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
    setMaterialBlock: (state, { payload }: PayloadAction<SimplifiedMaterialBlock>) => {
      // If new block is selected, clear lesson data, else do nothing
      if (state.selectedMaterialsBlock?.id !== payload.id) {
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
    shufflePreparedKanas: (state) => {
      const { preparedKanas } = state;
      // shuffle prepped kanas
      for (let i = preparedKanas.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [preparedKanas[i], preparedKanas[j]] = [preparedKanas[j], preparedKanas[i]];
      }
      state.currentKana = preparedKanas[Math.floor(Math.random() * 4)];
    },
    clearPreparedKanas: (state) => {
      state.preparedKanas = [];
    },
    setCurrentKana: (state, { payload }: PayloadAction<Kana>) => {
      state.currentKana = payload;
    },
  },
});

export const {
  setMaterialBlock,
  setLessonType,
  setPreparedKanas,
  addPreparedKanas,
  removePreparedKanas,
  shufflePreparedKanas,
  clearPreparedKanas,
  setCurrentKana,
} = slice.actions;
export default slice.reducer;
