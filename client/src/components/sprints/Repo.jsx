import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { StyledHeader } from '../Styles/TeamStyles';
import StudentCard from './StudentCard';
import MilestoneCommitMessages from './MilestoneCommitMessages';

const Repo = ({ name, students }) => {
  const studentList = students.map(student => (
    <StudentCard key={student.name} repoName={name} student={student} />
  ));

  return (
    <>
      <StyledHeader as="h1">{name}</StyledHeader>
      <MilestoneCommitMessages sprint={name} />
      <Card.Group itemsPerRow={2}>{studentList}</Card.Group>
    </>
  );
};

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  students: PropTypes.instanceOf(Object).isRequired
};

export default Repo;
