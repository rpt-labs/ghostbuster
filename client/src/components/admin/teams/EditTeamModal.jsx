import React, { Component } from 'react';
import { Button, Modal, Input, Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const options = [
  { key: 'fec', text: 'FEC', value: 'FEC' },
  { key: 'sdc', text: 'SDC', value: 'SDC' },
  { key: 'other', text: 'Other', value: 'other' }
];

class EditTeamModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: ''
    };
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
    const { openEditModal, closeEditModal } = this.props;
    const { teamName } = this.state;
    const isDisabled = !teamName.length;

    return (
      <div>
        <Modal size="small" open={openEditModal} onClose={close}>
          <Modal.Header>Edit Team</Modal.Header>
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
  closeEditModal: PropTypes.func.isRequired
};
