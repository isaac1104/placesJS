import React, { Component } from 'react';
import { Avatar, Button, Icon, Layout, Menu, Typography, Popover } from 'antd';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions';
import SearchInput from '../SearchInput/SearchInput';
import Sidebar from '../Sidebar/Sidebar';
import classes from './Navbar.module.css';

const { Header } = Layout;

class Navbar extends Component {
  state = {
    visible: false
  };

  renderNavbar() {
    const { currentUser: { data }, toggleSidebar } = this.props;

    if (data) {
      return (
        <Header className={classes.Navbar}>
          <Icon
            className={classes.MenuIcon}
            onClick={() => toggleSidebar()}
            type='menu-unfold'
          />
          <Menu
            className={classes.NavbarMenu}
            theme='dark'
          />
          <div className={classes.SearchContainer}>
            <SearchInput />
          </div>
          <div className={classes.AvatarContainer}>
            <Popover
              trigger='click'
              placement='left'
              content={(
                <Button
                  block
                  href='/api/signout'
                  type='danger'
                  icon='logout'
                  className={classes.SignoutButton}
                >
                  Sign Out
                </Button>
              )}
            >
              <Avatar src={data.avatar} size='large' className={classes.NavbarAvatar} />
            </Popover>
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

export default connect(mapStateToProps, { toggleSidebar })(Navbar);
