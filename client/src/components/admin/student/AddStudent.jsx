import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'RPT11', value: 'RPT11' },
  { key: 2, text: 'RPT12', value: 'RPT12' },
  { key: 3, text: 'RPT13', value: 'RPT13' },
  { key: 4, text: 'RPT14', value: 'RPT14' },
  { key: 5, text: 'RPT15', value: 'RPT15' }
];

const enrollmentStatus = [
  { key: 1, text: 'Enrolled', value: 'enrolled' },
  { key: 2, text: 'Withdrawn', value: 'withdrawn' },
  { key: 3, text: 'Removed', value: 'Removed' },
  { key: 4, text: 'Mulligan', value: 'Mulligan' },
  { key: 5, text: 'Alum', value: 'Alum' },
  { key: 6, text: 'Precourse', value: 'Precourse' }
];

const AddStudent = () => (
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
    <Form.Select label="Cohort" options={options} placeholder="Select Cohort" />
    <Form.Select
      label="Enrollment Status"
      options={enrollmentStatus}
      placeholder="Enrollment Status"
    />
    <Button type="submit">Submit</Button>
  </Form>
);

export default AddStudent;
