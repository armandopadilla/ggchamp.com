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
import axios from 'axios';
import cookieManager from 'isomorphic-cookie';
import { decorator } from '../../utils';

const stylez = {
  h3: {
    textAlign: "center"
  }
}


export default class Home extends Component {

  static getInitialProps ({ req }) {

    const token = cookieManager.load("token", req);
    var options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.get(`wallet/my-wallet`)
      .then((resp) => {
        const { data } = resp.data;

        const { wallet, transactions } = data;
        return {
          walletBalance: decorator.formatMoney(wallet.balance),
          transactions: transactions
        };
      }).catch(e => {
      console.log("error", e);
      return {
        walletBalance: decorator.formatMoney(0),
        transactions: []
      };
    });

  }

  getTableData = () => {
    if (!this.props.transactions.length) {
      return (
        <Table>
          <tbody>
          <tr><td>There are no wallet transactions.</td></tr>
          </tbody>
        </Table>
      )
    }
    else {
      const data = this.props.transactions.map((trx) => {
        console.log(trx);
        return (<tr key={trx._id}>
          <td>{ trx.type } ({ trx.description })</td>
          <td>${ trx.amount }</td>
          <td>{ new Date(trx.createdDate).toLocaleString() }</td>
        </tr>);
      })

      return (<Table striped>
        <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        { data }
        </tbody>
      </Table>)
    }
  };

    render () {
    return (
      <Col md={10} style={{ padding: "15px", margin: "auto" }}>
        <Row>
          <Col md={3}>
            <Card>
              <CardBody>
                <CardTitle><h3 style={{ textAlign: "center" }}>Wallet Ballance</h3></CardTitle>
                <CardText style={{ textAlign: "center" }}>{this.props.walletBalance}</CardText>
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
                <h2>Transactions</h2>
                { this.getTableData() }
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }

}