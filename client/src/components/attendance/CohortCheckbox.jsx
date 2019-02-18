import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

const CohortCheckbox = props => {
  const { cohort, handleCheckboxChange } = props;
  return (
    <div>
      <Checkbox
        label={cohort.name}
        checked={cohort.isChecked}
        onChange={() => handleCheckboxChange(cohort.name)}
      />
    </div>
  );
};

CohortCheckbox.propTypes = {
  cohort: PropTypes.instanceOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

export default CohortCheckbox;
