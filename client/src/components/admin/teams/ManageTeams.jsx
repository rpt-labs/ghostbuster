import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../../shared/RadioButtonList';
import TeamsList from './TeamsList';

function ManageTeams(props) {
  const { cohorts, handleRadioButtonChange, showDetails } = props;
  return (
    <React.Fragment>
      <RadioButtonList
        cohorts={cohorts}
        handleRadioButtonChange={handleRadioButtonChange}
        showDetails={showDetails}
        buttonLabel="Manage Teams"
      />
      <TeamsList />
    </React.Fragment>
  );
}

ManageTeams.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired,
  handleRadioButtonChange: PropTypes.func.isRequired,
  showDetails: PropTypes.instanceOf(Object).isRequired
};

export default ManageTeams;
