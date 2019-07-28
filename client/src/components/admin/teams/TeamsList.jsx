import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { teamsListForSelectedCohort } = this.props;

    return (
      <React.Fragment>
        <List size="large">
          {teamsListForSelectedCohort.map(team => (
            <List.Item key={team.teamId}>{team.teamName}</List.Item>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default TeamsList;

TeamsList.propTypes = {
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired
};
