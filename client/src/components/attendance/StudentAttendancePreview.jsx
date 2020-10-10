import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';
import queryString from 'query-string';
import moment from 'moment-timezone';
import { studentsRecord, studentsAbsenceRecord } from '../../../data/demoData';
import StudentAbsences from './StudentAbsences';

class StudentAttendancePreview extends Component {
  state = {
    studentName: '',
    attendanceList: [],
    absenceList: [],
    cohort: ''
  };

  componentWillMount() {
    this.getAttendance();
  }

  getAttendance = () => {
    const { location } = this.props;
    const { cohort, firstName, lastName } = queryString.parse(location.search);
    const name = `${firstName} ${lastName}`;
    const attendanceList = studentsRecord.filter(e => {
      return e.user_name === name;
    });
    const absenceList = studentsAbsenceRecord.filter(e => {
      return e.user_name === name;
    });
    this.setState({
      studentName: name,
      cohort,
      attendanceList,
      absenceList
    });
  };

  render() {
    const { studentName, attendanceList, cohort, absenceList } = this.state;
    return (
      <React.Fragment>
        <Header as="h1">{studentName}</Header>
        <Header as="h4">{`Cohort: ${cohort}`}</Header>
        <Header as="h4" style={{ color: 'green' }}>
          Attendance Record
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
            <Table.Header style={{ position: 'sticky', top: 0, zIndex: 2 }}>
              <Table.Row textAlign="center">
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time (PST)</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Is Late?</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {attendanceList.map(e => {
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
                    <Table.Cell>No</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
        <StudentAbsences absenceList={absenceList} />
      </React.Fragment>
    );
  }
}

StudentAttendancePreview.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired
};

export default StudentAttendancePreview;
