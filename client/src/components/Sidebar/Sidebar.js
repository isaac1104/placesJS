import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, List, Typography, Icon } from 'antd';
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
          <Icon type='global' className={classes.GlobeIcon} />
          <Typography className={classes.SavedPlacesText}>{title}</Typography>
          <Icon type='delete' className={classes.DeleteIcon} />
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
