import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { StyledHeader, StyledGrid } from './Styles/TeamStyles';
import StudentReport from './StudentReport';
import TeamCard from './TeamCard';

const Team = (props) => {
  const { students, team, lifetimeContributions } = props;
  const names = Object.keys(students);
  const reportList = (
    <StyledGrid stackable>
      <Grid.Row columns={2}>
        {names.map(name => (
          <Grid.Column key={name}>
            <StudentReport student={name} report={students[name]} />
            <br />
          </Grid.Column>
        ))}
      </Grid.Row>
    </StyledGrid>);

  return (
    <React.Fragment>
      <StyledHeader as="h1">{team}</StyledHeader>
      <TeamCard lifetimeContributions={lifetimeContributions} data={students} />
      {reportList}
    </React.Fragment>
  );
};

Team.propTypes = {
  lifetimeContributions: PropTypes.instanceOf(Object).isRequired,
  students: PropTypes.instanceOf(Object).isRequired,
  team: PropTypes.string.isRequired,
};

export default Team;
