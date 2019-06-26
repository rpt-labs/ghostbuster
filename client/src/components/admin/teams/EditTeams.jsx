import React from 'react';
import RadioButtonList from '../../shared/RadioButtonList';

function EditTeams(props) {
  console.log('props', props);
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

export default EditTeams;
