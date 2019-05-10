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

const stylez = {
  h3: {
    textAlign: "center"
  }
}

import {
  API_USER_PROFILE_ENDPOINT,
  API_APP_ID,
}  from '../../constants'

import { restReq } from '../../utils';


export default class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      userInfo: props.userInfo || {}
    }
  }

  static async getInitialProps({ req }) {

    return restReq().get(`${API_USER_PROFILE_ENDPOINT}?appId=${API_APP_ID}`)
      .then((resp) => {
        const { data: userInfo } = resp.data;
        return {
          userInfo,
        }
      }).catch(e => {
        //console.log("error", e);
      });
  }

  getGamesRow = () => {
    return this.props.userInfo.games.map((game) => {
      return (<tr>
        <td>League of Legends</td>
        <td>{game.matchType}</td>
        <td>Won</td>
      </tr>)
    });
  }

  render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>{ this.props.userInfo.username}</CardTitle>
                <CardSubtitle>League of Legends</CardSubtitle>
                <CardText>Rank XXXX</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            <Row style={{ margin: "auto", padding: "5px", paddingBottom: "35px" }}>
              <Col md={3}>
                <Card body>
                  <CardTitle style={{ textAlign: "center" }}>GGChamp Games Played</CardTitle>
                  <CardText><h3 style={{ textAlign: "center" }}>{ this.props.userInfo.stats.totalGamesPlayed }</h3></CardText>
                </Card>
              </Col>
              <Col md={3}>
                <Card body>
                  <CardTitle style={{ textAlign: "center" }}>GGChamp Games Won</CardTitle>
                  <CardText><h3 style={{ textAlign: "center" }}>{ this.props.userInfo.stats.totalGamesWon  }</h3></CardText>
                </Card>
              </Col>
              <Col md={3}>
                <Card body>
                  <CardTitle style={{ textAlign: "center" }}>GGChamp Win %</CardTitle>
                  <CardText><h3 style={{ textAlign: "center" }}>{ this.props.userInfo.stats.winPercent }%</h3></CardText>
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
                  <tbody>{ this.getGamesRow() }</tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}