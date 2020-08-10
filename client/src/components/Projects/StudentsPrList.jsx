/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon, List } from 'semantic-ui-react';

export default class StudentsPrList extends Component {
  render() {
    const { studentsList } = this.props;
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
                            {url}
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

