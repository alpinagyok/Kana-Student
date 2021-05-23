import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from './lesson/reducer';
import materialsReducer from './materials/reducer';

const reducer = {
  lesson: lessonReducer,
  materials: materialsReducer,
};

export default configureStore({
  reducer,
  devTools: {
    name: 'Kana Student',
    trace: true,
  },
});
