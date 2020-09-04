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
    // <ApolloProvider client={apolloClient}>
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
      <ChakraTheme>
        <ColorModeProvider>
          <CSSReset />
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
    // </ApolloProvider>
  )
}

// export default withApolloClient(MyApp)
export default withApollo({ ssr: false })(MyApp)
