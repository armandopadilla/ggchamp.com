import React, { Component } from 'react';
import axios from 'axios';
import {
  Col,
} from 'reactstrap'
const {
  API_URL,
  API_APP_ID,
  API_LOGOUT_ENDPOINT,
}  = require('../constants');
import cookies from 'isomorphic-cookie';

export default class Logout extends Component {

  static getInitialProps ({ req, resp }) {
    const token = cookies.load("token", req);

    // Log the user out by making the API call.
    var options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.post(`auth/logout`, {})
      .then((resp) => {})
      .catch(e => {
        console.log("error", e);
      });
  }

  componentDidMount (){
    cookies.remove("token");
  }

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