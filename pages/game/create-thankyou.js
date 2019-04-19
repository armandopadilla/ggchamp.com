import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios';

export default class GameCreateThankyou extends Component {

  state = {
  };

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({[id]: value});
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    window.location = '/game/create-thankyou'
  };

  render () {
    return (
      <Col md={6} offset={2} style={{ padding: "15px", margin: "auto" }}>
        <h4>Schedule Match</h4>
        Congrats.  Your match has been scheduled.

        <br/><br/>
        Invite here

        <br/><br/>
        Google Cal
        <br/>
        Iphone cal
      </Col>
    )
  }

}