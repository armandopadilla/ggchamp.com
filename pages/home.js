import React, { Component } from 'react';
import Link from 'next/link';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.data = [
      { id: '12313123123', name: 'BrosvsBros', title: 'League of Legends', matchType: '3v3', entries: '1/3', entryAmount: '$5.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Come at me bro', title: 'League of Legends', matchType: '5v5', entries: '2/3', entryAmount: '$15.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'At your moms', title: 'League of Legends', matchType: '3v3', entries: '1/3', entryAmount: '$25.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Match 123', title: 'League of Legends', matchType: '3v3', entries: '3/3', entryAmount: '$25.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Rubber duck escapades', title: 'League of Legends', matchType: '5v5', entries: '2/3', entryAmount: '$5.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Hampsters in your face', title: 'League of Legends', matchType: '5v5', entries: '1/3', entryAmount: '$5.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Match 4543564', title: 'League of Legends', matchType: '5v5', entries: '2/3', entryAmount: '$15.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Rubber duck escapades', title: 'League of Legends', matchType: '5v5', entries: '2/3', entryAmount: '$5.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Hampsters in your face', title: 'League of Legends', matchType: '5v5', entries: '1/3', entryAmount: '$5.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
      { id: '12313123123', name: 'Match 4543564', title: 'League of Legends', matchType: '5v5', entries: '2/3', entryAmount: '$15.00', startDateTime: 'Feb 23rd, 2019 4:00PM Pacific'},
    ];
  }

  getDataRows = () => {
    return this.data.map((game) => (
      <tr key={game.id}>
        <td>{game.name}</td>
        <td>{game.title}</td>
        <td>{game.matchType}</td>
        <td>{game.entries}</td>
        <td>{game.entryAmount}</td>
        <td>{game.startDateTime}</td>
        <td><Link href={`/games/${game.id}/join`}>Join</Link></td>
      </tr>)
    )
  };

  render () {

    return (
      <div>
        <table>
          <tr>
            <td><Link href="/user/profile">Profile</Link></td>
            <td> | Winnings: $1231</td>
            <td> | <Link href="/games/create">Create New Game</Link></td>
            <td> | <Link href="/invite">Invite Friends</Link></td>
          </tr>
        </table>

        <div style={{ padding: '5px' }}>
          <div>
            <h2>Games You Can Join</h2>
          </div>

          <table border="1">
            <tr>
              <td>Match Name</td>
              <td>Game Title</td>
              <td>Match Type</td>
              <td>Entries</td>
              <td>Entry Amount</td>
              <td>Start Date Time</td>
              <td>Options</td></tr>
            { this.getDataRows() }
          </table>
        </div>

      </div>
    );
  }

}