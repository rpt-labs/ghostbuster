import React, { Component } from 'react';
import { Button, Form, Header, Input, Message, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const { GHOSTBUSTER_BASE_URL } = process.env;

const enrollmentStatusList = [
  { key: 0, text: 'Alum', value: 'alum' },
  { key: 1, text: 'Completed', value: 'completed' },
  { key: 2, text: 'Deferred', value: 'deferred' },
  { key: 3, text: 'Enrolled', value: 'enrolled' },
  { key: 4, text: 'Mulligan', value: 'mulligan' },
  { key: 5, text: 'Precourse', value: 'precourse' },
  { key: 6, text: 'Removed', value: 'removed' },
  { key: 7, text: 'Withdrew', value: 'withdrew' }
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
      enrollmentStatus: enrollmentStatusList[3].value,
      showSuccessMessage: false
    };
  }

  handleInputChange = event => {
    const { target } = event;
    const { value, id } = target;

    this.setState({
      [id]: value,
      showSuccessMessage: false
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
      const { id } = selectedCohort;
      axios
        .post(
          `${GHOSTBUSTER_BASE_URL}/ghostbuster/students?enrollmentId=${enrollmentId}
          &firstName=${firstName}&lastName=${lastName}&github=${githubHandle}
          &zoomName=${zoomName}&cohortId=${id}&status=${enrollmentStatus}`
        )
        .then(response => {
          if (response.data.student) {
            this.setState({
              enrollmentId: '',
              firstName: '',
              lastName: '',
              githubHandle: '',
              zoomName: '',
              cohort: '',
              enrollmentStatus: enrollmentStatusList[3].value,
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
      enrollmentId,
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
            label="Enrollment Id"
            placeholder="Enrollment Id"
            value={enrollmentId}
            id="enrollmentId"
            onChange={this.handleInputChange}
            required
          />
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
