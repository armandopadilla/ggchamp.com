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

export default class GameCreate extends Component {

  state = {
    matchName: '',
    title: '',
    gameType: '',
    startDateTime: '',
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

    // Grab the users token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1ODUxODgyfQ.KXuUF82jtpIr1Yf8almnbVjfi1u2tRYDVuakRVLSVVY';
    //console.log(document.cookie);

    // Format the date-time
    const dateTime = new Date(this.state.startDateTime);
    console.log(dateTime);
    this.setState({ startDateTime: dateTime }, async () => {

      // Fetch the data from API
      var options = {
        method: 'POST',
        url: 'http://localhost:3000/v1/game',
        data: this.state,
        headers: {
          'authorization': `Bearer ${token}`
        }
      };

      // To do this should be part of this apps API
      try {
        const res = await axios(options);
        this.setState({ isSubmitted: true, isSuccess: true });

        // Join the contest

      }
      catch(e) {
        this.setState({ isSubmitted: true, isError: true, message: e.response.data.message });
      }

    });
    //const myGames = JSON.parse(resMyData).data;

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
        return (<Alert color="sucess">{this.state.message}</Alert>)
      }
    }
  }

  render () {
    return (
      <Col md={6} offset={2} style={{ padding: "15px", margin: "auto" }}>
        <h4>Schedule Match</h4>
        { this.getSubmitMessage() }
        <Form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <Label for="match_name">Match Name</Label>
            <Input type="text" name="matchName" id="matchName" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="title">Game</Label>
            <Input type="select" name="title" id="title">
              <option>League of Legends</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="gameType">Game Type</Label>
            <Input type="select" name="gameType" id="gameType">
              <option>3 v 3</option>
              <option>5 v 5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="startTime">Scheduled Start Date Time</Label>
            <Input type="datetime" name="startDateTime" id="startDateTime" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="entryFee">Minimum Entry Fee</Label>
            <Input type="text" name="entryFee" id="entryFee" onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Button>Schedule Match</Button>
          </FormGroup>
        </Form>
      </Col>
    )
  }

}