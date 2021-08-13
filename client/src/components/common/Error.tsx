import React from 'react';
import { Typography } from '@material-ui/core';
import { ReqStateContainer, ReqtStateImage } from './styles';
import sadCat from './sad_cat.gif';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => (
  <ReqStateContainer>
    <ReqtStateImage src={sadCat} alt="error image" />
    <Typography color="error" variant="subtitle1" align="center">
      Error:
      {' '}
      {message}
    </Typography>
  </ReqStateContainer>
);

export default Error;
