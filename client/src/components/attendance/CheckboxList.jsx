import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import Checkbox from './Checkbox';
import { PaddedGrid } from '../Styles/TeamStyles';

const CheckboxList = (props) => {
  const { cohorts } = props;
  const cohortsList = cohorts.map(cohort => (
    <Grid.Column width={4} key={cohort.name}>
      <Checkbox
        cohort={cohort}
      />
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

CheckboxList.propTypes = {
  cohorts: PropTypes.arrayOf(Object).isRequired,
};

export default CheckboxList;
