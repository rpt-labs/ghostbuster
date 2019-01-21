import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { StyledHeader } from './Styles/TeamStyles';
import StudentCard from './StudentCard';

const Repo = (props) => {
  const { name, students } = props;
  const studentList = students.map(student => (
    <StudentCard
      key={student.name}
      repoName={name}
      student={student}
    />
  ));

  return (
    <React.Fragment>
      <StyledHeader as="h1">{name}</StyledHeader>
      <Grid celled stackable columns={2} divided stretched>
        {studentList}
      </Grid>
    </React.Fragment>
  );
};

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  students: PropTypes.instanceOf(Object).isRequired,
};

export default Repo;
