import React from 'react';
import { List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeamModal from './CreateTeamModal';

function StudentsList(props) {
  const { currentStudents } = props;
  return (
    <React.Fragment>
      <h2>Enrolled Students</h2>
      <List>
        {currentStudents.map(student => (
          <List.Item key={student.github}>
            <Checkbox label={`${student.firstName} ${student.lastName}`} />
          </List.Item>
        ))}
      </List>
      <CreateTeamModal />
    </React.Fragment>
  );
}

export default StudentsList;

StudentsList.propTypes = {
  currentStudents: PropTypes.instanceOf(Array).isRequired
};
