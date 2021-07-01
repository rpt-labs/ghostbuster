import { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, List, Button, Header, Segment, Divider } from 'semantic-ui-react';
import CommitsLineChart from './CommitsLineChart';
import SelectOptions from './SelectOptions';

export default class StudentsCommitsList extends Component {
  state = {
    showAllCommits: false,
    shouldDisplayByWeek: false
  };

  showHideDetails = () => {
    const { showAllCommits } = this.state;
    this.setState({ showAllCommits: !showAllCommits });
  };

  handleSelect = () => {
    const { shouldDisplayByWeek } = this.state;
    this.setState({ shouldDisplayByWeek: !shouldDisplayByWeek });
  };

  render() {
    const { studentsList, commitDetails, selectedCohort } = this.props;
    const { showAllCommits, shouldDisplayByWeek } = this.state;
    return (
      <div>
        <Segment basic style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            color="grey"
            onClick={() => this.showHideDetails()}
            style={{ marginBottom: '10px' }}
          >
            {showAllCommits ? 'Hide Details' : 'Show Details'}
          </Button>
          {!showAllCommits && (
            <SelectOptions
              style={{ float: 'right', marginLeft: '60%', marginTop: '10px' }}
              handleSelect={() => this.handleSelect()}
              shouldDisplayByWeek={shouldDisplayByWeek}
            />
          )}
        </Segment>
        <br />
        <Card.Group itemsPerRow={2}>
          {studentsList.map(item => (
            <Card key={item.github} style={{ marginBottom: '0px' }}>
              <Card.Content style={{ paddingBottom: '10px' }}>
                <Card.Header style={{ marginBottom: '10px' }}>
                  <Label size="big" color="teal">{`${item.firstName} ${item.lastName}`}</Label>
                </Card.Header>
                <Card.Description>
                  <List divided relaxed>
                    {item[`${selectedCohort.split('-').pop()}Urls`].split(',').map(url => (
                      <List.Item key={url}>
                        <List.Content>
                          <List.Header as="a" target="_blank" href={url}>
                            {url.replace('https://github.com/', '')}
                          </List.Header>
                          <List.Description style={{ fontWeight: 'bold', marginTop: '12px' }}>
                            Total commits:
                            {commitDetails[url.replace('https://github.com/', '')] &&
                              commitDetails[url.replace('https://github.com/', '')].length}
                          </List.Description>
                          {!showAllCommits &&
                            commitDetails[url.replace('https://github.com/', '')] && (
                              <CommitsLineChart
                                commits={commitDetails[url.replace('https://github.com/', '')].sort(
                                  (a, b) => new Date(a.date) - new Date(b.date)
                                )}
                                shouldDisplayByWeek={shouldDisplayByWeek}
                              />
                            )}
                          <Divider section />
                          {showAllCommits &&
                            commitDetails[url.replace('https://github.com/', '')] &&
                            commitDetails[url.replace('https://github.com/', '')].length && (
                              <List.Description
                                style={{
                                  fontWeight: 'bold',
                                  color: 'grey'
                                }}
                              >
                                Latest commits:
                              </List.Description>
                            )}
                          <List divided relaxed>
                            {showAllCommits &&
                              commitDetails[url.replace('https://github.com/', '')] &&
                              commitDetails[url.replace('https://github.com/', '')]
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 10)
                                .map(commit => (
                                  <List.Item key={commit.date}>
                                    <List.Content style={{ textAlign: 'left' }}>
                                      {`${commit.date.split('T')[0]} - ${commit.name}`}                                  </List.Content>
                                  </List.Item>
                                ))}
                          </List>

                          {showAllCommits &&
                            commitDetails[url.replace('https://github.com/', '')].length > 10 && (
                              <Header size="tiny">
                                {`${commitDetails[url.replace('https://github.com/', '')].length - 10} more`}
                              </Header>
                            )}
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
