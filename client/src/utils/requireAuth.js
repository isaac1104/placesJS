import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.redirectUser();
    }

    componentDidUpdate() {
      this.redirectUser();
    }

    redirectUser() {
      const { isFetching, data } = this.props.currentUser;
      if (isFetching === null) return;
      if (!isFetching && typeof data !== 'object') {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props}/>;
    }
  }

  const mapStateToProps = ({ currentUser }) => {
    return { currentUser };
  };

  return withRouter(connect(mapStateToProps, null)(ComposedComponent));
}
