import React from 'react';
import Fade from 'react-reveal/Fade';
import { Button, Typography } from 'antd';
import classes from './Landing.module.css';

const { Title } = Typography;

const Landing = () => (
  <div className={classes.LandingContainer}>
    <div>
      <Fade top>
        <Title className={classes.LandingTitle}><span role='img' aria-label='earth-emoji'>🌎</span> PlacesJS</Title>
      </Fade>
      <Fade bottom>
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
      </Fade>
    </div>
  </div>
);

export default Landing;
