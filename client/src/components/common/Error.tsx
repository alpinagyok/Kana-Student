import React from 'react';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => (
  <div>
    <h1>Error</h1>
    <h1>{message}</h1>
  </div>
);

export default Error;
