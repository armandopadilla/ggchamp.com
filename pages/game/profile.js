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
  Table
} from 'reactstrap';

import {
  API_GAME_ENDPOINT,
  API_APP_ID,
} from '../../constants'

const stylez = {
  h3: {
    textAlign: "center"
  }
}

import cookies from 'isomorphic-cookie';
import axios from 'axios';
import { decorator } from '../../utils';

import lolBadge from '../../static/images/lol_badge.png';

export default class Profile extends Component {

  static async getInitialProps ({ req, query }) {

    // Check if the user is logged in or not
    // Get the user info.
    const token = cookies.load("token", req);
    const { gameId } = query;

    const options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.get(`${API_GAME_ENDPOINT}/${gameId}?appId=${API_APP_ID}&playerInfo=1`)
      .then((resp) => {
        const { data: game } = resp.data;
        return { game }
      }).catch(e => {
        console.log("error", e);
        return {}
      });
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
              <CardImg top width="100%" src={lolBadge} alt="League of Legends" />
              <CardBody>
                <CardTitle>{ decorator.formatMatchName(this.props.game.name) }</CardTitle>
                <CardSubtitle>{ decorator.formatGameTitle(this.props.game.title) }</CardSubtitle>
                <CardText>
                  <div>{ decorator.formatMatchType(this.props.game.matchType) }</div>
                  <div>Entry Fee: { decorator.formatMatchEntryFee(this.props.game.entryFee) }</div>
                  <div>Max Pot: { decorator.formatPot(this.props.game.entryFee, this.props.game.maxParticipants)  } (minus transaction fee)</div>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <h3>Players</h3>
                <Table striped>
                  <thead>
                  <tr>
                    <th>Player</th>
                    <th>GG Champ Win Percentage</th>
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