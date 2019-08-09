import React, { Component } from 'react';
import { Button, Modal, Input, Form, Select, List, Header, Icon, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import EditStudentAssignments from './EditStudentAssignment';

const { GHOSTBUSTER_BASE_URL } = process.env;

const options = [
  { key: '-', text: '-', value: '-' },
  { key: 'fec', text: 'FEC', value: 'FEC' },
  { key: 'sdc', text: 'SDC', value: 'SDC' },
  { key: 'other', text: 'Other', value: 'other' }
];

class EditTeamModal extends Component {
  constructor(props) {
    super(props);
    const { currentStudents } = this.props;
    this.state = {
      teamName: '',
      github: '',
      teamType: '-',
      studentsAssigned: [],
      showStudentsList: false,
      studentsList: currentStudents.map(student => Object.assign(student, { isChecked: false }))
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedTeamDetails } = this.props;
    const { studentsList } = this.state;
    if (selectedTeamDetails !== prevProps.selectedTeamDetails) {
      selectedTeamDetails.students.forEach(item => {
        studentsList.map(student => {
          if (student.id === item.studentId) {
            // eslint-disable-next-line no-param-reassign
            student.isChecked = true;
          }
        });
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        teamName: selectedTeamDetails.teamName,
        github: selectedTeamDetails.github,
        teamType: selectedTeamDetails.teamType,
        studentsAssigned: selectedTeamDetails.students,
        studentsList
      });
    }
  }

  handleInputChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSelectionChange = (e, { value }) => this.setState({ teamType: value });

  editTeam = () => {
    const { teamName, teamType } = this.state;
    let { github } = this.state;
    const { selectedTeamDetails, selectedCohort, closeEditModal, showTeamDetails } = this.props;
    github = !github ? `${teamType}_${teamName}_${selectedCohort.id}` : github;
    axios
      .put(
        `${GHOSTBUSTER_BASE_URL}/ghostbuster/teams?teamId=${
          selectedTeamDetails.teamId
        }&teamName=${teamName}&teamType=${teamType}&github=${github}&cohortId=${
          selectedTeamDetails.cohortId
        }`
      )
      .then(response => {
        console.log(response.data);
        closeEditModal();
        showTeamDetails();
      })
      .catch(error => {
        throw error;
      });
  };

  toggleDisplay = () => {
    const { showStudentsList } = this.state;
    this.setState({ showStudentsList: !showStudentsList });
  };

  render() {
    const {
      openEditModal,
      closeEditModal,
      selectedTeamDetails,
      selectedCohort,
      currentStudents
    } = this.props;
    const { teamName, github, studentsAssigned, showStudentsList, studentsList } = this.state;
    const isDisabled = !teamName.length;
    let index = options.findIndex(option => option.value === selectedTeamDetails.teamType);
    index = index > 0 ? index : 0;

    return (
      <div>
        <Modal size="small" open={openEditModal} onClose={closeEditModal}>
          <Modal.Header>Edit Team</Modal.Header>
          <Modal.Content>
            <Header as="h4" style={{ color: '#696969' }}>
              {`Cohort: ${selectedCohort.name.toUpperCase()}`}
            </Header>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="Team Name"
                  placeholder="Team Name"
                  value={teamName}
                  name="teamName"
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Field
                  control={Input}
                  label="Github"
                  placeholder="Github Handle"
                  value={github}
                  name="github"
                  onChange={this.handleInputChange}
                />
                <Form.Field
                  control={Select}
                  label="Team Type"
                  options={options}
                  placeholder="Team Type"
                  defaultValue={options[index].value}
                  onChange={this.handleSelectionChange}
                  name="teamType"
                />
              </Form.Group>
            </Form>
            <Header as="h4">
              Students Assigned:
              <span
                role="presentation"
                onClick={this.toggleDisplay}
                style={{ position: 'absolute', left: '250px', color: '#07a', cursor: 'pointer' }}
              >
                <Icon name="edit" size="small" />
                Edit Student Assignment
              </span>
            </Header>
            <Grid>
              <Grid.Column width={4}>
                <List relaxed>
                  {studentsAssigned.map(student => (
                    <List.Item key={student.studentId} style={{ fontSize: '16px' }}>
                      {student.name}
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
              {showStudentsList ? (
                <Grid.Column width={12}>
                  <EditStudentAssignments
                    studentsAssigned={studentsAssigned}
                    currentStudents={currentStudents}
                    studentsList={studentsList}
                  />
                </Grid.Column>
              ) : (
                <Grid.Column width={12} />
              )}
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={closeEditModal}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Edit Team?"
              onClick={this.editTeam}
              disabled={isDisabled}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default EditTeamModal;

EditTeamModal.propTypes = {
  openEditModal: PropTypes.bool.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  selectedTeamDetails: PropTypes.instanceOf(Object).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired,
  currentStudents: PropTypes.instanceOf(Array).isRequired
};
