import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing/Landing';
import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
