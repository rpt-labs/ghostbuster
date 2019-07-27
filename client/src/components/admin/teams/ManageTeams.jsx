import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../../shared/RadioButtonList';
import TeamsList from './TeamsList';

function ManageTeams(props) {
  const { cohorts, handleRadioButtonChange, showTeamDetails, teamsListForSelectedCohort } = props;
  return (
    <React.Fragment>
      <RadioButtonList
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showTeamDetails}
        buttonLabel="Manage Teams"
      />
      <TeamsList teamsListForSelectedCohort={teamsListForSelectedCohort} />
    </React.Fragment>
  );
}

ManageTeams.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showTeamDetails: PropTypes.instanceOf(Object).isRequired,
  teamsListForSelectedCohort: PropTypes.instanceOf(Array).isRequired
};

export default ManageTeams;
