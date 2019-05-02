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


export default class Withdraw extends Component {

  static async getInitialProps ({ req }) {
    // Get the accounts

  }

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
    })

    const token = cookieManager.load("token");
    let options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.post(`wallet/withdraw`, {
      amount: this.state.amount
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
        return (<Alert type="success">Sucess! Thank you.  Your transaction has been processed.  Please allow up to 3 business days to
          see your deposit in your bank account.</Alert>)
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
            <h3>Withdraw</h3>

            { this.getSubmitMessage() }

            <Form onSubmit={ this.handleSubmit }>
              <FormGroup>
                <Label for="amount">Amount ($USD)</Label>
                <Input type="amount" name="amount" id="amount" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Deposit To Account:</Label>
                <Input type="select" name="select" id="select">
                  <option>Bank of Amer. - #45464334</option>
                  <option>Chase - #576768</option>
                </Input>
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