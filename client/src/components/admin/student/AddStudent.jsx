import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const options = [
  { key: '4', text: 'RPT11', value: 'RPT11' },
  { key: '5', text: 'RPT12', value: 'RPT12' },
  { key: '6', text: 'RPT13', value: 'RPT13' },
  { key: '7', text: 'RPT14', value: 'RPT14' },
  { key: '8', text: 'RPT15', value: 'RPT15' }
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
    <Form.Select label="Cohort" options={options} placeholder="Select Cohort" />
    <Button type="submit">Submit</Button>
  </Form>
);

export default AddStudent;
