import { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Confirm, Icon, Header } from 'semantic-ui-react';
import _ from 'lodash';
import axios from 'axios';
import EditTeamModal from './EditTeamModal';

const { GHOSTBUSTER_BASE_URL } = process.env;

class TeamsList extends Component {
  constructor(props) {
    super(props);
    const { currentStudents } = this.props;
    this.state = {
      selectedTeamId: null,
      selectedTeamDetails: {},
      openConfirmationModal: false,
      openEditModal: false,
      showStudentsList: false,
      currentStudents
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
    const { teamsListForSelectedCohort, currentStudents } = this.props;
    const selectedTeamDetails = teamsListForSelectedCohort.find(team => team.teamId === id);
    selectedTeamDetails.students.forEach(item => {
      // eslint-disable-next-line array-callback-return
      currentStudents.map(student => {
        if (student.id === item.studentId) {
          // eslint-disable-next-line no-param-reassign
          student.isChecked = true;
        }
      });
    });
    this.setState({ openEditModal: true, selectedTeamId: e.target.value, selectedTeamDetails });
  };

  toggleDisplay = () => {
    const { showStudentsList } = this.state;
    this.setState({ showStudentsList: !showStudentsList });
  };

  closeConfirmationModal = () => this.setState({ openConfirmationModal: false });

  closeEditModal = () => {
    const { currentStudents } = this.props;
    this.setState({
      openEditModal: false,
      showStudentsList: false,
      currentStudents: currentStudents.map(student => Object.assign(student, { isChecked: false }))
    });
  };

  render() {
    const { teamsListForSelectedCohort, selectedCohort, showTeamDetails } = this.props;
    const teamsByTeamType = _.groupBy(teamsListForSelectedCohort, 'teamType');
    const {
      openConfirmationModal,
      openEditModal,
      selectedTeamDetails,
      currentStudents,
      showStudentsList
    } = this.state;

    return (
      <>
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
                      <Button
                        basic
                        color="blue"
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
              showTeamDetails={showTeamDetails}
              toggleDisplay={this.toggleDisplay}
              showStudentsList={showStudentsList}
            />
          </div>
        ))}
      </>
    );
  }
}

export default TeamsList;

TeamsList.propTypes = {
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired,
  currentStudents: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired,
  showTeamDetails: PropTypes.func.isRequired
};
