import React from 'react';

interface Props {
  message: string;
}

const Loading: React.FC<Props> = ({ message }) => (
  <div>
    <h1>Loading</h1>
    <h1>{message}</h1>
  </div>
);

export default Loading;
