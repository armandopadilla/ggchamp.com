import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios';

export default class Logout extends Component {

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
      <Col md={5} offset={6} style={{ padding: "15px", margin: "auto" }}>
        You're successfully signed out of your account.
      </Col>
    )
  }

}