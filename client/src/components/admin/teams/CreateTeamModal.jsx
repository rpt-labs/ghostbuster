import { Component } from 'react';
import { Button, Modal, List, Input, Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const { GHOSTBUSTER_BASE_URL } = process.env;

const options = [
  { key: 'fec', text: 'FEC', value: 'FEC' },
  { key: 'sdc', text: 'SDC', value: 'SDC' },
  { key: 'other', text: 'Other', value: 'other' }
];

class CreateTeamModal extends Component {
  state = {
    teamName: '',
    teamType: 'Other',
    github: ''
  };

  handleInputChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSelectionChange = (e, { value }) => this.setState({ teamType: value });

  createTeam = () => {
    const { teamName, teamType } = this.state;
    let { github } = this.state;
    const { selectedCohort, selectedStudents, close, showDetails } = this.props;
    github = !github ? `${teamType}_${teamName}_${selectedCohort.id}` : github;
    axios
      .post(
        `${GHOSTBUSTER_BASE_URL}/ghostbuster/teams?teamName=${teamName}&teamType=${teamType}&github=${github}&cohortId=${
          selectedCohort.id
        }`
      )
      .then(response => {
        if (response.data && response.data.team) {
          const { teamId } = response.data.team;
          if (teamId && selectedStudents) {
            selectedStudents.forEach(student => {
              const { id } = student;
              axios
                .post(`${GHOSTBUSTER_BASE_URL}/ghostbuster/teams/${teamId}/students/${id}`)
                .then(res => {
                  if (res.data && res.status === 200) {
                    close();
                    showDetails();
                  }
                });
            });
          }
          close();
          showDetails();
        }
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { open, selectedStudents, close } = this.props;
    const { teamName } = this.state;
    const isDisabled = !teamName.length;

    return (
      <div>
        <Modal size="small" open={open} onClose={close}>
          <Modal.Header>Create Team</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="Team Name"
                  placeholder="Team Name"
                  name="teamName"
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Field
                  control={Input}
                  label="Github"
                  placeholder="Github Handle"
                  name="github"
                  onChange={this.handleInputChange}
                />
                <Form.Field
                  control={Select}
                  label="Team Type"
                  options={options}
                  placeholder="Team Type"
                  onChange={this.handleSelectionChange}
                  name="teamType"
                />
              </Form.Group>
            </Form>
            <List divided relaxed>
              {selectedStudents.map(student => (
                <List.Item key={student.github} style={{ fontSize: '18px' }}>
                  {`${student.firstName} ${student.lastName}`}
                </List.Item>
              ))}
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Create Team?"
              onClick={this.createTeam}
              disabled={isDisabled}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateTeamModal;

CreateTeamModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  selectedStudents: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired
};
