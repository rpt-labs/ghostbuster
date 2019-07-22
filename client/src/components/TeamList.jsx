import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { TeamSegment } from './Styles/TeamStyles';
import GhostbusterButton from './GhostbusterButton';
import Team from './Team';
import TabNav from './TabNav';

const TeamList = props => {
  const {
    checkProjects,
    loading,
    projects,
    showSegment,
    selectedCohort,
    cohorts,
    selectCohort
  } = props;

  let teams;
  let teamList;

  if (projects && projects[selectedCohort] && projects[selectedCohort].fetched) {
    teams = Object.keys(projects[selectedCohort].lifetimeData);
    teamList = teams.map(team => {
      const lifetimeData = projects[selectedCohort].lifetimeData[team];
      const students = projects[selectedCohort].weekThesisData[team];

      return (
        <Team key={team} team={team} lifetimeContributions={lifetimeData} students={students} />
      );
    });
  } else {
    teamList = <div />;
  }

  const teamDeatils = showSegment ? <TeamSegment>{teamList}</TeamSegment> : <div />;

  const displayDetails = loading ? (
    <Segment placeholder>
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    </Segment>
  ) : (
    teamDeatils
  );

  return (
    <div>
      <TabNav selected={selectedCohort} cohorts={cohorts} selectCohort={selectCohort} />
      <GhostbusterButton clickHandler={checkProjects} />
      {displayDetails}
    </div>
  );
};

TeamList.propTypes = {
  cohorts: PropTypes.instanceOf(Object).isRequired,
  selectCohort: PropTypes.func.isRequired,
  checkProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  selectedCohort: PropTypes.instanceOf(Object).isRequired
};

export default TeamList;
