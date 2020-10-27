import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { StyledHeader } from '../Styles/TeamStyles';
import StudentCard from './StudentCard';
import MilestoneCommitMessages from './MilestoneCommitMessages';

const Repo = props => {
  const { name, students } = props;
  const studentList = students.map(student => (
    <StudentCard key={student.name} repoName={name} student={student} />
  ));

  return (
    <React.Fragment>
      <StyledHeader as="h1">{name}</StyledHeader>
      <MilestoneCommitMessages sprint={name} />
      <Card.Group itemsPerRow={2}>{studentList}</Card.Group>
    </React.Fragment>
  );
};

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  students: PropTypes.instanceOf(Object).isRequired
};

export default Repo;
