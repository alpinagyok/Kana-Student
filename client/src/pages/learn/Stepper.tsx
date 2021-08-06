import React, { useState } from 'react';
import LessonStarter from './lessonStarter';
import LessonTypeChooser from './LessonTypeChooser';

const Stepper: React.FC = () => {
  const [step, setStep] = useState(0);

  const incrementStep = () => {
    setStep((prevState) => prevState + 1);
  };
  const decrementStep = () => {
    setStep((prevState) => prevState - 1);
  };

  const steps = [
    (<LessonStarter incrementStep={incrementStep} />),
    (<LessonTypeChooser decrementStep={decrementStep} />),
  ];

  return (
    <div>
      {steps[step]}
    </div>
  );
};

export default Stepper;
