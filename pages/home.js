import React, { Component } from 'react';
import Link from 'next/link';
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

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinModal: false,
      inviteModal: false,
      lobbyData: props.lobbyData,
      myGames: props.myGames,
      selectedJoinMatchId: null,
      joinGameInfo: {},
      isJoinSubmitted: false,
      joinErrorMessage: null,
    };
  }

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


  static async getInitialProps({ query }) {
    return {
      lobbyData: query.lobbyData,
      myGames: query.myGames

    }
  }

  getDataRows = () => {
    return this.state.lobbyData.map((game) => (
      <tr key={game._id}>
        <td><Link href={`/game/${game._id}`}>{game.name || "NA"}</Link></td>
        <td>{game.title}</td>
        <td>{game.matchType}</td>
        <td>{game.participants.length}</td>
        <td>${game.entryFee.toFixed(2)}</td>
        <td>${(game.entryFee * game.maxParticipants).toFixed(2)}</td>
        <td>{new Date(game.startDateTime).toLocaleDateString('en-US', {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        })}</td>
        <td><Button id={game._id} onClick={this.toggleJoinModal}>Join</Button></td>
      </tr>)
    )

    return [];
  };


  getMyMatchesDataRows = () => {
    if (!this.state.myGames.length) {
      return (
        <tr><td>You havent joined any games</td></tr>
      )
    }
    else {
      return this.state.myGames.map((game) => (
        <tr key={game._id}>
          <td><Link href={`/game/${game._id}`}>{ game.name || "NA" }</Link></td>
          <td>{game.title}</td>
          <td>{game.matchType}</td>
          <td>{game.entries}</td>
          <td>${game.entryFee.toFixed(2)}</td>
          <td>${(game.entryFee * game.maxParticipants).toFixed(2)}</td>
          <td>{game.startDateTime}</td>
          <td><Button id={game._id} onClick={this.toggleJoinModal}>Join</Button></td>
        </tr>)
      )
    }
  };

  getGameInfo = () => {
    // Grab the token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1OTQ5NTQ1fQ.ZRru8kGP8ORcEjJCA9OKsH62QcPn7ex9xkk_U8ISy5U';

    var options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    axiosInstance.get(`game/${this.state.selectedJoinMatchId}`)
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmRvcGFkaWxsYTgxQGdtYWlsLmNvbSIsImlkIjoiNWNiNzU0MGZlZmQ1Y2U1NWJhNGZjM2Y4IiwidXNlcm5hbWUiOiJhcm1hbmRvIiwiaWF0IjoxNTU1OTQ5NTQ1fQ.ZRru8kGP8ORcEjJCA9OKsH62QcPn7ex9xkk_U8ISy5U';

    var options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    axiosInstance.post(`game/${this.state.selectedJoinMatchId}/join`, {
      contestId: 1,
    })
      .then((resp) => {
        const data = resp.data;
        console.log("success", resp);
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

    // Get the response
    // Show an alert.
  }


  getJoinAlertMessage = () => {
    if (this.state.isJoinSubmitted) {
      if (this.state.joinErrorMessage) {
        return (<Alert color="danger">Whoops! You couldnt join the game.  {this.state.joinErrorMessage}</Alert>)
      }
      else {
        return (<Alert color="success">You're set! You have successfully joined this game.</Alert>)
      }
    }
  };

  render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <h2>Match Lobby</h2>

        <Row>
          <Col>
            <h4>My Matches</h4>
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
          <tbody>
          { this.getMyMatchesDataRows() }
          </tbody>
        </Table>
          </Col>
        </Row>


        <Row>
        <Col>
          <h4>Public Matches</h4>
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
            <tbody>
              { this.getDataRows() }
            </tbody>
          </Table>
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
  }

}