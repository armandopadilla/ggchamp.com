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

  static async getInitialProps ({ query }) {
    return {
      game: query.game
    }
  };

  render () {
    const playerTableInfo = this.props.game.playersInfo.map((player) => {
      return (
        <tr>
          <td>{ player.username }</td>
          <td>{ player.stats.winPercent }%</td>
        </tr>
      )
    })

    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>{ this.props.game.name }</CardTitle>
                <CardSubtitle>{ this.props.game.title }</CardSubtitle>
                <CardText>
                  <div>{ this.props.game.matchType }</div>
                  <div>Entry Fee: ${ this.props.game.entryFee.toFixed(2) }</div>
                  <div>Max Pot: ${ (this.props.game.entryFee * this.props.game.maxParticipants).toFixed(2) } (minus transaction fee)</div>
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
                  { playerTableInfo }
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