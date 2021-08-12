import { Container, Typography } from '@material-ui/core';
import React from 'react';

const Footer: React.FC = () => (
  <div style={{ borderTop: '1px solid gray' }}>
    <Container
      style={{
        padding: '1.3em',
      }}
      maxWidth="lg"
    >
      <Typography variant="h6" align="center">
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
