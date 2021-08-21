import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/common/Error';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../contexts/authContext';
import { fetchAchievements } from '../../store/achievements/reducer';
import { getAchievements, getAchievementsStatus } from '../../store/achievements/selectors';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../../store/interfaces';
import Achievement from './Achievement';
import { AchievementsCont } from './styles';

const Achievements: React.FC = () => {
  const dispatch = useDispatch();

  const { user, userAchievements } = useAuth();
  const achievements = useSelector(getAchievements);
  const achievementsStatus = useSelector(getAchievementsStatus);
  // keep completed achievements at the bottom of the list
  // TODO: refactor, so that there's no multiple includes checks in this file
  const sortedAchievements = [...achievements].sort((a, b) => (
    Number(userAchievements.includes(a.id)) - Number(userAchievements.includes(b.id))
  ));

  useEffect(() => {
    if (achievementsStatus === IDLE) {
      dispatch(fetchAchievements());
    }
  }, [achievements, dispatch]);

  return (
    <>
      { achievementsStatus === LOADING && (
      <Loading message="Loading achievements" />
      )}
      { achievementsStatus === FAILED && (
      <Error message="Failed to load achievements" />
      )}
      { achievementsStatus === SUCCEEDED
        && (
        <>
          {user === null && <Typography style={{ paddingTop: '2em' }} variant="h5" align="center">Login to see the achievements!</Typography>}
          <AchievementsCont $available={user !== null}>
            {sortedAchievements.map((achievement) => (
              <Achievement
                key={`achievement_${achievement.id}`}
                achievement={achievement}
                isCompleted={userAchievements.includes(achievement.id)}
              />
            ))}
          </AchievementsCont>
        </>
        )}
    </>
  );
};

export default Achievements;
