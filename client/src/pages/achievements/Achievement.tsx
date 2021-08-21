import { Typography } from '@material-ui/core';
import React from 'react';
import { Achievement as IAchievement } from '../../store/interfaces';
import { AchievementImage, AchievemntPaper, Ribbon } from './styles';

interface Props {
  achievement: IAchievement;
  isCompleted?: boolean;
}

const Achievement: React.FC<Props> = ({ achievement, isCompleted = false }) => {
  const {
    name, description, icon,
  } = achievement;

  return (
    <AchievemntPaper elevation={isCompleted ? 6 : 2}>
      {isCompleted && <Ribbon variant="h6">Done!</Ribbon>}
      <AchievementImage src={icon} alt="Achievement icon" />
      <Typography variant="h5" align="center">
        {name}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {description}
      </Typography>
    </AchievemntPaper>
  );
};

export default Achievement;
