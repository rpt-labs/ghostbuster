import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Segment, Header } from 'semantic-ui-react';
import RadioButton from './RadioButton';
import { PaddedGrid } from '../Styles/TeamStyles';

const RadioButtonList = props => {
  const { cohorts, handleRadioButtonChange, showAttendance } = props;
  const cohortsList = cohorts.map(cohort => (
    <Grid.Column width={8} key={cohort.name}>
      <RadioButton cohort={cohort} handleRadioButtonChange={handleRadioButtonChange} />
    </Grid.Column>
  ));

  return (
    <Segment placeholder>
      <Header as="h2" style={{ textAlign: 'center', marginTop: '15px' }}>
        Select A Cohort
      </Header>
      <PaddedGrid columns={2} relaxed style={{ marginLeft: '50px' }}>
        {cohortsList}
      </PaddedGrid>
      <Button primary onClick={() => showAttendance()} style={{ marginTop: '30px' }}>
        SHOW ATTENDANCE
      </Button>
    </Segment>
  );
};

RadioButtonList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showAttendance: PropTypes.func.isRequired
};

export default RadioButtonList;
