import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';
import queryString from 'query-string';
import moment from 'moment-timezone';
import { studentsRecord } from '../../../data/demoData';

class StudentAttandancePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
      list: [],
      cohort: ''
    };
    this.getAttendance = this.getAttendance.bind(this);
  }

  componentDidMount() {
    this.getAttendance();
  }

  getAttendance() {
    const { location } = this.props;
    const { cohort, firstName, lastName } = queryString.parse(location.search);
    const name = `${firstName} ${lastName}`;
    const list = studentsRecord.filter(e => {
      return e.user_name === name;
    });
    this.setState({
      studentName: name,
      cohort,
      list
    });
  }

  render() {
    const { studentName, list, cohort } = this.state;
    return (
      <React.Fragment>
        <Header as="h1">{studentName}</Header>
        <Header as="h4">{`Cohort: ${cohort}`}</Header>
        <Table collapsing celled striped>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time (PST)</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Is Late?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list.map(e => {
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
      </React.Fragment>
    );
  }
}

StudentAttandancePreview.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired
};

export default StudentAttandancePreview;
