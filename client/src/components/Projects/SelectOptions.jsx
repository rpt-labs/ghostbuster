import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';

export default class SelectOptions extends Component {
  state = {};

  handleChange = ({ value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <Form style={{ float: 'right', marginLeft: '60%', marginTop: '10px' }}>
        <Form.Group inline>
          <Form.Field
            control={Radio}
            label="By date"
            value="1"
            checked={value === '1'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="By week"
            value="2"
            checked={value === '2'}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  }
}
