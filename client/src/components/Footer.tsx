import { Container, Typography } from '@material-ui/core';
import React from 'react';

const Footer: React.FC = () => (
  <div style={{ borderTop: '1px solid gray' }}>
    <Container
      style={{
        padding: '1em',
      }}
      maxWidth="lg"
    >
      <Typography style={{ fontSize: '1em' }} variant="h6" align="center">
        Ⓒ
        {' '}
        {new Date().getFullYear()}
        {' '}
        Kana Student
      </Typography>
    </Container>
  </div>
);

export default Footer;
