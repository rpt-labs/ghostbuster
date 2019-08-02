import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Segment, Header } from 'semantic-ui-react';
import RadioButton from './RadioButton';
import { PaddedGrid } from '../Styles/TeamStyles';

const RadioButtonList = props => {
  const { cohorts, handleRadioButtonChange, showDetails, buttonLabel } = props;
  const cohortsList = cohorts.map(cohort => (
    <Grid.Column key={cohort.name}>
      <RadioButton cohort={cohort} handleRadioButtonChange={handleRadioButtonChange} />
    </Grid.Column>
  ));

  return (
    <Segment placeholder>
      <Header as="h2" style={{ textAlign: 'center', marginTop: '15px' }}>
        Select A Cohort
      </Header>
      <PaddedGrid columns={3} relaxed style={{ marginLeft: '50px' }}>
        {cohortsList}
      </PaddedGrid>
      <Button primary onClick={() => showDetails()} style={{ marginTop: '30px' }}>
        {buttonLabel}
      </Button>
    </Segment>
  );
};

RadioButtonList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
};

export default RadioButtonList;
