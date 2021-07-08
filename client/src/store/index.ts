import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from './lesson/reducer';
import materialsReducer from './materials/reducer';
import achievementsReducer from './achievements/reducer';

const reducer = {
  lesson: lessonReducer,
  materials: materialsReducer,
  achievements: achievementsReducer,
};

const rootStore = configureStore({
  reducer,
  devTools: {
    name: 'Kana Student',
    trace: true,
  },
});

export type GetState = ReturnType<typeof rootStore.getState>;

export default rootStore;
