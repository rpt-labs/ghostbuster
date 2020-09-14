/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, List, Button } from 'semantic-ui-react';
import CommitsBarChart from './CommitsBarChart';

export default class StudentsCommitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCommits: false
    };
    this.showHideDetails = this.showHideDetails.bind(this);
  }

  showHideDetails() {
    const { showAllCommits } = this.state;
    this.setState({ showAllCommits: !showAllCommits });
  }

  render() {
    const { studentsList, commitDetails, selectedCohort } = this.props;
    const { showAllCommits } = this.state;
    return (
      <div>
        <Button
          color="grey"
          onClick={() => this.showHideDetails()}
          style={{ marginBottom: '10px' }}
        >
          {showAllCommits ? 'Hide Details' : 'Show Details'}
        </Button>
        <Card.Group itemsPerRow={2}>
          {studentsList.map(item => (
            <Card key={item.github} style={{ marginBottom: '0px' }}>
              <Card.Content style={{ paddingBottom: '10px' }}>
                <Card.Header style={{ marginBottom: '10px' }}>
                  <Label size="big" color="teal">{`${item.firstName} ${item.lastName}`}</Label>
                </Card.Header>
                <Card.Description>
                  <List divided relaxed>
                    {item[`${selectedCohort.split('-')[1]}Urls`].split(',').map(url => (
                      <List.Item key={url}>
                        <List.Content>
                          <List.Header as="a" target="_blank" href={url}>
                            {url.replace('https://github.com/', '')}
                          </List.Header>
                          <List.Description style={{ fontWeight: 'bold' }}>
                            Total commits:
                            {commitDetails[url.replace('https://github.com/', '')] &&
                              commitDetails[url.replace('https://github.com/', '')].length}
                          </List.Description>
                          {!showAllCommits &&
                            commitDetails[url.replace('https://github.com/', '')] && (
                              <CommitsBarChart
                                commits={commitDetails[url.replace('https://github.com/', '')].sort(
                                  (a, b) => b.date - a.date
                                )}
                              />
                            )}
                          <List.List as="ol">
                            {showAllCommits &&
                              commitDetails[url.replace('https://github.com/', '')] &&
                              commitDetails[url.replace('https://github.com/', '')]
                                .sort((a, b) => b.date - a.date)
                                .map((commit, i) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <List.Item as="li" value="*" key={`${i}`}>
                                    {commit.name}
                                    <> &middot; </>
                                    <> {commit.date.split('T')[0]} </>
                                  </List.Item>
                                ))}
                          </List.List>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

StudentsCommitsList.propTypes = {
  studentsList: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired,
  commitDetails: PropTypes.instanceOf(Object).isRequired
};
