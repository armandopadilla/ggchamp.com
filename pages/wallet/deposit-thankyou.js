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


export default class DepositThankyou extends Component {

  constructor (props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    window.location = '/wallet/deposit-thankyou'
  };

  render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={6}>
            <h3>Deposit</h3>
            <br/>
            Thank you.  Your transaction has been processed. Check you wallet balance
            now.
            <br/><br/>
          </Col>
        </Row>
      </Col>
    )
  }

}