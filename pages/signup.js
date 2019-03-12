import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class Index extends Component {

  state = {
    username: '',
    password: '',
    email: '',
    phone: '',
    dob: ''
  };

  handleInputChange = () => {};

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render (){
    return (
    <Col md={3} style={{ padding: "15px", margin: "auto" }}>
      <h4>Sign Up</h4>
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup>
          <Label for="email">Username</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Phone Number</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Date of Birth</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Button>Sign Up</Button>
        </FormGroup>
      </Form>
    </Col>
    )
  }

}