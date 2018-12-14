import React from 'react';
import PropTypes from 'prop-types';
import StudentReport from './StudentReport';
import TeamCard from './TeamCard';

const Team = (props) => {
  const { students, team, lifetimeContributions } = props;
  const names = Object.keys(students);
  const reportList = names.map(name => <StudentReport key={name} student={name} report={students[name]} />);

  return (
    <div>
      <h1 className="team-title">{team}</h1>
      <TeamCard lifetimeContributions={lifetimeContributions} data={students} />
      <div className="ui list report-detail">
        <div className="ui two column stackable grid">
          {reportList}
        </div>
      </div>
    </div>
  );
};

Team.propTypes = {
  lifetimeContributions: PropTypes.instanceOf(Object).isRequired,
  students: PropTypes.instanceOf(Object).isRequired,
  team: PropTypes.string.isRequired
};

export default Team;
