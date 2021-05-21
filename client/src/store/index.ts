import { configureStore } from '@reduxjs/toolkit'
import lessonReducer from './lesson/reducer';

const reducer = {
  lesson: lessonReducer
}

export default configureStore({
  reducer,
    devTools: {
      name: 'Kana Student',
      trace: true,
  },
})