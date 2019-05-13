import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Drawer, Typography } from 'antd';
import { hideSidebar } from '../../actions'
import classes from './Sidebar.module.css';

class Sidebar extends Component {
  render() {
    const { sidebarVisibility: { visible }, hideSidebar } = this.props;

    return (
      <Drawer
        placement='left'
        closable={false}
        onClose={() => hideSidebar()}
        visible={visible}
      >
        <Typography>Some contents...</Typography>
        <Typography>Some contents...</Typography>
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

const mapStateToProps = ({ sidebarVisibility }) => {
  return {
    sidebarVisibility
  };
};

export default connect(mapStateToProps, { hideSidebar })(Sidebar);
