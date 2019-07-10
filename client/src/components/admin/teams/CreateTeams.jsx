import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../../shared/RadioButtonList';

function CreateTeams(props) {
  const { cohorts, handleRadioButtonChange, showDetails } = props;
  return (
    <React.Fragment>
      <RadioButtonList
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
        buttonLabel="Show Students List"
      />
    </React.Fragment>
  );
}

CreateTeams.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired
};

export default CreateTeams;
