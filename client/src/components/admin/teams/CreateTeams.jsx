import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../../shared/RadioButtonList';
import StudentsList from './StudentsList';

function CreateTeams(props) {
  const {
    cohorts,
    handleRadioButtonChange,
    showDetails,
    selectedCohortStudents,
    selectedCohort
  } = props;

  const currentStudents = selectedCohortStudents.filter(student => student.status === 'enrolled');
  return (
    <React.Fragment>
      <RadioButtonList
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
        buttonLabel="Show Students List"
      />
      <div>
        {currentStudents.length ? (
          <StudentsList currentStudents={currentStudents} selectedCohort={selectedCohort} />
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
  selectedCohortStudents: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired
};

export default CreateTeams;
