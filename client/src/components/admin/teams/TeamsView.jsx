import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import CreateTeams from './CreateTeams';
import EditTeams from './EditTeams';

const RenderedContent = ({ tabName = 'Create Teams' }) => {
  if (tabName === 'View and Edit Teams') return <EditTeams />;
  return <CreateTeams />;
};

export default class TeamsView extends Component {
  state = { activeItem: 'Create Teams' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name="Create Teams"
                active={activeItem === 'Create Teams'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="View and Edit Teams"
                active={activeItem === 'View/ Edit Teams'}
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
