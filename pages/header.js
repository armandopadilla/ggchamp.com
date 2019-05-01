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
import { decorator } from '../utils'

export default class Header extends React.Component {



  constructor (props) {
    super(props);

    this.state = {
      inviteModal: false,
      invite1: null,
      invite2: null,
      invite3: null,
      walletBalance: 0,
    };
  }

  componentDidMount () {
    console.log("...i was called in the server...");
    const token = cookieManager.load("token");

    var options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    axiosInstance.get(`wallet/my-wallet`)
      .then((resp) => {
        const { data } = resp.data;
        this.setState({
          walletBalance: decorator.formatMoney(data.balance)
        })
      }).catch(e => {
        console.log("error", e.response.data.message);
    });

  }

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

  isLoggedIn = () => {
    // Grab the token
    const token = cookieManager.load("token");
    return (token);
  }

  render = () => {

    // Deafult none-logged-in menu
    let nav = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/signup">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Log In</NavLink>
        </NavItem>
      </Nav>
    );

    if (this.isLoggedIn()) {
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

    }
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/home">ggChamp.com</NavbarBrand>
        { nav }

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