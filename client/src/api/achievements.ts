import axios from 'axios';
import {
  Achievement,
  LessonType,
} from '../store/interfaces';
import API_ENDPOINT from './constants';

const checkForNewAchievements = async (
  materialId: string,
  lessonType: LessonType,
  successStreak: number,
  totalAnswers: number,
): Promise<Achievement[]> => {
  try {
    const res = await axios.post(`${API_ENDPOINT}/achievements/check`,
      new URLSearchParams({
        materialId,
        lessonType,
        successStreak: `${successStreak}`,
        totalAnswers: `${totalAnswers}`,
      }), {
        headers: { authorization: `Bearer ${localStorage.getItem('kanaToken')}` },
      });
    return res.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err?.response?.data ?? 'Error checking for new achievements');
    return [];
  }
};

export default checkForNewAchievements;
