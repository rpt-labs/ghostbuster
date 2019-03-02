import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import queryString from 'query-string';
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
    const { cohort, firstName, lastName } = queryString.parse(this.props.location.search);
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
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{`${studentName} - ${cohort}`}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {list.map(e => {
            return (
              <Table.Row key={`${e.firstName} - ${e.join_time}`}>
                <Table.Cell>{e.join_time}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default StudentAttandancePreview;
