import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import RadioButtonList from '../../shared/RadioButtonList';
import StudentsList from './StudentsList';
import TeamsList from './TeamsList';

function CreateTeams(props) {
  const {
    cohorts,
    handleRadioButtonChange,
    showDetails,
    selectedCohortStudents,
    selectedCohort,
    showTeamDetails,
    teamsListForSelectedCohort
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

      {currentStudents.length ? (
        <Segment>
          <StudentsList
            currentStudents={currentStudents}
            selectedCohort={selectedCohort}
            teamsListForSelectedCohort={teamsListForSelectedCohort}
            showDetails={showDetails}
          />
        </Segment>
      ) : (
        <div />
      )}
      {teamsListForSelectedCohort.length ? (
        <Segment>
          <TeamsList
            style={{ marginLeft: '50px', marginTop: '15px' }}
            teamsListForSelectedCohort={teamsListForSelectedCohort}
            selectedCohort={selectedCohort}
            showTeamDetails={showTeamDetails}
          />
        </Segment>
      ) : (
        <div />
      )}
    </React.Fragment>
  );
}

CreateTeams.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired,
  selectedCohortStudents: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired,
  showTeamDetails: PropTypes.func.isRequired,
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired
};

export default CreateTeams;
