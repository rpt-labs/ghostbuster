import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon, Button, Header } from 'semantic-ui-react';

export default class StudentPrDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllAttemptedToyProblems: false
    };
    this.showHideDetails = this.showHideDetails.bind(this);
  }

  showHideDetails() {
    const { showAllAttemptedToyProblems } = this.state;
    this.setState({ showAllAttemptedToyProblems: !showAllAttemptedToyProblems });
  }

  render() {
    const { pullRequestsList, selectedCohort } = this.props;
    const { showAllAttemptedToyProblems } = this.state;

    return (
      <div>
        <br />
        <Header as="h1">
          Selected Cohort: {selectedCohort.toUpperCase()}
          <Button
            color="grey"
            style={{ float: 'right', marginRight: '0px' }}
            onClick={() => this.showHideDetails()}
          >
            {showAllAttemptedToyProblems ? 'Hide Details' : 'Show Details'}
          </Button>
        </Header>

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
                  <Card.Header style={{ marginBottom: '10px' }}>
                    <Label size="big" color="teal">
                      <Icon name="github" />
                      {item.studentName}
                    </Label>
                    <Label size="big" color="teal" style={{ float: 'right', marginRight: '30px' }}>
                      <Icon name="calculator" />
                      {item.uniqueMatchedPrCount}
                    </Label>
                  </Card.Header>
                </a>
                <Card.Description />
                {showAllAttemptedToyProblems ? (
                  <div>
                    {item.matchedPrs && item.matchedPrs.length ? (
                      item.matchedPrs.map(pr => <div>{pr}</div>)
                    ) : (
                      <div />
                    )}
                  </div>
                ) : (
                  <div />
                )}
                <br />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

StudentPrDetails.propTypes = {
  pullRequestsList: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired
};
