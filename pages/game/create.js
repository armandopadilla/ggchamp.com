import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import axios from 'axios';

export default class GameCreate extends Component {

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
        <Form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <Label for="email">Match Name</Label>
            <Input type="email" name="email" id="email" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Game</Label>
            <Input type="select" name="select" id="select">
              <option>League of Legends</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Game Type</Label>
            <Input type="select" name="select" id="select">
              <option>3 v 3</option>
              <option>5 v 5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="password">Scheduled Start Time</Label>
            <Input type="password" name="password" id="password" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Minimum Entry Fee</Label>
            <Input type="password" name="password" id="password" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Button>Schedule Match</Button>
          </FormGroup>
        </Form>
      </Col>
    )
  }

}