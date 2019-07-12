import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class CreateTeamModal extends Component {
  state = { open: false };

  show = size => () => this.setState({ size, open: true });

  close = () => this.setState({ open: false });

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <Button onClick={this.show('tiny')}>Create Team</Button>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Create Team</Modal.Header>
          <Modal.Content>
            <p>Create Team?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive icon="checkmark" labelPosition="right" content="Yes" />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateTeamModal;
