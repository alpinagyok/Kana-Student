import {
  createAction, createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
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

export const setPreparedKanas = createAction<Kana[]>('lesson/setPreparedKanas');
export const addPreparedKanas = createAction<Kana[]>('lesson/addPreparedKanas');
export const removePreparedKanas = createAction<Kana[]>('lesson/removePreparedKanas');
export const clearPreparedKanas = createAction('lesson/clearPreparedKanas');

const slice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setMaterialBlock: (state, { payload }: PayloadAction<SimplifiedMaterialBlock>) => {
      // If new block is selected, clear lesson data, else do nothing
      if (state.selectedMaterialsBlock?.id !== payload.id) {
        state.selectedMaterialsBlock = payload;
        state.preparedKanas = [];
      }
    },
    setStreak: (state, { payload }: PayloadAction<boolean>) => {
      state.totalAnswers += 1;
      if (payload) state.successStreak += 1;
      else state.successStreak = 0;
    },
    setLessonType: (state, { payload }: PayloadAction<LessonType>) => {
      state.lessonType = payload;
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
    setCurrentKana: (state, { payload }: PayloadAction<Kana>) => {
      state.currentKana = payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(removePreparedKanas, (state, { payload }) => {
      state.preparedKanas = state.preparedKanas.filter((preparedKana) => (
        !payload.some((payloadKana) => payloadKana.id === preparedKana.id)));
    })
    .addCase(setPreparedKanas, (state, { payload }) => {
      state.preparedKanas = payload;
    })
    .addCase(addPreparedKanas, (state, { payload }) => {
      // Adds only new kanas, makes sure there is no duplication
      payload.forEach((payloadKana) => {
        if (!state.preparedKanas.some((preparedKana) => preparedKana.id === payloadKana.id)) {
          state.preparedKanas.push(payloadKana);
        }
      });
    })
    .addCase(clearPreparedKanas, (state) => {
      state.preparedKanas = [];
    })
    .addMatcher(
      isAnyOf(removePreparedKanas, setPreparedKanas, addPreparedKanas, clearPreparedKanas),
      (state) => {
        state.currentKana = undefined;
        state.successStreak = 0;
        state.totalAnswers = 0;
      },
    ),
});

export const {
  setMaterialBlock,
  setLessonType,
  setStreak,
  shufflePreparedKanas,
  setCurrentKana,
} = slice.actions;

export default slice.reducer;
