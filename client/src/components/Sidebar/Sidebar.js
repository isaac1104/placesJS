import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, List, Typography, Icon, Popconfirm, message } from 'antd';
import { fetchSavedPlaces, hideSidebar, navigateToSelectedPlace, deleteSelectedPlace } from '../../actions'
import classes from './Sidebar.module.css';

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchSavedPlaces();
  }

  renderSavedPlaces() {
    const { savedPlaces: { data }, navigateToSelectedPlace, hideSidebar, deleteSelectedPlace } = this.props;
    if (data) {
      return data.map(({ uuid, title, description, latitude, longitude }) => (
        <List.Item
          className={classes.SavedPlacesButton}
          key={uuid}
        >
          <Icon type='global' className={classes.GlobeIcon} />
          <Typography
            className={classes.SavedPlacesText}
            onClick={() => navigateToSelectedPlace([latitude, longitude], hideSidebar)}
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
            onConfirm={() => deleteSelectedPlace(uuid, () => message.success('Place has been removed successfully'), hideSidebar)}
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

export default connect(mapStateToProps, { fetchSavedPlaces, hideSidebar, navigateToSelectedPlace, deleteSelectedPlace })(Sidebar);
