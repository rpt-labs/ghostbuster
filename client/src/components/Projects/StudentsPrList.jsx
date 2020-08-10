import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon } from 'semantic-ui-react';

export default class StudentsPrList extends Component {
  render() {
    const { studentsList } = this.props;
    return (
      <div>
        <Card.Group itemsPerRow={2}>
          {studentsList.map(item => (
            <Card key={item.github} style={{ marginBottom: '0px' }}>
              <Card.Content style={{ paddingBottom: '0px' }}>
                <a target="_blank" rel="noopener noreferrer" href={``}>
                  <Card.Header style={{ marginBottom: '10px' }}>
                    <Label size="big">
                      <Icon name="github" />
                      {`${item.firstName} ${item.lastName}`}
                    </Label>
                  </Card.Header>
                </a>
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

