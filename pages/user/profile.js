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



export default class Profile extends Component {

  render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>RabbitRacoon</CardTitle>
                <CardSubtitle>League of Legends, DoTA</CardSubtitle>
                <CardText>Rank 234</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            <Row style={{ margin: "auto", padding: "5px", paddingBottom: "35px" }}>
              <Col md={3}>
                <Card body>
                  <CardTitle style={{ textAlign: "center" }}>Games Played</CardTitle>
                  <CardText><h3 style={{ textAlign: "center" }}>300</h3></CardText>
                </Card>
              </Col>
              <Col md={3}>
                <Card body>
                  <CardTitle style={{ textAlign: "center" }}>Games Won</CardTitle>
                  <CardText><h3 style={{ textAlign: "center" }}>203</h3></CardText>
                </Card>
              </Col>
              <Col md={3}>
                <Card body>
                  <CardTitle style={{ textAlign: "center" }}>Win Percentage</CardTitle>
                  <CardText><h3 style={{ textAlign: "center" }}>67%</h3></CardText>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Table striped>
                  <thead>
                  <tr>
                    <th>Game Title</th>
                    <th>Match Type</th>
                    <th>Outcome</th>
                  </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
                    </tr>
                    <tr>
                      <td>League of Legends</td>
                      <td>3 vs 3</td>
                      <td>Won</td>
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