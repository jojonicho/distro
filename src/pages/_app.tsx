import { ApolloProvider } from '@apollo/react-hooks'
import { withApollo } from '../utils/withApollo'

import React, { useState, useEffect } from 'react'
import { ThemeProvider, css, Global } from '@emotion/react'
import {
  ThemeProvider as ChakraTheme,
  CSSReset,
  ColorModeProvider,
} from '@chakra-ui/core'
import { setAccessToken } from '../utils/accessToken'
import { HashLoader as Loader } from 'react-spinners'
import theme from '../utils/theme'
import styled from '@emotion/styled'
import chakraTheme from '../utils/chakraTheme'
import Head from 'next/head'

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

const MyApp = ({ Component, pageProps }) => {
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
            overflow-x: hidden;
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
      <ChakraTheme theme={chakraTheme}>
        <ColorModeProvider>
          <CSSReset />
          <Head>
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/icons/apple-icon-57x57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="60x60"
              href="/icons/apple-icon-60x60.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/icons/apple-icon-72x72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/icons/apple-icon-76x76.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/icons/apple-icon-114x114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/icons/apple-icon-120x120.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/icons/apple-icon-144x144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/icons/apple-icon-152x152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/icons/apple-icon-180x180.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href="/icons/android-icon-192x192.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/icons/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/icons/favicon-96x96.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/icons/favicon-16x16.png"
            />
            <link rel="manifest" href="manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
              name="msapplication-TileImage"
              content="/ms-icon-144x144.png"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="theme-color" content="#ffffff" />
            <title>Distro!</title>
          </Head>
          {loading ? (
            <Container>
              <Loader />
            </Container>
          ) : (
            <Container>
              <Component {...pageProps} />
            </Container>
          )}
        </ColorModeProvider>
      </ChakraTheme>
    </ThemeProvider>
  )
}

// export default withApolloClient(MyApp)
export default withApollo({ ssr: false })(MyApp)
