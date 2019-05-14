import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Drawer, List, Typography, Icon } from 'antd';
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
        <List.Item
          className={classes.SavedPlacesButton}
          onClick={() => navigateToSelectedPlace([latitude, longitude], hideSidebar)}
          key={title}
        >
          <Typography className={classes.SavedPlacesText}><Icon type='global' /> {title}</Typography>
        </List.Item>
      ));
    }

    return null;
  }

  render() {
    const { sidebarVisibility: { visible }, hideSidebar } = this.props;
    return (
      <Drawer
        title='My saved places'
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

const mapStateToProps = ({ savedPlaces, sidebarVisibility }) => {
  return {
    savedPlaces,
    sidebarVisibility
  };
};

export default connect(mapStateToProps, { fetchSavedPlaces, hideSidebar, navigateToSelectedPlace })(Sidebar);
