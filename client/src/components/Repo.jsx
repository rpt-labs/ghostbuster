import React from 'react';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';

const Repo = (props) => {
  const { name, students } = props;
  const studentList = students.map(student => (<StudentCard key={student.name} repoName={name} student={student} />));

  return (
    <div className="repo-item">
      <h1 className="repo-title">{name}</h1>
      <div className="ui two column stackable divided grid">
        {studentList}
      </div>
    </div>
  );
};

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  students: PropTypes.instanceOf(Object).isRequired,
};

export default Repo;
