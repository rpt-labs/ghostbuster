import React from 'react';
import { List, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CreateTeamModal from './CreateTeamModal';

function StudentsList(props) {
  const { selectedCohortStudents } = props;
  return (
    <React.Fragment>
      <List>
        {selectedCohortStudents.map(student => (
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
