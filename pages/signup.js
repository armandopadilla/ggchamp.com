import React, { Component } from 'react';

export default class Signup extends Component {

  render () {
    return (
      <div>
      username: <input type="text" id="username" name="username" /><br />
      email address: <input type="text" id="email" name="email" /><br />
      cell number: <input type="text" id="cellphone" name="cellphone" /><br />
      password: <input type="text" id="password" /><br />
      re enter password<input type="text" id="repassword" /> <br />

      By clicking on Create Account you agree to the terms of use and privacy policy
      <button>Sign up</button>
      </div>
    )
  }

}