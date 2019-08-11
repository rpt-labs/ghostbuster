import React, { Component } from 'react';
import { Button, Form, Header, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const { GHOSTBUSTER_BASE_URL } = process.env;

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
  constructor(props) {
    super(props);
    this.state = {
      enrollmentId: '',
      firstName: '',
      lastName: '',
      githubHandle: '',
      zoomName: '',
      cohort: '',
      enrollmentStatus: ''
    };
  }

  handleInputChange = event => {
    const { target } = event;
    const { value, id } = target;

    this.setState({
      [id]: value
    });
  };

  handleSelectionChange = (e, { id, value }) => this.setState({ [id]: value });

  addStudent = () => {
    const { cohorts } = this.props;
    const {
      enrollmentId,
      firstName,
      lastName,
      githubHandle,
      zoomName,
      cohort,
      enrollmentStatus
    } = this.state;

    const selectedCohort = cohorts.find(currentCohort => currentCohort.name === cohort);
    if (selectedCohort && selectedCohort.id) {
      axios
        .post(
          `${GHOSTBUSTER_BASE_URL}/ghostbuster/students?enrollmentId=${enrollmentId}&firstName=${firstName}&lastName=${lastName}&github=${githubHandle}&zoomName=${zoomName}&cohortId=${
            selectedCohort.id
          }&status=${enrollmentStatus}`
        )
        .then(response => {
          console.log(response);
        });
    }
  };

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
        <Form onSubmit={this.addStudent}>
          <Form.Field
            control={Input}
            label="Enrollment Id"
            placeholder="Enrollment Id"
            id="enrollmentId"
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="First Name"
            placeholder="First Name"
            id="firstName"
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="Last Name"
            placeholder="Last Name"
            id="lastName"
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="Github Handle"
            placeholder="Github Handle"
            id="githubHandle"
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="Zoom Name"
            placeholder="Zoom Name"
            id="zoomName"
            onChange={this.handleInputChange}
          />
          <Form.Group widths="equal">
            <Form.Select
              label="Cohort"
              id="cohort"
              options={cohortsList}
              placeholder="Select Cohort"
              onChange={this.handleSelectionChange}
              required
            />
            <Form.Select
              label="Enrollment Status"
              id="enrollmentStatus"
              options={enrollmentStatus}
              placeholder="Enrollment Status"
              onChange={this.handleSelectionChange}
              required
            />
          </Form.Group>
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

AddStudent.propTypes = {
  cohorts: PropTypes.instanceOf(Array).isRequired
};
