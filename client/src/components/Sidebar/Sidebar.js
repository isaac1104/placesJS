import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, List, Typography, Icon, Popconfirm, message } from 'antd';
import { fetchSavedPlaces, toggleSidebar, navigateToSelectedPlace, deleteSelectedPlace } from '../../actions'
import classes from './Sidebar.module.css';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchSavedPlaces();
    document.addEventListener('keydown', this.handleEscKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey, false);
  }

  handleEscKey = event => {
    if (event.keyCode === 27) {
      this.props.toggleSidebar();
    }
  }

  renderSavedPlaces() {
    const { savedPlaces: { data }, navigateToSelectedPlace, toggleSidebar, deleteSelectedPlace } = this.props;
    if (data) {
      return data.map(({ uuid, title, description, latitude, longitude }) => (
        <List.Item
          className={classes.SavedPlacesButton}
          key={uuid}
        >
          <Icon type='global' className={classes.GlobeIcon} />
          <Typography
            className={classes.SavedPlacesText}
            onClick={() => navigateToSelectedPlace([latitude, longitude])}
          >
            {title}
          </Typography>
          <Popconfirm
            title='Are you sure you want to delete this place?'
            icon={<Icon type='exclamation' />}
            okType='danger'
            okText='Yes'
            cancelText='No'
            placement='right'
            trigger='click'
            onConfirm={() => deleteSelectedPlace(uuid, () => message.success('Place has been removed successfully'), toggleSidebar)}
          >
            <Icon
              type='delete'
              className={classes.DeleteIcon}
            />
          </Popconfirm>
        </List.Item>
      ));
    }

    return null;
  }

  render() {
    const { sidebarVisibility: { visible }, toggleSidebar } = this.props;
    return (
      <Drawer
        title='My saved places'
        placement='left'
        mask={false}
        visible={visible}
        onClose={() => toggleSidebar()}
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

export default connect(mapStateToProps, { fetchSavedPlaces, toggleSidebar, navigateToSelectedPlace, deleteSelectedPlace })(Sidebar);
