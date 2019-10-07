import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import AddStudent from './AddStudent';
import Dashboard from './Dashboard';

const RenderedContent = ({ tabName = 'Add Student', cohorts }) => {
  if (tabName === 'Student Dashboard') return <Dashboard cohorts={cohorts} />;
  return <AddStudent cohorts={cohorts} />;
};

RenderedContent.propTypes = {
  tabName: PropTypes.string.isRequired,
  cohorts: PropTypes.instanceOf(Array).isRequired
};

class StudentsView extends Component {
  state = { activeItem: 'Add Student' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { cohorts } = this.props;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name="Add Student"
                active={activeItem === 'Add Student'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Student Dashboard"
                active={activeItem === 'Student Dashboard'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Segment>
              <RenderedContent tabName={activeItem} cohorts={cohorts} />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default StudentsView;

StudentsView.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired
};
