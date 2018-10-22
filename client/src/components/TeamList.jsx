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
  } = props;
  const style = loading
    ? 'ui bottom attached loading tab segment'
    : 'ui bottom attached active tab segment';
  const teams = Object.keys(projects);
  const teamList = teams.map(team => <Team key={team} team={team} students={projects[team]} />);
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
};

export default TeamList;
