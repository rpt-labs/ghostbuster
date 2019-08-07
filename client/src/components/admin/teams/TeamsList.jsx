import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Confirm, Icon, Header } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';
import EditTeamModal from './EditTeamModal';

const { GHOSTBUSTER_BASE_URL } = process.env;

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeamId: null,
      selectedTeamDetails: {},
      openConfirmationModal: false,
      openEditModal: false
    };
  }

  deleteTeam = teamId => {
    const { showTeamDetails } = this.props;
    axios.delete(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/${teamId}`).then(response => {
      if (response.data && response.status === 200) {
        showTeamDetails();
        this.setState({ openConfirmationModal: false });
      }
    });
  };

  handleDeleteButtonClick = () => {
    const { selectedTeamId } = this.state;
    this.deleteTeam(selectedTeamId);
  };

  openConfirmationModal = e =>
    this.setState({ openConfirmationModal: true, selectedTeamId: e.target.value });

  openEditModal = e => {
    const id = parseInt(e.target.value, 10);
    const { teamsListForSelectedCohort } = this.props;
    const selectedTeamDetails = teamsListForSelectedCohort.find(team => team.teamId === id);
    this.setState({ openEditModal: true, selectedTeamId: e.target.value, selectedTeamDetails });
  };

  closeConfirmationModal = () => this.setState({ openConfirmationModal: false });

  closeEditModal = () => {
    this.setState({
      openEditModal: false
    });
  };

  render() {
    const { teamsListForSelectedCohort, selectedCohort, currentStudents } = this.props;
    const teamsByTeamType = _.groupBy(teamsListForSelectedCohort, 'teamType');
    const { openConfirmationModal, openEditModal, selectedTeamDetails } = this.state;

    return (
      <React.Fragment>
        <Header as="h2" style={{ textAlign: 'center', marginTop: '15px' }}>
          {`${selectedCohort.name.toUpperCase()} - Teams`}
        </Header>
        {Object.keys(teamsByTeamType).map(teamType => (
          <div key={teamType} style={{ padding: '10px' }}>
            <h1>{`${teamType} teams`}</h1>
            <Card.Group>
              {teamsByTeamType[teamType].map(team => (
                <Card key={team.teamId} style={{ margin: '20px' }}>
                  <Card.Content>
                    <Card.Header>{team.teamName}</Card.Header>
                    <Card.Meta>
                      <p>
                        <Icon name="github" />
                        <span>{team.github}</span>
                      </p>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Card.Description>
                      {team.students.map(student => (
                        <li key={student.studentId}>{student.name}</li>
                      ))}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      {/* #TODO: implement edit team feature */}
                      <Button
                        basic
                        color="blue"
                        disabled
                        value={team.teamId}
                        style={{ float: 'left' }}
                        onClick={e => this.openEditModal(e)}
                      >
                        Edit Team
                      </Button>
                      <Button
                        basic
                        color="red"
                        onClick={this.openConfirmationModal}
                        value={team.teamId}
                        style={{ float: 'right' }}
                      >
                        Delete Team
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
            <Confirm
              open={openConfirmationModal}
              onCancel={this.closeConfirmationModal}
              onConfirm={this.handleDeleteButtonClick}
              content="Delete Team?"
              dimmer="blurring"
              size="mini"
            />
            <EditTeamModal
              close={this.close}
              size="tiny"
              openEditModal={openEditModal}
              closeEditModal={this.closeEditModal}
              selectedCohort={selectedCohort}
              selectedTeamDetails={selectedTeamDetails}
              currentStudents={currentStudents}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TeamsList;

TeamsList.propTypes = {
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired,
  showTeamDetails: PropTypes.func.isRequired
};
