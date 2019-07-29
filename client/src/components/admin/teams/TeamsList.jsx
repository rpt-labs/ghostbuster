import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import _ from 'lodash';

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { teamsListForSelectedCohort } = this.props;
    const teamsByTeamType = _.groupBy(teamsListForSelectedCohort, 'teamType');

    return (
      <React.Fragment>
        {Object.keys(teamsByTeamType).map(teamType => (
          <div key={teamType}>
            <h1 key={teamType}>{teamType}</h1>
            {teamsByTeamType[teamType].map(team => (
              <div key={team.id}>{team.teamName}</div>
            ))}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TeamsList;

TeamsList.propTypes = {
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired
};
