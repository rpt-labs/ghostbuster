import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';

function Dashboard({ cohorts }) {
  const cohortsList = cohorts
    .filter(cohort => cohort.status === 'current')
    .map(cohort => ({
      key: cohort.name,
      text: cohort.name,
      value: cohort.name
    }));

  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            label="Cohort"
            id="cohort"
            options={cohortsList}
            placeholder="Select Cohort"
            required
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired
};
