/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Modal, List, Input, Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const options = [
  { key: 'fec', text: 'FEC', value: 'FEC' },
  { key: 'sdc', text: 'SDC', value: 'SDC' },
  { key: 'other', text: 'Other', value: 'other' }
];

// TODO:remove eslint-disable and refactor to stateless function
class CreateTeamModal extends Component {
  createTeam = () => {
    console.log('hi');
  };

  render() {
    const { open, selectedStudents, close } = this.props;

    return (
      <div>
        <Modal size="small" open={open} onClose={close}>
          <Modal.Header>Create Team</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field control={Input} label="Team Name" placeholder="Team Name" />
                <Form.Field
                  control={Select}
                  label="Team Type"
                  options={options}
                  placeholder="Team Type"
                />
              </Form.Group>
            </Form>
            <List divided relaxed>
              {selectedStudents.map(student => (
                <List.Item key={student.github}>
                  {`${student.firstName} ${student.lastName}`}
                </List.Item>
              ))}
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Create Team?"
              onClick={this.createTeam}
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
  selectedStudents: PropTypes.instanceOf(Array).isRequired
};
