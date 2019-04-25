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
  Button
} from 'reactstrap';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinModal: false,
      inviteModal: false,
      lobbyData: props.lobbyData,
      myGames: props.myGames,
    };
  }

  toggleJoinModal = () => {
    this.setState({ joinModal: !this.state.joinModal })
  }

  toggleInviteModal = () => {
    this.setState({ inviteModal: !this.state.inviteModal })
  }


  static async getInitialProps({ query }) {
    console.log("lo", query.lobbyData);
    return {
      lobbyData: query.lobbyData,
      myGames: query.myGames

    }
  }

  getDataRows = () => {
    /*
    return this.state.lobbyData.map((game) => (
      <tr key={game._id}>
        <td><Link href={`/game/${game._id}`}>{game.name}</Link></td>
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
        <td><Button onClick={this.toggleJoinModal}>Join</Button></td>
      </tr>)
    )*/

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
          <td><Button onClick={this.toggleJoinModal}>Join</Button></td>
        </tr>)
      )
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
            Are you sure you want to join this game?

            Entry Fee:  $5 (if "yup" your account will be deducted this amount)
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleJoinModal}>Yup</Button>{' '}
            <Button color="secondary" onClick={this.toggleJoinModal}>Nah, Ill pass</Button>
          </ModalFooter>
        </Modal>


      </Col>
    );
  }

}