import React from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon } from 'semantic-ui-react';

function StudentPrDetails(props) {
  const { pullRequestsList, selectedCohort } = props;
  return (
    <div>
      <br />
      <h1>Selected Cohort: {selectedCohort}</h1>
      <Card.Group itemsPerRow={2}>
        {pullRequestsList.map(item => (
          <Card>
            <Card.Content>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/hackreactor/${
                  item.cohort
                }-toy-problems/pulls?q=is:pr+author:${item.studentGithubHandle}`}
              >
                <Card.Header>
                  <Label size="big" color="teal" floated="right">
                    <Icon name="tasks" />
                    {item.uniqueMatchedPrCount}
                  </Label>
                  <Label size="big" color="teal">
                    <Icon name="github" />
                    {item.studentName}
                  </Label>
                </Card.Header>
              </a>
              <Card.Description />
              <div>
                {item.matchedPrs.length ? item.matchedPrs.map(pr => <div>{pr}</div>) : <div />}
              </div>
              <br />
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

StudentPrDetails.propTypes = {
  pullRequestsList: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired
};

export default StudentPrDetails;
