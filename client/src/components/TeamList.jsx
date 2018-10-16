import React from 'react';
import PropTypes from 'prop-types';
import GhostbusterButton from './GhostbusterButton';
import Team from './Team';
import TeamCard from './TeamCard';

const TeamList = (props) => {
  const { checkProjects, loading, projects } = props;
  const style = loading
    ? 'ui bottom attached loading tab segment'
    : 'ui bottom attached active tab segment';
  const teams = Object.keys(projects);
  const teamList = teams.map(team => <Team key={team} team={team} students={projects[team]} />);

  return (
    <div>
      <GhostbusterButton clickHandler={checkProjects} />
      <div className={style}>
        <TeamCard data={projects}/>
        {teamList}
      </div>
    </div>
  );
};

TeamList.propTypes = {
  checkProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
};

export default TeamList;
