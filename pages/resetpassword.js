import React, { Component } from 'react';

export default class Resetpassword extends Component {

  render () {
    return (
      <form>
        Email: <input type="text" id="email" name="email"/><br/>

        <button>Reset My Account</button>
      </form>
    )
  }

}