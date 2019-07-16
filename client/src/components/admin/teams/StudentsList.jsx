import React from 'react';
import { List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeamModal from './CreateTeamModal';

function StudentsList(props) {
  const { selectedCohortStudents } = props;
  const currentStudents = selectedCohortStudents.filter(student => student.status === 'enrolled');
  return (
    <React.Fragment>
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
  selectedCohortStudents: PropTypes.instanceOf(Array).isRequired
};
