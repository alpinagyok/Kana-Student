import { Typography } from '@material-ui/core';
import React from 'react';
import loadingSvg from './loading.svg';
import { ReqStateContainer, ReqtStateImage } from './styles';

interface Props {
  message: string;
}

const Loading: React.FC<Props> = ({ message }) => (
  <ReqStateContainer>
    <ReqtStateImage src={loadingSvg} alt="loading image" />
    <Typography variant="h6" align="center">
      {message}
    </Typography>
  </ReqStateContainer>
);

export default Loading;
