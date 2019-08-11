import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
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

  // #TODO: create 2 functions
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
    // console.log('add student', this.state);
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
        <Form>
          <Form.Field onChange={this.handleInputChange}>
            <label htmlFor="enrollmentId">
              Enrollment Id
              <input type="text" id="enrollmentId" placeholder="Enrollment Id" />
            </label>
          </Form.Field>
          <Form.Field onChange={this.handleInputChange}>
            <label htmlFor="firstName">
              First Name
              <input type="text" id="firstName" placeholder="First Name" />
            </label>
          </Form.Field>
          <Form.Field onChange={this.handleInputChange}>
            <label htmlFor="lastName">
              Last Name
              <input type="text" id="lastName" placeholder="Last Name" />
            </label>
          </Form.Field>
          <Form.Field onChange={this.handleInputChange}>
            <label htmlFor="githubHandle">
              Github Handle
              <input type="text" id="githubHandle" placeholder="Github Handle" />
            </label>
          </Form.Field>
          <Form.Field onChange={this.handleInputChange}>
            <label htmlFor="zoomName">
              Zoom Name
              <input type="text" id="zoomName" placeholder="Zoom Name" />
            </label>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Select
              label="Cohort"
              id="cohort"
              options={cohortsList}
              placeholder="Select Cohort"
              onChange={this.handleSelectionChange}
            />
            <Form.Select
              label="Enrollment Status"
              id="enrollmentStatus"
              options={enrollmentStatus}
              placeholder="Enrollment Status"
              onChange={this.handleSelectionChange}
            />
          </Form.Group>
          <Button type="submit" onClick={this.addStudent}>
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
