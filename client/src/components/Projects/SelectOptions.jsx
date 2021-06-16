import { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';

export default class SelectOptions extends Component {
  state = {};

  render() {
    const { handleSelect, shouldDisplayByWeek } = this.props;
    return (
      <Form style={{ float: 'right', marginLeft: '60%', marginTop: '10px' }}>
        <Form.Group inline>
          <Form.Field
            control={Radio}
            label="By date"
            value="By date"
            checked={!shouldDisplayByWeek}
            onChange={handleSelect}
          />
          <Form.Field
            control={Radio}
            label="By week"
            value="2"
            checked={shouldDisplayByWeek}
            onChange={handleSelect}
          />
        </Form.Group>
      </Form>
    );
  }
}

SelectOptions.propTypes = {
  shouldDisplayByWeek: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired
};
