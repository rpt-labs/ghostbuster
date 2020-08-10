import React, { Component } from 'react';

export default class StudentsPrList extends Component {
  render() {
    const { studentsList } = this.props;
    return (
      <div>
        {studentsList.map(student => (
          <li key={student.github}>{`${student.firstName} ${student.lastName} - ${student.fecUrls}`}</li>
        ))}
      </div>
    );
  }
}
