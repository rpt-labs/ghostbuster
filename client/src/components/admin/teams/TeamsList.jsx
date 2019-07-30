import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react';
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
            <h1>{`${teamType} teams`}</h1>
            <Card.Group>
              {teamsByTeamType[teamType].map(team => (
                <Card key={team.id}>
                  <Card.Content>
                    <Card.Header>{team.teamName}</Card.Header>
                    <Card.Description>
                      {team.students.map(student => (
                        <li>{student.name}</li>
                      ))}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      <Button basic color="blue" disabled>
                        Edit Team
                      </Button>
                      <Button basic color="red">
                        Delete Team
                      </Button>
                    </div>
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
