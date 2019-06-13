import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import StudentsView from './student/StudentsView';
import Cohorts from './Cohorts';
import Sprints from './Sprints';
import Teams from './Teams';

const RenderedContent = ({ tabName = 'Students' }) => {
  if (tabName === 'Students') return <StudentsView />;
  if (tabName === 'Cohorts') return <Cohorts />;
  if (tabName === 'Teams') return <Teams />;
  return <Sprints />;
};

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
      <div>
        <Menu tabular>
          <Menu.Item
            name="Students"
            active={activeItem === 'Students'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Cohorts"
            active={activeItem === 'Cohorts'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Sprints"
            active={activeItem === 'Sprints'}
            onClick={this.handleItemClick}
          />
          <Menu.Item name="Teams" active={activeItem === 'Teams'} onClick={this.handleItemClick} />
        </Menu>
        <RenderedContent tabName={activeItem} />
      </div>
    );
  }
}

export default TopPanel;
