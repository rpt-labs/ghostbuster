/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Label, Card, List } from 'semantic-ui-react';

const { GHOSTBUSTER_BASE_URL } = process.env;

export default class StudentsPrList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commitDetails: this.getRepoList(props.studentsList)
    };
    this.getCommits = this.getCommits.bind(this);
    this.getRepoList = this.getRepoList.bind(this);
  }

  componentDidMount() {
    this.getRepoList();
  }

  getRepoList = async () => {
    const { studentsList } = this.props;
    const commitDetails = {};
    const urls = [];
    studentsList.forEach(student => {
      urls.push(...student.fecUrls.split(','));
    });
    const repoList = urls.map(url => url.replace('https://github.com/', '').trim());
    repoList.map(async repo => {
      const commit = await this.getCommits(repo);
      commitDetails[repo] = commit;
      this.setState({ ...this.state, ...commitDetails });
    });
  };

  getCommits = repoName => {
    return axios
      .get(`${GHOSTBUSTER_BASE_URL}/ghostbuster/projects/commits?repoName=${repoName}`)
      .then(response => {
        const { commits = [] } = response.data;
        return commits;
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { studentsList } = this.props;
    // console.log('this.state', this.state);
    return (
      <div>
        <Card.Group itemsPerRow={2}>
          {studentsList.map(item => (
            <Card key={item.github} style={{ marginBottom: '0px' }}>
              <Card.Content style={{ paddingBottom: '10px' }}>
                <Card.Header style={{ marginBottom: '10px' }}>
                  <Label size="big" color="teal">{`${item.firstName} ${item.lastName}`}</Label>
                </Card.Header>
                <Card.Description>
                  <List divided relaxed>
                    {item.fecUrls.split(',').map(url => (
                      <List.Item key={url}>
                        <List.Icon name="github" size="large" verticalAlign="middle" />
                        <List.Content>
                          <List.Header as="a" target="_blank" href={url}>
                            {url.replace('https://github.com/', '')}
                          </List.Header>
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

StudentsPrList.propTypes = {
  studentsList: PropTypes.instanceOf(Array).isRequired
};
