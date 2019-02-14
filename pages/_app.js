import React from 'react';
import App, { Container } from 'next/app';

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
          <div>Header here cause fuck it</div>
            <Component {...pageProps} />
          <div>Footer cause why not</div>
      </Container>
    )
  }

}