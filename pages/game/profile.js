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
                <CardTitle>Rabbit Raccoons Game</CardTitle>
                <CardSubtitle>League of Legends</CardSubtitle>
                <CardText>
                  3 v 3
                  Entry Fee: $35.00
                  Pot: $210.00 (minus transaction fee)
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <Table striped>
                  <thead>
                  <tr>
                    <th>Player</th>
                    <th>Win Percentage</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Duck with a spoon</td>
                    <td>20%</td>
                  </tr>
                  <tr>
                    <td>Teemos Memos</td>
                    <td>45%</td>
                  </tr>
                  <tr>
                    <td>DariusFork</td>
                    <td>51%</td>
                  </tr>
                  <tr>
                    <td>drtwlf</td>
                    <td>60%</td>
                  </tr>
                  <tr>
                    <td>uberscloobers</td>
                    <td>48%</td>
                  </tr>
                  <tr>
                    <td>Saynothing</td>
                    <td>10%</td>
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