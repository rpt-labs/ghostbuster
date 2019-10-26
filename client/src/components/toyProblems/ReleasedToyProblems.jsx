import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function ReleasedToyProblems(props) {
  const { releasedToyProblems } = props;
  return (
    <Segment>
      <Header as="h2">Released toy problems:</Header>
      {releasedToyProblems && releasedToyProblems.length && (
        <Grid columns={4}>
          {releasedToyProblems.map(tp => (
            <Grid.Column key={tp.name}>{`${tp.name} ${tp.date.split('T')[0]}`}</Grid.Column>
          ))}
        </Grid>
      )}
    </Segment>
  );
}

export default ReleasedToyProblems;

ReleasedToyProblems.propTypes = {
  releasedToyProblems: PropTypes.instanceOf(Array).isRequired
};
