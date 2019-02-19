import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import RadioButton from './RadioButton';
import { PaddedGrid } from '../Styles/TeamStyles';

const RadioButtonList = props => {
  const { cohorts, handleRadioButtonChangeChange, showAttendance } = props;
  const cohortsList = cohorts.map(cohort => (
    <Grid.Column width={8} key={cohort.name}>
      <RadioButton cohort={cohort} handleRadioButtonChangeChange={handleRadioButtonChangeChange} />
    </Grid.Column>
  ));

  return (
    <div style={{ justifyContent: 'center' }}>
      <PaddedGrid columns={3} padded="vertically">
        {cohortsList}
        <br />
      </PaddedGrid>
      <Button primary onClick={() => showAttendance()}>
        SHOW ATTENDANCE
      </Button>
    </div>
  );
};

RadioButtonList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
  handleRadioButtonChangeChange: PropTypes.func.isRequired,
  showAttendance: PropTypes.func.isRequired
};

export default RadioButtonList;
