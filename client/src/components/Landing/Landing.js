import React from 'react';
import { Button, Typography } from 'antd';
import classes from './Landing.module.css';

const { Title } = Typography;

const Landing = () => (
  <div className={classes.LandingContainer}>
    <div>
      <Title className={classes.LandingTitle}>
        <span role='img' aria-label='earth-emoji'>🌎</span> Welcome to PlacesJS
      </Title>
      <Button
        block
        icon='google'
        type='primary'
        size='large'
        shape='round'
        href='/auth/google'
      >
        Sign-in with Google
      </Button>
    </div>
  </div>
);

export default Landing;
