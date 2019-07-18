import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../../shared/RadioButtonList';
import StudentsList from './StudentsList';

function CreateTeams(props) {
  const { cohorts, handleRadioButtonChange, showDetails, selectedCohortStudents } = props;
  return (
    <React.Fragment>
      <RadioButtonList
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
        buttonLabel="Show Students List"
      />
      <div>
        {selectedCohortStudents.length ? (
          <StudentsList selectedCohortStudents={selectedCohortStudents} />
        ) : (
          <div />
        )}
      </div>
    </React.Fragment>
  );
}

CreateTeams.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired,
  selectedCohortStudents: PropTypes.instanceOf(Array).isRequired
};

export default CreateTeams;
