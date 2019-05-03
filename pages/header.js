import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Alert,
} from 'reactstrap';
import axios from 'axios';
import cookieManager from 'isomorphic-cookie';
import { decorator, auth } from '../utils'

export default class Header extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      inviteModal: false,
      invite1: null,
      invite2: null,
      invite3: null,
      walletBalance: props.walletBalance,
      isLoggedIn: props.isLoggedIn || false,
    };
  }

  static async getInitialProps ({ req }) {
    const isLoggedIn = await auth.isLoggedIn(req);
    console.log("is logged in", isLoggedIn);
    if (!isLoggedIn) {
      return {
        isLoggedIn: false
      }
    }

    console.log("i was called");
    const token = cookieManager.load("token", req);
    console.log("header token", token);

    const options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.get(`wallet/my-wallet`)
      .then((resp) => {
        const { data } = resp.data;
        const { wallet } = data;
        console.log("data", data);
        return {
          walletBalance: decorator.formatMoney(data.balance),
          isLoggedIn: true
        }
      }).catch(e => {
      console.log("error", e);
    });
  }

  componentDidMount () {}

  toggleInviteModal = () => {
    this.setState({
      inviteModal: !this.state.inviteModal ,
      inviteErrorMessage: null,
      invite1: null,
      invite2: null,
      invite3: null,
      inviteSubmitted: false,
    })
  };

  handleInputChange = (e) => {
    const { id, value } = e.target;

    this.setState({
      [id]: value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Make a call to the BE.
    // Grab the token
    const token = cookieManager.load("token");

    var options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    axiosInstance.post(`invite`, this.state)
      .then((resp) => {
        const data = resp.data;
        console.log("success", resp);
        this.setState({
          inviteSubmitted: true,
        });
      }).catch(e => {
      console.log("error", e.response.data.message);
      this.setState({
        inviteErrorMessage: e.response.data.message,
        inviteSubmitted: true,
      })
    });
  }

  getInviteAlertMessage = () => {
    if (this.state.inviteSubmitted) {
      if (this.state.inviteErrorMessage) {
        return (<Alert color="danger">Whoops! We couldnt send the invites.  {this.state.inviteErrorMessage}</Alert>)
      }
      else {
        return (<Alert color="success">You're set! We sent out your invites.</Alert>)
      }
    }
  };

  getHeader = () => {
    console.log(this.state);
    // Deafult none-logged-in menu
    let nav = null;

    if (this.state.isLoggedIn) {
      console.log("==== im logged in");
      nav = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/user/profile">Earnings To Date: ${this.state.walletBalance}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/home">Match Lobby</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/wallet">Your Wallet</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/user/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/game/create">Set Up Match</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={ this.toggleInviteModal }>Invite Friends</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/logout">Log Out</NavLink>
          </NavItem>
        </Nav>
      );

    } else {
      nav = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/signup">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Log In</NavLink>
          </NavItem>
        </Nav>
      );
    }

    return nav;
  }

  render = () => {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/home">ggChamp.com</NavbarBrand>

        { this.getHeader() }

        <Modal isOpen={this.state.inviteModal} toggle={this.toggleInviteModal}>
          <ModalHeader toggle={this.toggleInviteModal}>Invite Friends & Competitors</ModalHeader>
          <ModalBody>
            { this.getInviteAlertMessage() }
            <Form>
              <FormGroup>
                <Input type="invite1" placeholder="Mobile Phone Number or Email Address" name="invite1" id="invite1" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Input type="invite2" placeholder="Mobile Phone Number or Email Address" name="invit2" id="invite2" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Input type="invite3" placeholder="Mobile Phone Number or Email Address" name="invite3" id="invite3" onChange={this.handleInputChange} />
              </FormGroup>
            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ this.handleSubmit }>Invite!</Button>{' '}
            <Button color="default" onClick={this.toggleInviteModal}>Never mind...:-\</Button>
          </ModalFooter>
        </Modal>
      </Navbar>
    )
  }


}