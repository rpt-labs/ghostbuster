import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import TeamPieChart from './TeamPieChart';
import TeamBarChart from './TeamBarChart';

// purpose: show meta-data for the team
const TeamCard = props => {
  const { data, lifetimeContributions } = props;
  const lifetimeChart = lifetimeContributions ? (
    <TeamBarChart contributions={lifetimeContributions} />
  ) : (
    <div />
  );
  return (
    <Segment>
      <Grid centered columns={2}>
        <Grid.Column>{lifetimeChart}</Grid.Column>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <TeamPieChart type="commits" students={data} />
          </Grid.Column>
          <Grid.Column>
            <TeamPieChart type="changes" students={data} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

TeamCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  lifetimeContributions: PropTypes.instanceOf(Object).isRequired
};

export default TeamCard;
