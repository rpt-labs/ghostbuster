import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Checkbox from './Checkbox';

const CheckboxList = (props) => {
  const { cohorts } = props;
  return (
    <div>
      {
        cohorts.map(cohort => (
          <Checkbox
            key={cohort.name}
            cohort={cohort}
          />))
      }
      <br />
      <Button primary>SHOW ATTENDANCE</Button>
    </div>
  );
};

CheckboxList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
};

export default CheckboxList;
