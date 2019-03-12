import React, { Component } from 'react';
import Link from 'next/link';
import {
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
    };

    this.data = [
      { id: '12313123123', name: 'BrosvsBros', title: 'League of Legends', matchType: '3v3', entries: '1/6', entryAmount: 5, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 6},
      { id: '12313123123', name: 'Come at me bro', title: 'League of Legends', matchType: '5v5', entries: '2/10', entryAmount: 15, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
      { id: '12313123123', name: 'At your moms', title: 'League of Legends', matchType: '3v3', entries: '1/6', entryAmount: 25, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 6},
      { id: '12313123123', name: 'Match 123', title: 'League of Legends', matchType: '3v3', entries: '3/6', entryAmount: 25, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 6},
      { id: '12313123123', name: 'Rubber duck escapades', title: 'League of Legends', matchType: '5v5', entries: '2/10', entryAmount: 5, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
      { id: '12313123123', name: 'Hampsters in your face', title: 'League of Legends', matchType: '5v5', entries: '1/10', entryAmount: 5, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
      { id: '12313123123', name: 'Match 4543564', title: 'League of Legends', matchType: '5v5', entries: '2/10', entryAmount: 15, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
      { id: '12313123123', name: 'Rubber duck escapades', title: 'League of Legends', matchType: '5v5', entries: '2/10', entryAmount: 5, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
      { id: '12313123123', name: 'Hampsters in your face', title: 'League of Legends', matchType: '5v5', entries: '1/10', entryAmount: 5, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
      { id: '12313123123', name: 'Match 4543564', title: 'League of Legends', matchType: '5v5', entries: '2/10', entryAmount: 15, startDateTime: 'Feb 23rd, 2019 4:00PM Pacific', maxParticipants: 10},
    ];
  }

  toggleJoinModal = () => {
    this.setState({ joinModal: !this.state.joinModal })
  }

  toggleInviteModal = () => {
    this.setState({ inviteModal: !this.state.inviteModal })
  }


  componentDidMount = () => {
    // Grab the matches from the api
  }

  getDataRows = () => {
    return this.data.map((game) => (
      <tr key={game.id}>
        <td><Link href={`/game/${game.id}`}>{game.name}</Link></td>
        <td>{game.title}</td>
        <td>{game.matchType}</td>
        <td>{game.entries}</td>
        <td>${game.entryAmount.toFixed(2)}</td>
        <td>${(game.entryAmount * game.maxParticipants).toFixed(2)}</td>
        <td>{game.startDateTime}</td>
        <td><Button onClick={this.toggleJoinModal}>Join</Button></td>
      </tr>)
    )
  };

  render () {

    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <h2>Public Matches</h2>
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