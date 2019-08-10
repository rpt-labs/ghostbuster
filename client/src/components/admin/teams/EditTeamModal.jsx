import React, { Component } from 'react';
import {
  Button,
  Modal,
  Input,
  Form,
  Select,
  List,
  Header,
  Icon,
  Grid,
  Checkbox
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
      studentsList: currentStudents.map(student => Object.assign(student, { isChecked: false }))
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedTeamDetails } = this.props;
    const { studentsList } = this.state;
    if (selectedTeamDetails !== prevProps.selectedTeamDetails) {
      selectedTeamDetails.students.forEach(item => {
        // eslint-disable-next-line array-callback-return
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
    const { teamName, teamType, studentsList } = this.state;
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
        if (response.data) {
          axios
            .delete(
              `${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/${selectedTeamDetails.teamId}/students`
            )
            .then(() => {
              const currentlySelectedStudents = studentsList.filter(student => student.isChecked);
              if (currentlySelectedStudents.length) {
                currentlySelectedStudents.forEach(student => {
                  const { id } = student;
                  axios
                    .post(
                      `${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/${
                        selectedTeamDetails.teamId
                      }/students/${id}`
                    )
                    .then(res => {
                      if (res.data && res.status === 200) {
                        closeEditModal();
                        showTeamDetails();
                      }
                    });
                });
              }
            });
        }
      })
      .catch(error => {
        throw error;
      });
  };

  selectStudent = e => {
    const { studentsList } = this.state;
    const currentList = studentsList.slice();
    const name = e.target.innerHTML;
    const firstName = name
      .substring(0, name.indexOf(' '))
      .trim()
      .toLowerCase();
    const lastName = name
      .substring(name.indexOf(' '))
      .trim()
      .toLowerCase();
    const matchedStudent = studentsList.find(
      student =>
        student.firstName.toLowerCase() === firstName && student.lastName.toLowerCase() === lastName
    );
    if (matchedStudent) {
      const index = currentList.indexOf(matchedStudent);
      matchedStudent.isChecked = !matchedStudent.isChecked;
      currentList[index] = matchedStudent;
    }
    this.setState({
      studentsList: currentList,
      studentsAssigned: studentsList
        .filter(student => student.isChecked)
        .map(student => ({
          studentId: student.id,
          name: `${student.firstName} ${student.lastName}`,
          studentGithub: student.github
        }))
    });
  };

  render() {
    const {
      openEditModal,
      closeEditModal,
      selectedTeamDetails,
      selectedCohort,
      showStudentsList,
      toggleDisplay
    } = this.props;
    const { teamName, github, studentsAssigned, studentsList } = this.state;
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
                onClick={e => toggleDisplay(e)}
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
                  <Grid columns={2} style={{ marginLeft: '50px' }}>
                    {studentsList.map(student => (
                      <Grid.Column key={student.id} onClick={e => this.selectStudent(e)}>
                        <Checkbox
                          label={`${student.firstName} ${student.lastName}`}
                          style={{ fontSize: '14px' }}
                          checked={student.isChecked}
                        />
                      </Grid.Column>
                    ))}
                  </Grid>
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
  toggleDisplay: PropTypes.func.isRequired,
  showStudentsList: PropTypes.bool.isRequired,
  showTeamDetails: PropTypes.bool.isRequired,
  selectedTeamDetails: PropTypes.instanceOf(Object).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired,
  currentStudents: PropTypes.instanceOf(Array).isRequired
};
