import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/common/Error';
import Loading from '../../components/common/Loading';
import { fetchAchievements } from '../../store/achievements/reducer';
import { getAchievements, getAchievementsStatus } from '../../store/achievements/selectors';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../../store/interfaces';
import Achievement from './Achievement';

const Achievements: React.FC = () => {
  const dispatch = useDispatch();

  const achievements = useSelector(getAchievements);
  const achievementsStatus = useSelector(getAchievementsStatus);

  useEffect(() => {
    if (achievementsStatus === IDLE) {
      dispatch(fetchAchievements());
    }
  }, [achievements, dispatch]);

  let content;
  if (achievementsStatus === LOADING) {
    content = (
      <Loading message="Loading achievements" />
    );
  } else if (achievementsStatus === SUCCEEDED) {
    content = achievements.map((achievement) => (
      <Achievement key={`achievement_${achievement.id}`} achievement={achievement} />
    ));
  } else if (achievementsStatus === FAILED) {
    content = (
      <Error message="Failed to load achievements" />
    );
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Achievements;
