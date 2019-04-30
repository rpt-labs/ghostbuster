import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import GithubActivity from './GithubActivity';

const RenderedContent = ({ tabName = 'Add Student' }) => {
  if (tabName === 'View and Edit Student') return <EditStudent />;
  if (tabName === 'Github Activity') return <GithubActivity />;
  return <AddStudent />;
};

export default class StudentSideBar extends Component {
  state = { activeItem: 'Add Student' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

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
                name="View and Edit Student"
                active={activeItem === 'View and Edit Student'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Github Activity"
                active={activeItem === 'Github Activity'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Segment>
              <RenderedContent tabName={activeItem} />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
