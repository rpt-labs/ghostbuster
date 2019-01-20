import React from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, StyledGrid } from './Styles/TeamStyles';
import StudentReport from './StudentReport';
import TeamCard from './TeamCard';

const Team = (props) => {
  const { students, team, lifetimeContributions } = props;
  const names = Object.keys(students);
  const reportList = names.map(name => <StudentReport key={name} student={name} report={students[name]} />);

  return (
    <React.Fragment>
      <StyledHeader as="h1">{team}</StyledHeader>
      <TeamCard lifetimeContributions={lifetimeContributions} data={students} />
      <StyledGrid stackable columns={2}>
        {reportList}
      </StyledGrid>
    </React.Fragment>
  );
};

Team.propTypes = {
  lifetimeContributions: PropTypes.instanceOf(Object).isRequired,
  students: PropTypes.instanceOf(Object).isRequired,
  team: PropTypes.string.isRequired,
};

export default Team;
