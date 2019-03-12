import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios';

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  };

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({[id]: value});
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    // Shoot off the request .
    // axios.post()
  };

  render () {
    return (
      <Col md={2} offset={5} style={{ padding: "15px", margin: "auto" }}>
        <h4>Log In</h4>
        <Form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Button>Log In</Button>
          </FormGroup>
        </Form>
      </Col>
    )
  }

}