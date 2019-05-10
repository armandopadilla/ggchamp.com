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
import {
  API_APP_ID,
  API_INVITE_ENDPOINT
} from '../constants'
import { decorator, restReq } from '../utils'

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
      myEarnings: props.myEarnings || 0.00,
    };
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

    restReq().post(`${API_INVITE_ENDPOINT}?appId=${API_APP_ID}`, this.state)
      .then((resp) => {
        const data = resp.data;
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
    // Deafult none-logged-in menu
    let nav = null;

    if (this.state.isLoggedIn) {
      nav = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>Earnings To Date: { decorator.formatMoney(this.state.myEarnings) }</NavLink>
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
            <Button color="secondary" onClick={this.toggleInviteModal}>Never mind</Button>
          </ModalFooter>
        </Modal>
      </Navbar>
    )
  }


}