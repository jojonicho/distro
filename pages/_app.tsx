import App from 'next/app';
import withGA from 'next-ga';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/react-hooks';
import Router from 'next/router';
import * as Sentry from '@sentry/node';
import withApolloClient from '../lib/with-apollo-client';
import { GA_ID } from '../constants';
import initSentry from '../lib/sentry';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, css, Global } from '@emotion/react';
// import { Routes } from "./Routes";
// import { Route } from "react-router-dom";
import styled from 'styled-components';
import { setAccessToken } from './accessToken';

interface AppProps {}

const Background = styled.div`
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1000;
`;
export const Container: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      // console.log(x);
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  const Container = loading ? <div>Loading...</div> : <div>loaded</div>;
  return Container;
};
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    initSentry();

    let pageProps = {
      query: null,
      userContext: null,
    };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  componentWillMount() {}

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }
  componentDidMount() {
    initSentry();
    console.log(
      '%cGet the full codebase here: https://github.com/tomanagle/codenames',
      'color: #e91e63; font-size: 16px'
    );

    console.log(
      '%cIf you like the game, please support the developer by buying me a coffee: https://www.buymeacoffee.com/tomn',
      'color: #fff;background-color: #24b5b5; font-size: 16px'
    );
  }
  render() {
    // @ts-ignore
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Global
          styles={css`
            *,
            *:before,
            *:after {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            html {
              text-rendering: optimizeLegibility;
              overflow-x: hidden;
              -ms-overflow-style: scrollbar;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            body {
              width: 100vw;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              display: flex;
              flex-direction: column;
              background-image: linear-gradient(
                to right top,
                #d16ba5,
                #c777b9,
                #ba83ca,
                #aa8fd8,
                #9a9ae1,
                #8aa7ec,
                #79b3f4,
                #69bff8,
                #52cffe,
                #41dfff,
                #46eefa,
                #5ffbf1
              );
            }
            a {
              transition: color 0.5s;
              text-decoration: none;
            }
            a:hover {
              text-decoration: none;
            }
            h1 {
              font-family: 'Helvetica';
            }
          `}
        />
        <Container />
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withGA(GA_ID, Router)(withApolloClient(MyApp));
