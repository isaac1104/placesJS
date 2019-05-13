import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from './Spinner/Spinner';

const Landing = lazy(() => import('./Landing/Landing'));
const Home = lazy(() => import('./Home/Home'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/home' component={Home} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
