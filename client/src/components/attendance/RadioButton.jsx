import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';

const RadioButton = props => {
  const { cohort, handleRadioButtonChangeChange } = props;
  return (
    <div>
      <Form.Field>
        <Radio
          label={cohort.name}
          name="cohortList"
          value={cohort.name}
          checked={cohort.isChecked}
          onChange={() => handleRadioButtonChangeChange(cohort.name)}
        />
      </Form.Field>
    </div>
  );
};

RadioButton.propTypes = {
  cohort: PropTypes.instanceOf(Object).isRequired,
  handleRadioButtonChangeChange: PropTypes.func.isRequired
};

export default RadioButton;
