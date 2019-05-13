import React, { Component } from 'react';
import { Icon, Layout, Menu, Drawer } from 'antd';
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
    return (
      <Drawer
        title='Basic Drawer'
        placement='left'
        closable
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
