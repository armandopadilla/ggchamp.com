import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const stylez = {
  h3: {
    textAlign: "center"
  }
};


export default class WithdrawThankyou extends Component {

  constructor (props) {
    super(props);
  }

  handleSubmit = (e) => {
    console.log("here");
    e.preventDefault();
    window.location = '/wallet/withdraw-thankyou'
  };

  render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={6}>
            <h3>Withdraw</h3>
            <br/>
            Thank you.  Your transaction has been processed.  Please allow up to 3 business days to
            see your deposit in your bank account.
            <br/><br/>
          </Col>
        </Row>
      </Col>
    )
  }

}