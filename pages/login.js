import React, { Component } from 'react';
import Link from 'next/link';

export default class Login extends Component {

  render () {
    return (
      <form>
        Email: <input type="text" id="email" name="email"/><br/>
        Password: <input type="password" id="password" />
        <button>Login</button><br /><br />
        <Link href="signup">Sign Up</Link> | <Link href="resetpassword">Reset Password</Link>
      </form>
    )
  }

}