import { Menu } from 'antd';
import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'word',
    };
  }

  render() {
    return (
      <Menu
        onClick={(e) => this.setState({ current: e.key })}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="word">Word</Menu.Item>
        <Menu.Item key="record">Record</Menu.Item>
      </Menu>
    )
  }

}
