import { Segment, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function ReleasedToyProblems({ releasedToyProblems }) {
  return (
    <Segment>
      <Header as="h2">Released toy problems:</Header>
      {releasedToyProblems && releasedToyProblems.length && (
        <Grid columns={4}>
          {releasedToyProblems.map(tp => (
            <Grid.Column key={tp.name} style={{ padding: '0px 16px' }}>
              <span>{tp.name}</span>
              <span
                style={{
                  color: 'grey',
                  paddingLeft: '5px',
                  fontStyle: 'italic'
                }}
              >
                {` (${tp.date.split('T')[0]})`}
              </span>
            </Grid.Column>
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
