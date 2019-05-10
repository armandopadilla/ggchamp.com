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
import axios from 'axios'
import {
  API_APP_ID,
  API_URL,
  API_CREATE_GAME_ENDPOINT,
} from '../../constants';
import cookies from 'isomorphic-cookie';

export default class GameCreate extends Component {

  state = {
    matchName: '',
    title: '',
    matchType: '',
    startDate: '',
    startTime: '',
    startTimezone: '',
    entryFee: '',
    isSubmitted: false,
    isError: null,
    isSuccess: null,
    message: ''
  };

  handleInputChange = (e) => {

    const { id, value } = e.target;
    this.setState({[id]: value});
  };

  handleOnSubmit = async (e) => {
    e.preventDefault();

    this.setState({ isSubmitted: false });

    // Grab the users token
    const token = cookies.load("token");

    // Format the date-time
    const dateTime = new Date(this.state.startDate+' '+this.state.startTime);
    this.setState({ startDateTime: dateTime }, async () => {

      // Fetch the data from API
      var options = {
        method: 'POST',
        url: `${API_URL}${API_CREATE_GAME_ENDPOINT}?appId=${API_APP_ID}`,
        data: this.state,
        headers: {
          'authorization': `Bearer ${token}`
        }
      };

      //@todo this should be part of this apps API
      try {
        const res = await axios(options);
        this.setState({ isSubmitted: true, isSuccess: true });

        // Join the contest
        this.setState({
          isSubmitted: true,
          isError: false,
          isSuccess: true });
      }
      catch(e) {
        this.setState({ isSubmitted: true, isError: true, message: e.response.message });
      }
    });

  };


  getSubmitMessage = () => {
    if (this.state.isSubmitted) {
      if (this.state.isError) {
        return (<Alert color="danger">Whoops!  Looks like you ran into errors:
          <ul>
            <li>{this.state.message}</li>
          </ul>
        </Alert>)
      }
      else {
        return (
          <Alert color="success">You're set!  Your match has been scheduled.
          Now, invite friends or wait to have new competitors join your match.
          </Alert>)
      }
    }
  }

  render () {
    return (
      <Col md={6} offset={2} style={{ padding: "15px", margin: "auto" }}>
        <h4>Schedule Match</h4>
        { this.getSubmitMessage() }
        <Form onSubmit={this.handleOnSubmit}>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="match_name">Match Name</Label>
                <Input type="text" name="matchName" id="matchName" onChange={this.handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="title">Game</Label>
                <Input type="select" name="title" id="title" onChange={ this.handleInputChange }>
                  <option value="">-- Select Game ---</option>
                  <option>League of Legends</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="matchType">Match Type</Label>
                <Input type="select" name="matchType" id="matchType" onChange={ this.handleInputChange }>
                  <option value="">-- Select Game Type ---</option>
                  <option>3 v 3</option>
                  <option>5 v 5</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="startDate">Scheduled Start Date</Label>
                <Input type="date" name="startDate" id="startDate" onChange={this.handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="startTime">Scheduled Start Time</Label>
                <Input type="time" name="startTime" id="startTime" onChange={this.handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <Label for="startTimezone">Scheduled Timezone</Label>
              <Input type="select" name="startTimezone" id="startTimezone" onChange={ this.handleInputChange }>
                <option value="">--- Select Timezone ---</option>
                <option>PST</option>
                <option>EST</option>
                <option>MST</option>
                <option>GMT</option>
              </Input>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="entryFee">Minimum Entry Fee</Label>
                <Input type="text" name="entryFee" id="entryFee" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Button color="primary">Schedule Match</Button> {' '} <Button color="secondary">Cancel</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    )
  }

}