import App from 'next/app'
import withGA from 'next-ga'
import NProgress from 'nprogress'
import { ApolloProvider } from '@apollo/react-hooks'
import Router from 'next/router'
import withApolloClient from '../lib/with-apollo-client'
// import { GA_ID } from '../constants'
import React, { useState, useEffect } from 'react'
import { ThemeProvider, css, Global } from '@emotion/react'
import { setAccessToken } from '../lib/accessToken'
import { Navbar } from '../components/Navbar'
import { HashLoader as Loader } from 'react-spinners'
import theme from '../lib/theme'
import styled from '@emotion/styled'
import { useMeQuery } from '../generated/graphql'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`
const production = process.env.NODE_ENV === 'production'
const URL = production
  ? 'https://distrobackend.herokuapp.com'
  : 'http://localhost:4000'

const MyApp = ({ Component, pageProps, apolloClient }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json()
      setAccessToken(accessToken)
      setLoading(false)
    })
  }, [])
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
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
              overflow-y: hidden;
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
              font-family: ${theme.fontFamily.body};
            }
            a {
              color: ${theme.colors.primary.dark};
              transition: color 0.5s;
              text-decoration: none;
              cursor: pointer;
            }
            a:hover {
              text-decoration: none;
              color: ${theme.colors.secondary.base};
              cursor: pointer;
            }
            h1 {
              font-family: ${theme.fontFamily.heading};
            }
            input {
              border: none;
            }
            button {
              cursor: pointer;
            }
            textarea:focus,
            button:focus,
            input:focus {
              outline: none;
            }
          `}
        />
        {loading ? (
          <Container>
            <Loader />
          </Container>
        ) : (
          <Container>
            <Component {...pageProps} />
          </Container>
        )}
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withApolloClient(MyApp)
