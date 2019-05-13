import React, { Component } from 'react';
import { Avatar, Button, Icon, Layout, Menu, Drawer, Typography } from 'antd';
import { connect } from 'react-redux';
import classes from './Navbar.module.css';

const { Header } = Layout;

class Navbar extends Component {
  state = {
    visible: false
  };

  renderNavbar() {
    const { data } = this.props.currentUser;

    if (data) {
      return (
        <Header>
          <Icon
            className={classes.MenuIcon}
            onClick={() => this.setState({ visible: true })}
            type='menu-unfold'
          />
          <Menu
            className={classes.NavbarMenu}
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
          />
          <div className={classes.AvatarContainer}>
            <Avatar src={data.avatar} size='large' />
            <Typography className={classes.AvatarText}>Welcome, {data.firstName || ''}</Typography>
          </div>
        </Header>
      );
    }

    return null;
  }

  renderDrawer() {
    return (
      <Drawer
        placement='left'
        closable={false}
        onClose={() => this.setState({ visible: false })}
        visible={this.state.visible}
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

  render() {
    return (
      <>
        {this.renderNavbar()}
        {this.renderDrawer()}
      </>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(Navbar);
