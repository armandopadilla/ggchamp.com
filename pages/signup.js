import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';
import axios from 'axios';
import Link from 'next/link';

export default class Index extends Component {

  state = {
    username: '',
    password: '',
    repassword: '',
    email: '',
    phone: '',
    dob: '',
    acceptedTerms: 'no',
    isValid: null,
    message: '',
    submitted: false
  };

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();


    // Check the passwords
    if (this.state.password != this.state.repassword) {
      this.setState({ isValid: false, message: 'Passwords do not match', submitted: true});
    } else {
      // update the date
      const dob = new Date(this.state.dob);

      this.setState({ dob, acceptedTerms: 'yes' }, async () => {
        try {
          const results = await axios.post('http://localhost:3000/v1/user', this.state);
          this.setState({ isValid: true, submitted: true });
        } catch (e) {
          this.setState({ isValid: false, message: e.response.data.message, submitted: true })
        }

      });
    }
  };

  render (){

    let message = null;
    if (this.state.submitted) {

      message = (
        <Alert color="success">
          <strong>Success!</strong> Welcome to ggchamp.com<br />
          Verify your email/phone number but you can still log in using the below <Link href="login">link</Link>.
        </Alert>);

      if (!this.state.isValid) {
        message = (
          <Alert color="danger">
            <strong>Whoops!</strong> We found some issues with your info<br />
            <ul><li>{this.state.message}</li></ul>
          </Alert>);
      }



    }

    return (
    <Col className="pageContainer" md={5} style={{ padding: "15px", margin: "auto" }}>
      <h3 className="pageHeader">Sign Up</h3>
      { message }
      <Form onSubmit={ this.handleSubmit }>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" onChange={ this.handleInputChange } />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={ this.handleInputChange } />
        </FormGroup>
        <FormGroup>
          <Label for="repassword">Re-Enter Password</Label>
          <Input type="password" name="repassword" id="repassword" onChange={ this.handleInputChange }/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={ this.handleInputChange } />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input type="phone" name="phome" id="phone" onChange={ this.handleInputChange } />
        </FormGroup>
        <FormGroup>
          <Label for="dob">Date of Birth</Label>
          <Input type="date" name="dob" id="dob" onChange={ this.handleInputChange } />
        </FormGroup>
        <FormGroup>
          <hr />
          <h5>By clicking "Sign Up" you agree to the Terms of Use.</h5>
          <Button type="primary">Sign Up</Button>
        </FormGroup>
      </Form>
    </Col>
    )
  }

}