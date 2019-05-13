import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import classes from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={classes.HomeContainer}>
        <Map center={[50.879, 4.6997]} zoom={12}>
          <Marker anchor={[50.874, 4.6947]} payload={1} onClick={({ event, anchor, payload }) => {}} />
        </Map>
      </div>
    );
  }
}

export default Home;
