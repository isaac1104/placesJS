import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Drawer } from 'antd';
import { fetchSavedPlaces, hideSidebar } from '../../actions'
import classes from './Sidebar.module.css';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchSavedPlaces();
  }

  renderSavedPlaces() {
    const { savedPlaces: { data } } = this.props;
    if (data) {
      return data.map(place => (
        <Button
          className={classes.SavedPlacesTitle}
          key={place._id}
        >
          {place.title}
        </Button>
      ));
    }

    return null;
  }

  render() {
    const { currentUser: { data: { firstName} }, sidebarVisibility: { visible }, hideSidebar } = this.props;
    return (
      <Drawer
        title={`Saved Places For ${firstName}`}
        placement='left'
        closable={false}
        onClose={() => hideSidebar()}
        visible={visible}
      >
        {this.renderSavedPlaces()}
        <Button
          block
          href='/api/signout'
          type='danger'
          icon='logout'
          className={classes.SignoutButton}
        >
          Sign Out
        </Button>
      </Drawer>
    );
  }
}

const mapStateToProps = ({ currentUser, savedPlaces, sidebarVisibility }) => {
  return {
    currentUser,
    savedPlaces,
    sidebarVisibility
  };
};

export default connect(mapStateToProps, { fetchSavedPlaces, hideSidebar })(Sidebar);
