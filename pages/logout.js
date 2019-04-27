import React, { Component } from 'react';
import {
  Col,
} from 'reactstrap'

export default class Logout extends Component {

  render () {
    return (
      <Col md={3} offset={5} style={{ padding: "15px", margin: "auto", textAlign: "center" }}>
        <div>You successfully signed out of your account. </div>
        <hr />
        <div><a href="/">Home</a></div>
      </Col>
    )
  }

}