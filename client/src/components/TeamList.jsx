import React from 'react';
import PropTypes from 'prop-types';
import GhostbusterButton from './GhostbusterButton';
import Team from './Team';

const TeamList = (props) => {
  const {
    checkProjects,
    loading,
    projects,
    showSegment,
    selectedCohort,
  } = props;

  const style = loading
    ? 'ui bottom attached loading tab segment'
    : 'ui bottom attached active tab segment';

  let teams;
  let teamList;

  if (projects[selectedCohort].fetched) {
    teams = Object.keys(projects[selectedCohort].lifetimeData);
    teamList = teams.map((team) => {
      const lifetimeData = projects[selectedCohort].lifetimeData[team];
      const students = projects[selectedCohort].weekThesisData[team];

      return (
        <Team
          key={team}
          team={team}
          lifetimeContributions={lifetimeData}
          students={students}
        />
      );
    });
  } else {
    teamList = <div />;
  }

  const segment = showSegment ? (
    <div className={style}>
      <div>
        {teamList}
      </div>
    </div>) : (<div />);

  return (
    <div>
      <GhostbusterButton clickHandler={checkProjects} />
      {segment}
    </div>
  );
};

TeamList.propTypes = {
  checkProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  selectedCohort: PropTypes.string.isRequired,
};

export default TeamList;
