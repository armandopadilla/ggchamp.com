import React, { Component } from 'react';

export default class Profile extends Component {

  render () {
    return (
      <div style={{ padding: '5px' }}>
        <table>
          <tr><td><img src="" /> username</td></tr>
          <tr><td>total game: 20</td></tr>
          <tr><td>total won: 12</td></tr>
          <tr><td>total loses: 8</td></tr>

          <tr><td>rank: 234</td></tr>
        </table>
      </div>
    )
  }

}