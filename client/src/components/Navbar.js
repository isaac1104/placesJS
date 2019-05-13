import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';

const { Header } = Layout;

class Navbar extends Component {
  renderNavbar() {
    const { data } = this.props.currentUser;

    if (data) {
      return (
        <Header>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='1'>nav 1</Menu.Item>
            <Menu.Item key='2'>nav 2</Menu.Item>
            <Menu.Item key='3'>nav 3</Menu.Item>
          </Menu>
        </Header>
      );
    }

    return null;
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
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
