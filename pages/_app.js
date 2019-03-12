import React from 'react';
import App, { Container } from 'next/app';
import Header from './header';
import Footer from './footer';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
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