import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head'
import cookies from 'isomorphic-cookie';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './header';
import Footer from './footer';


export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // isLoggedIn
    const token = cookies.load("token", ctx.req);
    if (token) {
      pageProps.isLoggedIn = true
    } else {
      pageProps.isLoggedIn = false;
    }

    // Check if the user should be redirected to the login
    const nonAuthPages = ['/', '/login', '/signup', '/terms-of-use'];

    if (!token && nonAuthPages.indexOf(router.route) == -1) {
      ctx.res.writeHead(302, {Location: `/login`})
      ctx.res.end()
    }

    // Get the earnings.
    const options = {
      baseURL: `http://localhost:3000/v1/`,
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const axiosInstance = axios.create(options);
    return axiosInstance.get(`wallet/my-earnings`)
      .then((resp) => {
        const { data } = resp.data;
        const { myEarnings } = data;
        pageProps.myEarnings = myEarnings;

        return { pageProps }
      }).catch(e => {
        console.log("error", e);
        return { pageProps }
      });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>ggchamp.com</title>
        </Head>
        <Header {...pageProps} />
          <Component {...pageProps} />
        <Footer />
      </Container>
    )
  }

}