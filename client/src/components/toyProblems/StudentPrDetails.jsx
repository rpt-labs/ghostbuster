import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon, Button, Header } from 'semantic-ui-react';
import ReleasedToyProblems from './ReleasedToyProblems';

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

  showHideReleasedList() {
    const { showHideReleasedList } = this.state;
    this.setState({ showHideReleasedList: !showHideReleasedList });
  }

  render() {
    const { pullRequestsList, selectedCohort, releasedToyProblems } = this.props;
    const { showAllAttemptedToyProblems, showHideReleasedList } = this.state;

    const totalReleasedTp = releasedToyProblems.length;

    return (
      <div>
        <br />
        {pullRequestsList && pullRequestsList.length ? (
          <div>
            <Header as="h1">
              {`Selected Cohort: ${selectedCohort.toUpperCase()}`}
              <Button
                color="grey"
                style={{ float: 'right', marginRight: '0px' }}
                onClick={() => this.showHideReleasedList()}
              >
                {!showHideReleasedList
                  ? `Released: ${totalReleasedTp} - View List`
                  : `Released: ${totalReleasedTp} - Hide List`}
              </Button>
              {showHideReleasedList && (
                <ReleasedToyProblems releasedToyProblems={releasedToyProblems} />
              )}
            </Header>
            <Header as="h1">
              <Button color="grey" onClick={() => this.showHideDetails()}>
                {showAllAttemptedToyProblems ? 'Hide Detailed Report' : 'Show Detailed Report'}
              </Button>
            </Header>
            <Card.Group itemsPerRow={2}>
              {pullRequestsList.map(item => (
                <Card key={item.studentName} style={{ marginBottom: '0px' }}>
                  <Card.Content style={{ paddingBottom: '0px' }}>
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
                        <Label
                          size="big"
                          color="teal"
                          style={{ float: 'right', marginRight: '30px' }}
                        >
                          <Icon name="check" />
                          {item.matchedFilesCount}
                        </Label>
                      </Card.Header>
                    </a>
                    <Card.Description />
                    {!showAllAttemptedToyProblems && (
                      <React.Fragment>
                        <div>
                          {releasedToyProblems &&
                            releasedToyProblems.length &&
                            releasedToyProblems.map(tp =>
                              !item.matchedFileNames.includes(tp.name) ? (
                                <div key={tp.name}>
                                  <span style={{ color: 'red' }}>{tp.name}</span>
                                  <span
                                    style={{
                                      color: 'grey',
                                      paddingLeft: '5px',
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    {` (${tp.date.split('T')[0]})`}
                                  </span>
                                </div>
                              ) : (
                                <div />
                              )
                            )}
                        </div>
                      </React.Fragment>
                    )}
                    {showAllAttemptedToyProblems && (
                      <React.Fragment>
                        <div>
                          {releasedToyProblems &&
                            releasedToyProblems.length &&
                            releasedToyProblems.map(tp =>
                              item.matchedFileNames.includes(tp.name) ? (
                                <div style={{ color: 'grey' }} key={tp.name}>
                                  {tp.name}
                                </div>
                              ) : (
                                <div key={tp.name}>
                                  <span style={{ color: 'red' }}>{tp.name}</span>
                                  <span
                                    style={{
                                      color: 'grey',
                                      paddingLeft: '5px',
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    {` (${tp.date.split('T')[0]})`}
                                  </span>
                                </div>
                              )
                            )}
                        </div>
                      </React.Fragment>
                    )}
                    <br />
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        ) : (
          <div style={{ margin: '30px', fontSize: '40px', fontWeight: 'bold' }}>
            {`No Pull Request found for ${selectedCohort.toUpperCase()}`}
          </div>
        )}
      </div>
    );
  }
}

StudentPrDetails.propTypes = {
  pullRequestsList: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired
};
