import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';


export default class Header extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      inviteModal: false,
    };
  }

  toggleInviteModal = () => {
    this.setState({ inviteModal: !this.state.inviteModal })
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

    const isLoggedIn = true;
    if (isLoggedIn) {
      nav = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/user/profile">Earnings To Date: $2,345.00</NavLink>
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
        <NavbarBrand href="/home">gtgchamp.com</NavbarBrand>
        { nav }

        <Modal isOpen={this.state.inviteModal} toggle={this.toggleInviteModal}>
          <ModalHeader toggle={this.toggleInviteModal}>Invite Your Players</ModalHeader>
          <ModalBody>

            <Form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <Label for="amount">Player Phone/Email</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Player Phone/Email</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Player Phone/Email</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Player Phone/Email</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Player Phone/Email</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Player Phone/Email</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleInviteModal}>Invite Players</Button>{' '}
          </ModalFooter>
        </Modal>
      </Navbar>
    )
  }


}