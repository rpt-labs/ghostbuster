import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../../shared/RadioButtonList';

function EditTeams(props) {
  const { cohorts, handleRadioButtonChange, showDetails } = props;
  return (
    <React.Fragment>
      <RadioButtonList
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
        buttonLabel="SHOW DETAILS"
      />
    </React.Fragment>
  );
}

EditTeams.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired
};

export default EditTeams;
