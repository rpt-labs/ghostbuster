import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'semantic-ui-react';
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
            <h1>{teamType}</h1>
            <Card.Group>
              {teamsByTeamType[teamType].map(team => (
                <Card key={team.id}>
                  {console.log('team', team)}
                  <Card.Content>
                    <Card.Header>{team.teamName}</Card.Header>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
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
