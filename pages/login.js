import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap'
import axios from 'axios';
import Link from 'next/link';

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    isInvalidLogin: null,
  };

  handleInputChange = (e) => {
    this.setState({ isInvalidLogin: null });

    const { id, value } = e.target;
    this.setState({[id]: value});
  };

  handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = await axios.post('http://localhost:3000/v1/auth/login', this.state);

      const token = results.data.data.token;

      // We need an AppKey to know its coming from THIS app.

      document.cookie = `token=${token}`;
      window.location = '/home';

    } catch (e) {
      this.setState({ isInvalidLogin: true });
    }
  };

  showAlert = () => {
    return (this.state.isInvalidLogin) ? (<Alert color="danger">Username and/or Password not valid.</Alert>) : null;
  };

  render () {
    return (
      <Col md={3} offset={5} style={{ padding: "15px", margin: "auto" }}>
        <h3>Log In</h3>
        { this.showAlert() }
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
            <Button block>Log In</Button>
          </FormGroup>
        </Form>
          <div>
            <hr />
            <div style={{ textAlign: 'center' }}>or</div>
            <div style={{ textAlign: 'center' }} ><Link href="signup">Create An Account</Link></div>
          </div>
      </Col>
    )
  }

}