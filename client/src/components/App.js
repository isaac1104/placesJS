import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUserData } from '../actions';
import Navbar from './Navbar/Navbar';
import Spinner from './Spinner/Spinner';
import requireAuth from '../utils/requireAuth';

const Landing = lazy(() => import('./Landing/Landing'));
const Home = lazy(() => import('./Home/Home'));

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUserData();
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              exact
              path='/'
              render={() => {
                const { data } = this.props.currentUser;
                if (data) {
                  return <Redirect to='/home' />;
                } else {
                  return <Landing />;
                }
              }}
            />
            <Route exact path='/home' component={requireAuth(Home)} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  };
};

export default connect(mapStateToProps, { fetchCurrentUserData })(App);
