import ReactGA from 'react-ga';
import React from 'react';
import App, { Container } from 'next/app';
import Header from './header';
import Footer from './footer';

import { auth } from '../utils';

import 'bootstrap/dist/css/bootstrap.min.css';

function initializeReactGA() {
  ReactGA.initialize('UA-136536235-1');
  ReactGA.pageview('/home');
};


export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx, req }) {
    initializeReactGA();

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }


    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Header />
          <Component {...pageProps} />
        <Footer />
      </Container>
    )
  }

}