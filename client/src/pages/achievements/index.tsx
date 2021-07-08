import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAchievements } from '../../store/achievements/reducer';
import { getAchievements, getAchievementsStatus } from '../../store/achievements/selectors';
import { IDLE, LOADING, SUCCEEDED } from '../../store/interfaces';
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
      <div><h1>Loading</h1></div>
    );
  } else if (achievementsStatus === SUCCEEDED) {
    content = achievements.map((achievement) => (
      <Achievement achievement={achievement} />
    ));
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Achievements;
