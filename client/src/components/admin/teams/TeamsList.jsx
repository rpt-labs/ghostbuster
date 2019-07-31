import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';

const { GHOSTBUSTER_BASE_URL } = process.env;

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeamId: null
    };
  }

  deleteTeam = teamId => {
    const { showTeamDetails } = this.props;
    axios.delete(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/${teamId}`).then(response => {
      if (response.data && response.status === 200);
      showTeamDetails();
    });
  };

  handleDeleteButtonClick = e => {
    this.setState({ selectedTeamId: e.target.value }, () => {
      const { selectedTeamId } = this.state;
      this.deleteTeam(selectedTeamId);
    });
  };

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
                <Card key={team.teamId}>
                  <Card.Content>
                    <Card.Header>{team.teamName}</Card.Header>
                    <Card.Description>
                      {team.students.map(student => (
                        <li key={student.studentId}>{student.name}</li>
                      ))}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      <Button basic color="blue" disabled value={team.teamId}>
                        Edit Team
                      </Button>
                      <Button
                        basic
                        color="red"
                        onClick={this.handleDeleteButtonClick}
                        value={team.teamId}
                      >
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
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired,
  showTeamDetails: PropTypes.func.isRequired
};
