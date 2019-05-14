import React, { Component } from 'react';
import { Avatar, Icon, Layout, Menu, Typography } from 'antd';
import { connect } from 'react-redux';
import { showSidebar } from '../../actions';
import Sidebar from '../Sidebar/Sidebar';
import classes from './Navbar.module.css';

const { Header } = Layout;

class Navbar extends Component {
  state = {
    visible: false
  };

  renderNavbar() {
    const { currentUser: { data }, showSidebar } = this.props;

    if (data) {
      return (
        <Header className={classes.Navbar}>
          <Icon
            className={classes.MenuIcon}
            onClick={() => showSidebar()}
            type='menu-unfold'
          />
          <Menu
            className={classes.NavbarMenu}
            theme='dark'
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

  renderSidebar() {
    const { currentUser: { data } } = this.props;

    if (data) {
      return <Sidebar />;
    }

    return null;
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
        {this.renderSidebar()}
      </>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  };
};

export default connect(mapStateToProps, { showSidebar })(Navbar);
