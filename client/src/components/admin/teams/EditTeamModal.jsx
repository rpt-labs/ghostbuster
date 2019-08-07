import React, { Component } from 'react';
import { Button, Modal, Input, Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const options = [
  { key: '-', text: '-', value: '-' },
  { key: 'fec', text: 'FEC', value: 'FEC' },
  { key: 'sdc', text: 'SDC', value: 'SDC' },
  { key: 'other', text: 'Other', value: 'other' }
];

class EditTeamModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      github: '',
      teamType: '-',
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedTeamDetails } = this.props;
    if (selectedTeamDetails !== prevProps.selectedTeamDetails) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        teamName: selectedTeamDetails.teamName,
        github: selectedTeamDetails.github,
        teamType: selectedTeamDetails.teamType
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
    console.log('edit team');
  };

  render() {
    const { openEditModal, closeEditModal, selectedTeamDetails } = this.props;
    const { teamName, github } = this.state;
    const isDisabled = !teamName.length;
    let index = options.findIndex(option => option.value === selectedTeamDetails.teamType);
    index = index > 0 ? index : 0;

    return (
      <div>
        <Modal size="small" open={openEditModal} onClose={closeEditModal}>
          <Modal.Header>Edit Team</Modal.Header>
          <Modal.Content>
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
  selectedTeamDetails: PropTypes.instanceOf(Object).isRequired
};
