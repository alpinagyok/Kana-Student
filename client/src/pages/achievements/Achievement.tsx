import React from 'react';
import { Achievement as IAchievement } from '../../store/interfaces';

interface Props {
  achievement: IAchievement;
  isCompleted?: boolean;
}

const Achievement: React.FC<Props> = ({ achievement, isCompleted = false }) => {
  const {
    id, name, description, icon,
  } = achievement;

  return (
    <div key={`achievement_${id}`}>
      <h1>{name}</h1>
      <h1>{description}</h1>
      <h1>{icon}</h1>
      <h1>{isCompleted}</h1>
    </div>
  );
};

export default Achievement;
