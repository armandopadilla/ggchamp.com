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


export default class Withdraw extends Component {

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
          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle><h3 style={{ textAlign: "center" }}>Wallet Ballance</h3></CardTitle>
                <CardText style={{ textAlign: "center" }}>$304.45</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            <h3>Withdraw</h3>
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