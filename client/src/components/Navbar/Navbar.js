import React, { Component } from 'react';
import { Avatar, Icon, Layout, Menu, Drawer, Typography } from 'antd';
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
        </Header>
      );
    }

    return null;
  }

  renderDrawer() {
    const { data } = this.props.currentUser;

    return (
      <Drawer
        title={
          <div className={classes.DrawerTitle}>
            <Avatar src={data.avatar} size='large' />
            <Typography>Welcome, {data.firstName}</Typography>
          </div>
        }
        placement='left'
        closable={false}
        onClose={() => this.setState({ visible: false })}
        visible={this.state.visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
  }

  render() {
    console.log(this.props.currentUser.data);
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
