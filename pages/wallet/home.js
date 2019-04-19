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
  Table
} from 'reactstrap';

const stylez = {
  h3: {
    textAlign: "center"
  }
}


export default class Home extends Component {

  constructor (props) {
    super(props);
  }

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
            <Row style={{ margin: "auto", padding: "5px", paddingBottom: "35px" }}>
              <Col>
                <Button color="secondary" href="/wallet/withdraw">Withdraw</Button>
                { " " }
                <Button color="primary" href="/wallet/deposit">Deposit</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped>
                  <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Deposit (Bank)</td>
                      <td>$25.00</td>
                      <td>Oct 3, 2019</td>
                    </tr>
                    <tr>
                      <td>Deposit (Match Won)</td>
                      <td>$10.00</td>
                      <td>Oct 4, 2019</td>
                    </tr>
                    <tr>
                      <td>Withdraw (Bank)</td>
                      <td>$20.00</td>
                      <td>Oct 4, 2018</td>
                    </tr>
                    <tr>
                      <td>Deposit (Bank)</td>
                      <td>$25.00</td>
                      <td>Oct 5, 2018</td>
                    </tr>
                    <tr>
                      <td>Deposit (Match Won)</td>
                      <td>$25.00</td>
                      <td>Oct 6, 2018</td>
                    </tr>
                    <tr>
                      <td>Withdraw (Entry Fee)</td>
                      <td>$5.00</td>
                      <td>Oct 6, 2018</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }

}