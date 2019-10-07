import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Header, Input } from 'semantic-ui-react';
import moment from 'moment-timezone';

class StudentAbsences extends Component {
  constructor(props) {
    super(props);
    const { absenceList } = this.props;
    this.state = {
      absenceList
    };
  }

  render() {
    const { absenceList } = this.state;
    return (
      <React.Fragment>
        <Header as="h4" style={{ color: 'dodgerblue' }}>
          Absence Record
        </Header>
        <div
          style={{
            height: '250px',
            overflow: 'auto',
            boxSizing: 'border-box',
            width: '70%'
          }}
        >
          <Table
            collapsing
            celled
            striped
            style={{
              width: '100%'
            }}
          >
            {/* #TODO: Make the header sticky */}
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time (PST)</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Is Excused?</Table.HeaderCell>
                <Table.HeaderCell>Points</Table.HeaderCell>
                <Table.HeaderCell>Staff Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {absenceList.map(e => {
                const dateTime = moment
                  .tz(e.join_time, 'America/Los_Angeles')
                  .format('MM/DD/YYYY h:mm a');
                const date = dateTime.split(' ')[0];
                const time = `${dateTime.split(' ')[1]} ${dateTime.split(' ')[2]}`;
                return (
                  <Table.Row key={`${e.firstName} - ${e.join_time}`}>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell>{time}</Table.Cell>
                    <Table.Cell>{e.type}</Table.Cell>
                    <Table.Cell>{e.isExcused ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{e.points}</Table.Cell>
                    <Table.Cell>
                      <Input transparent defaultValue={e.staffNotes} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

StudentAbsences.propTypes = {
  absenceList: PropTypes.instanceOf(Array).isRequired
};

export default StudentAbsences;
