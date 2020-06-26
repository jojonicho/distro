import App from 'next/app'
import withGA from 'next-ga'
import NProgress from 'nprogress'
import { ApolloProvider } from '@apollo/react-hooks'
import Router from 'next/router'
import withApolloClient from '../lib/with-apollo-client'
import { GA_ID } from '../constants'
import React, { useState, useEffect } from 'react'
import { ThemeProvider, css, Global } from '@emotion/react'
import { setAccessToken } from '../lib/accessToken'
import { Navbar } from '../components/Navbar'
import theme from '../lib/theme'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps, apolloClient }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
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
            }
            a:hover {
              text-decoration: none;
              color: ${theme.colors.secondary.base};
            }
            h1 {
              font-family: ${theme.fontFamily.heading};
            }
            input {
              border: none;
            }
            button:hover {
              cursor: pointer;
            }
          `}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Navbar />
            <Component {...pageProps} />
          </>
        )}
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withApolloClient(MyApp)
