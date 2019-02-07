import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class TopPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'Students' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu tabular>
        <Menu.Item name="Students" active={activeItem === 'Students'} onClick={this.handleItemClick} />
        <Menu.Item name="Cohorts" active={activeItem === 'Cohorts'} onClick={this.handleItemClick} />
        <Menu.Item name="Sprints" active={activeItem === 'Sprints'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default TopPanel;
