import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Drawer } from 'antd';
import { fetchSavedPlaces, hideSidebar, navigateToSelectedPlace } from '../../actions'
import classes from './Sidebar.module.css';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchSavedPlaces();
  }

  renderSavedPlaces() {
    const { savedPlaces: { data }, navigateToSelectedPlace, hideSidebar } = this.props;
    if (data) {
      return data.map(({ title, description, latitude, longitude }) => (
        <Button
          className={classes.SavedPlacesTitle}
          onClick={() => navigateToSelectedPlace([latitude, longitude], hideSidebar)}
          key={title}
        >
          {title}
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

export default connect(mapStateToProps, { fetchSavedPlaces, hideSidebar, navigateToSelectedPlace })(Sidebar);
