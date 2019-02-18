import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import RadioButton from './RadioButton';
import { PaddedGrid } from '../Styles/TeamStyles';

const RadioButtonList = props => {
  const { cohorts, handleRadioButtonChangeChange } = props;
  const cohortsList = cohorts.map(cohort => (
    <Grid.Column width={6} key={cohort.name}>
      <RadioButton cohort={cohort} handleRadioButtonChangeChange={handleRadioButtonChangeChange} />
    </Grid.Column>
  ));

  return (
    <div>
      <PaddedGrid columns={4} padded="vertically">
        {cohortsList}
        <br />
      </PaddedGrid>
      <Button primary>SHOW ATTENDANCE</Button>
    </div>
  );
};

RadioButtonList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
  handleRadioButtonChangeChange: PropTypes.func.isRequired
};

export default RadioButtonList;
