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
import cookies from 'isomorphic-cookie';
import {
  API_APP_ID,
  API_URL,
  API_GAMES_ENDPOINT,
  API_MY_GAMES_ENDPOINT,
} from '../constants'
import { decorator, restReq } from '../utils';


export default class Home extends Component {

  state = {
    joinModal: false,
    inviteModal: false,
    lobbyData: this.props.lobbyData || [],
    myGames: this.props.myGames || [],
    selectedJoinMatchId: null,
    joinGameInfo: {},
    isJoinSubmitted: false,
    joinErrorMessage: null,
  };

  static async getInitialProps ({ req }) {

    let response = {};
    return restReq().get(`${API_GAMES_ENDPOINT}?$appId=${API_APP_ID}`)
      .then((resp) => {
        const lobbyData = resp.data.data;
        response.lobbyData = lobbyData;
      })
      .then(() => axiosInstance.get(`${API_MY_GAMES_ENDPOINT}?$appId=${API_APP_ID}`))
      .then((resp) => {
        response.myGames = resp.data.data;
        console.log(response);
        return response;
      })
      .catch(e => {
        console.log("error", e);
        return {}
      });
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
        <td>
          <a href={`/game/${game._id}`}>{ decorator.formatMatchName(game.name) }</a>
        </td>
        <td>{ decorator.formatGameTitle(game.title) }</td>
        <td>{ decorator.formatMatchType(game.matchType) }</td>
        <td>{ decorator.formatParticipants(game.participants.length) }</td>
        <td>{ decorator.formatMatchEntryFee(game.entryFee) }</td>
        <td>{ decorator.formatPot(game.entryFee, game.maxParticipants) }</td>
        <td>{ decorator.formatDate(game.startDateTime, game.startTimezone) }</td>
        <td>{ joinButton }</td>
      </tr>);

  }) || [];


  getGameInfo = () => {
    restReq().get(`${API_GAME_ENDPOINT}/${this.state.selectedJoinMatchId}?appId=${API_APP_ID}`)
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

    restReq().post(`game/${this.state.selectedJoinMatchId}/join?appId=${API_APP_ID}`, {
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
          <tbody><tr><td>You haven't joined any games.  <Button color="primary" href="/game/create">Schedule your match!</Button></td></tr></tbody>
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
            Are you sure you want to join, { decorator.formatMatchName(this.state.joinGameInfo.name)  }?.

            <div>Entry Fee: { decorator.formatMatchEntryFee(this.state.joinGameInfo.entryFee) }</div>
            <div>Max Participants: { decorator.formatParticipants(this.state.joinGameInfo.maxParticipants) }</div>
            <div>Start Date/Time: { decorator.formatDate(this.state.joinGameInfo.startDateTime) }</div>

            <hr />
            <div style={{ fontSize: "10px" }}>
              By pressing "Yes" your account will be deducted the entry fee and you agree to the terms of use.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.joinMatch }>Yes</Button>{' '}
            <Button color="secondary" onClick={this.toggleJoinModal}>Nah, Ill pass</Button>
          </ModalFooter>
        </Modal>


      </Col>
    );
  };

}