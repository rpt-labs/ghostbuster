import React, { Component } from 'react';
import { Button, Form, Header, Input, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const { GHOSTBUSTER_BASE_URL } = process.env;

let enrollmentStatusList = [
  'Alum',
  'Completed',
  'Deferred',
  'Enrolled',
  'Mulligan',
  'Precourse',
  'Removed',
  'Withdrew'
];
enrollmentStatusList = enrollmentStatusList.map(item => ({ key: item, text: item, value: item }));

// eslint-disable-next-line react/prefer-stateless-function
export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      githubHandle: '',
      zoomName: '',
      cohort: '',
      enrollmentStatus: 'Enrolled',
      showSuccessMessage: false
    };
  }

  handleInputChange = event => {
    const { target } = event;
    const { value, id } = target;

    this.setState({
      [id]: value.trim(),
      showSuccessMessage: false
    });
  };

  handleSelectionChange = (e, { id, value }) => this.setState({ [id]: value });

  addStudent = () => {
    const { cohorts } = this.props;
    const { firstName, lastName, githubHandle, zoomName, cohort, enrollmentStatus } = this.state;

    const selectedCohort = cohorts.find(currentCohort => currentCohort.name === cohort);
    if (selectedCohort && selectedCohort.id) {
      const { id } = selectedCohort;
      const url = `${GHOSTBUSTER_BASE_URL}/ghostbuster/students?&firstName=${firstName}&lastName=${lastName}&github=${githubHandle}&zoomName=${zoomName}&cohortId=${id}&status=${enrollmentStatus.toLowerCase()}`;
      axios.post(url).then(response => {
        if (response.data.student) {
          this.setState({
            firstName: '',
            lastName: '',
            githubHandle: '',
            zoomName: '',
            cohort: '',
            enrollmentStatus: 'Enrolled',
            showSuccessMessage: true
          });
        }
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
    const {
      firstName,
      lastName,
      githubHandle,
      zoomName,
      cohort,
      enrollmentStatus,
      showSuccessMessage
    } = this.state;
    return (
      <React.Fragment>
        <Header as="h1" textAlign="center">
          Add Student
          {showSuccessMessage ? (
            <div>
              <Message positive compact size="mini">
                <Message.Header>Student added!</Message.Header>
              </Message>
            </div>
          ) : (
            <div />
          )}
        </Header>
        <Form onSubmit={this.addStudent}>
          <Form.Field
            control={Input}
            label="First Name"
            placeholder="First Name"
            id="firstName"
            value={firstName}
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="Last Name"
            placeholder="Last Name"
            id="lastName"
            value={lastName}
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="Github Handle"
            placeholder="Github Handle"
            id="githubHandle"
            value={githubHandle}
            onChange={this.handleInputChange}
            required
          />
          <Form.Field
            control={Input}
            label="Zoom Name"
            placeholder="Zoom Name"
            id="zoomName"
            value={zoomName}
            onChange={this.handleInputChange}
          />
          <Form.Group widths="equal">
            <Form.Select
              label="Cohort"
              id="cohort"
              options={cohortsList}
              placeholder="Select Cohort"
              value={cohort}
              onChange={this.handleSelectionChange}
              required
            />
            <Form.Select
              label="Enrollment Status"
              id="enrollmentStatus"
              options={enrollmentStatusList}
              placeholder="Enrollment Status"
              value={enrollmentStatus}
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
