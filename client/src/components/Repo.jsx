import React from 'react';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';

const Repo = (props) => {
  const { name, students } = props;
  const studentList = students.map(student => (<StudentCard repoName={name} student={student} />));

  return (
    <div>
      <h1>{name}</h1>
      <div className="ui fluid">
        {studentList}
      </div>
    </div>
  );
};

Repo.defaultProps = {
  name: 'Hello',
  students: [{ name: 'cheese' }, { name: 'tart' }],
};

Repo.propTypes = {
  name: PropTypes.string,
  students: PropTypes.instanceOf(Object),
};

export default Repo;
