import { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, List, Button, Grid, Segment } from 'semantic-ui-react';
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
                              <CommitsLineChart
                                commits={commitDetails[url.replace('https://github.com/', '')].sort(
                                  (a, b) => new Date(a.date) - new Date(b.date)
                                )}
                                shouldDisplayByWeek={shouldDisplayByWeek}
                              />
                            )}
                          <List.List as="ol">
                            {showAllCommits &&
                              commitDetails[url.replace('https://github.com/', '')] &&
                              commitDetails[url.replace('https://github.com/', '')]
                                .sort((a, b) => new Date(a.date) - new Date(b.date))
                                .map((commit, i) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <List.Item as="li" value="*" key={`${i}`}>
                                    <Grid celled>
                                      <Grid.Column width={12}>{commit.name}</Grid.Column>
                                      <Grid.Column width={4}>
                                        {commit.date.split('T')[0]}
                                      </Grid.Column>
                                    </Grid>
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
