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
      <label>First Name</label>
      <input placeholder="First Name" />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder="Last Name" />
    </Form.Field>
    <Form.Field>
      <label>Github Handle</label>
      <input placeholder="Github Handle" />
    </Form.Field>
    <Form.Select label="Cohort" options={options} placeholder="Select Cohort" />
    <Button type="submit">Submit</Button>
  </Form>
);

export default AddStudent;
