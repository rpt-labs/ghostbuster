import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { PaddedGrid } from '../Styles/TeamStyles';

function ReleasedToyProblems(props) {
  const { releasedToyProblems } = props;
  console.log('releasedToyProblems', releasedToyProblems);
  return (
    <Segment>
      <Header as="h2">Released toy Problems:</Header>
      {releasedToyProblems && releasedToyProblems.length && (
        <Grid columns={4}>
          {releasedToyProblems.map(name => (
            <Grid.Column key={name}>{name}</Grid.Column>
          ))}
        </Grid>
      )}
    </Segment>
  );
}

export default ReleasedToyProblems;
