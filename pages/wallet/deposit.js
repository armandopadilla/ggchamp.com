import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import axios from 'axios';
import cookieManager from 'isomorphic-cookie';

const stylez = {
  h3: {
    textAlign: "center"
  }
};


export default class Deposit extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isSubmitted: false,
      isSubmitError: null,
      isSubmitSuccess: null,
      submitErrorMessage: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isSubmitted: false,
      isSubmitSuccess: null,
      submitErrorMessage: null,
      amount: null,
      nameOnCard: null,
      ccNumber: null,
      ccExpDate: null,
      ccSecCode: null,
    });

    const token = cookieManager.load("token");
    let options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.post(`wallet/deposit`, {
      amount: this.state.amount,

    })
      .then((resp) => {
        this.setState({
          isSubmitted: true,
          isSubmitSuccess: true
        });
      }).catch(e => {
        console.log("error", e);
        this.setState({
          isSubmitted: true,
          isSubmitError: true,
          submitErrorMessage: e.message
        })
      });
  };


  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  getSubmitMessage = () => {
    if (this.state.isSubmitted){
      if (this.state.isSubmitError) {
        return (<Alert type="warning">Error! {this.state.submitErrorMessage}</Alert>)
      }
      else {
        return (<Alert type="success">Sucess! Thank you.  Your transaction has been processed. Check you wallet balance
          now.</Alert>)
      }
    }
  }

  render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle><h3 style={{ textAlign: "center" }}>Wallet Ballance</h3></CardTitle>
                <CardText style={{ textAlign: "center" }}>$</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            <h3>Deposit</h3>

            { this.getSubmitMessage() }

            <Form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <Label for="amount">Amount ($USD)</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="ccName">Name on Credit Card</Label>
                <Input type="ccName" name="ccName" id="ccName" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="ccNumber">Credit Card Number</Label>
                <Input type="ccNumber" name="ccNumber" id="ccNumber" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="ccExpDate">Exp Date</Label>
                <Input type="ccExpDate" name="ccExpDate" id="ccExpDate" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="ccSecCode">Security Code</Label>
                <Input type="ccSecCode" name="ccSecCode" id="ccSecCode" onChange={this.handleInputChange} />
              </FormGroup>
              <Button color="primary">Submit</Button>
              { " " }
              <Button color="secondary" href="/wallet">Cancel</Button>
            </Form>
          </Col>
        </Row>
      </Col>
    )
  }

}