import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

const CohortCheckbox = (props) => {
  const { cohort } = props;
  return (
    <div>
      <Checkbox label={cohort.name} checked={cohort.isChecked} />
    </div>
  );
};

CohortCheckbox.propTypes = {
  cohort: PropTypes.instanceOf(Object).isRequired,
};

export default CohortCheckbox;
