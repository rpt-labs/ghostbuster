import React from 'react';
import PropTypes from 'prop-types';
import StudentReport from './StudentReport';
import TeamCard from './TeamCard';

const Team = (props) => {
  const { students, team } = props;
  const names = Object.keys(students);
  const reportList = names.map(name => <StudentReport key={name} student={name} report={students[name]} />);

  return (
    <div>
      <h1 className="team-title">{team}</h1>
      <div className="ui center aligned grid">
        <div className="eight wide column">
          <div className="ui two column stackable grid report-detail">
            {reportList}
          </div>
        </div>
        <div className="eight wide column">
          <TeamCard data={students} />
        </div>
      </div>
    </div>
  );
};

Team.propTypes = {
  students: PropTypes.instanceOf(Object).isRequired,
  team: PropTypes.string.isRequired,
};

export default Team;
