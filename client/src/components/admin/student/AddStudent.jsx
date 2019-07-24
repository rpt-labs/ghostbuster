import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const enrollmentStatus = [
  { key: 1, text: 'Alum', value: 'alum' },
  { key: 2, text: 'Deferred', value: 'deferred' },
  { key: 3, text: 'Withdrew', value: 'withdrew' },
  { key: 4, text: 'Completed', value: 'completed' },
  { key: 5, text: 'Enrolled', value: 'enrolled' },
  { key: 6, text: 'Mulligan', value: 'mulligan' },
  { key: 7, text: 'Removed', value: 'removed' },
  { key: 8, text: 'Precourse', value: 'precourse' }
];

// eslint-disable-next-line react/prefer-stateless-function
export default class AddStudent extends Component {
  render() {
    const { cohorts } = this.props;
    const cohortsList = cohorts.map(cohort => ({
      key: cohort.name,
      text: cohort.name,
      value: cohort.name
    }));
    return (
      <React.Fragment>
        <Header as="h1" textAlign="center">
          Add Student
        </Header>
        <Form>
          <Form.Field>
            <label htmlFor="firstName">
              First Name
              <input type="text" id="firstName" placeholder="First Name" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="lastName">
              Last Name
              <input type="text" id="lastName" placeholder="Last Name" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="githubHandle">
              Github Handle
              <input type="text" id="lastName" placeholder="Github Handle" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="zoomName">
              Zoom Name
              <input type="text" id="lastName" placeholder="Zoom Name" />
            </label>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select label="Cohort" options={cohortsList} placeholder="Select Cohort" />
            <Form.Select
              label="Enrollment Status"
              options={enrollmentStatus}
              placeholder="Enrollment Status"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}

AddStudent.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired
};
