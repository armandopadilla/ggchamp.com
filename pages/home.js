import React, { Component } from 'react';
import Link from 'next/link';

export default class Home extends Component {

  render () {
    return (
      <div>
    <table><tr><td><Link href="/user/profile">Profile</Link></td><td>Winnings: $1231</td></tr></table>
    <table><tr><td><Link href="/games/create">Create New Game</Link></td></tr></table>
    <table><tr><td><Link href="/invite">Invite Friends</Link></td></tr></table>

    <table>
    <tr><td>Game Name</td><td>Game</td><td>entries</td><td>Entry Amount</td><td>options</td></tr>
    <tr><td>Games1</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games2</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games3</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games4</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games5</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games6</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games7</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games8</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games9</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      <tr><td>Games10</td><td>League of Legends</td><td>0/3</td><Link href="/game/join">Join</Link></tr>
      </table>

      <footer>
      Terms of Use | Privacy Policy
    </footer>
      </div>
    );
  }

}