import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from './lesson/reducer';
import materialsReducer from './materials/reducer';

const reducer = {
  lesson: lessonReducer,
  materials: materialsReducer,
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
