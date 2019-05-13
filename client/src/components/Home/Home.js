import React, { Component } from 'react';
import PigeonMap from '../PigeonMap';
import classes from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={classes.HomeContainer}>
        <PigeonMap />
      </div>
    );
  }
}

export default Home;
