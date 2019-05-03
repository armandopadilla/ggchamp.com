import React, { Component } from 'react';
import {
  Row,
  Col,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap';
import axios from 'axios';
import cookieManager from 'isomorphic-cookie';
import {
  API_APP_ID,
  API_URL,
  API_GAME_ENDPOINT,
} from '../constants'
import { decorator, auth } from '../utils';
import redirect from 'next-redirect';


export default class Home extends Component {

  state = {
    joinModal: false,
    inviteModal: false,
    lobbyData: this.props.lobbyData,
    myGames: this.props.myGames,
    selectedJoinMatchId: null,
    joinGameInfo: {},
    isJoinSubmitted: false,
    joinErrorMessage: null,
  };

  static async getInitialProps ({ query }) {
    // Check if the user is logged in.
    //if (!auth.isLoggedIn()) {
    //  console.log("not logged in")
    //  return redirect(ctx, '/')
    //}

    return {
      lobbyData: query.lobbyData,
      myGames: query.myGames
    }
  };

  toggleJoinModal = (e) => {
    const {id} = e.target;

    this.setState({
      joinModal: !this.state.joinModal ,
      selectedJoinMatchId: id,
      isJoinSubmitted: false,
      joinErrorMessage: null,
    }, () => {
      if (this.state.joinModal) {
        this.getGameInfo()
      }
    })
  };

  toggleInviteModal = () => {
    this.setState({ inviteModal: !this.state.inviteModal })
  };


  getMatchTableRows = (records, showJoinButton) => records.map((game) => {

      let joinButton = (showJoinButton) ? (<Button id={game._id} onClick={this.toggleJoinModal}>Join</Button>) : null;

      return (<tr key={game._id}>
        <td><a href={`/game/${game._id}`}>{ decorator.formatMatchName(game.name) }</a></td>
        <td>{game.title}</td>
        <td>{game.matchType}</td>
        <td>{game.participants.length}</td>
        <td>${game.entryFee.toFixed(2)}</td>
        <td>${(game.entryFee * game.maxParticipants).toFixed(2)}</td>
        <td>{ decorator.formatDate(game.startDateTime) }</td>
        <td>{ joinButton }</td>
      </tr>);

  }) || [];


  getGameInfo = () => {
    // Grab the token
    const token = cookieManager.load("token");

    let options = {
      baseURL: `${API_URL}`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    axiosInstance.get(`${API_GAME_ENDPOINT}/${this.state.selectedJoinMatchId}?appId=${API_APP_ID}`)
      .then((resp) => {
        const data = resp.data;
        const { name,  startDateTime, entryFee, maxParticipants } = data.data;
        this.setState({ joinGameInfo: { name, startDateTime, entryFee, maxParticipants } });
      });

  };


  /**
   * Allows the user to join a specific match
   */
  joinMatch = () => {
    const gameInfoToJoin = this.state.joinGameInfo;

    // make the call to join the specific game
    // Grab the token
    const token = cookieManager.load("token");

    let options = {
      baseURL: `${API_URL}`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    axiosInstance.post(`game/${this.state.selectedJoinMatchId}/join?appId=${API_APP_ID}`, {
      contestId: 1,
    })
      .then((resp) => {
        const data = resp.data;
        this.setState({
          joinSubmitted: true,
        });
        //const { name,  startDateTime, entryFee, maxParticipants } = data.data;
        //this.setState({ joinGameInfo: { name, startDateTime, entryFee, maxParticipants } });
      }).catch(e => {
        console.log("error", e.response.data.message);
        this.setState({
          joinErrorMessage: e.response.data.message,
          isJoinSubmitted: true,
        })
    });
  };


  getJoinAlertMessage = () => {
    if (this.state.isJoinSubmitted) {
      if (this.state.joinErrorMessage) {
        return (<Alert color="danger">Whoops! You couldn't join the game.  {this.state.joinErrorMessage}</Alert>)
      }
      else {
        return (<Alert color="success">You're set! You have successfully joined this game.</Alert>)
      }
    }
  };


  getPublicGamesTable = () => {
    if (this.state.lobbyData.length) {
      return (
        <Table striped>
          <thead>
        <tr>
          <th>Match Name</th>
          <th>Game Title</th>
          <th>Match Type</th>
          <th>Entries</th>
          <th>Entry Amount</th>
          <th>Pot</th>
          <th>Start Date Time</th>
          <th>Options</th>
        </tr>
        </thead>
        <tbody>{ this.getMatchTableRows(this.state.lobbyData, true) }</tbody>
        </Table>
      )
    } else {
      return (
        <Table striped>
          <tbody><tr><td>There are no public games at the moment</td></tr></tbody>
        </Table>)
    }
  };

  getMyMatchTable = () => {
    if (this.state.myGames.length) {
      return (
        <Table striped>
          <thead>
            <tr>
              <th>Match Name</th>
              <th>Game Title</th>
              <th>Match Type</th>
              <th>Entries</th>
              <th>Entry Amount</th>
              <th>Pot</th>
              <th>Start Date Time</th>
            </tr>
          </thead>
        <tbody>{ this.getMatchTableRows(this.state.myGames, false) }</tbody>
        </Table>
      )
    } else {
      return (
        <Table striped>
          <tbody><tr><td>You havent joined any games</td></tr></tbody>
        </Table>)
    }

  };


  render = () => {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <h2>Match Lobby</h2>

        <Row>
          <Col>
            <h4>My Matches</h4>
            { this.getMyMatchTable() }
          </Col>
        </Row>


        <Row>
        <Col>
          <h4>Public Matches</h4>
          { this.getPublicGamesTable() }
        </Col>
        </Row>

        <Modal isOpen={this.state.joinModal} toggle={this.toggleJoinModal}>
          <ModalHeader toggle={this.toggleJoinModal}>Join Game</ModalHeader>
          <ModalBody>
            { this.getJoinAlertMessage() }
            Are you sure you want to join, { this.state.joinGameInfo.name  }?.

            <div>Entry Fee: ${ this.state.joinGameInfo.entryFee }</div>
            <div>Max Participants: { this.state.joinGameInfo.maxParticipants }</div>
            <div>Start Date/Time: { this.state.joinGameInfo.startDateTime }</div>

            <hr />
            <div style={{ fontSize: "10px" }}>
              By pressing "yup" your account will be deducted,
              you agree to the terms of use.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.joinMatch }>Yup</Button>{' '}
            <Button color="secondary" onClick={this.toggleJoinModal}>Nah, Ill pass</Button>
          </ModalFooter>
        </Modal>


      </Col>
    );
  };

}