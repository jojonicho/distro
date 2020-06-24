import React from 'react'
import { PageHeader, Layout as _Layout, Row, Col } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
import Coffee from '../components/Coffee'
const { Header: _Header, Footer: _Footer, Content: _Content } = _Layout

const Layout = styled(_Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Header = styled(_Header)`
  border-bottom: solid 1px #ccc;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  .site-page-header {
    background-color: #fff;
  }

  h1 {
    margin: 0;
  }
`

const Content = styled(_Content)`
  padding: 10px 10px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;

  @media screen and (max-width: 599px) {
    padding: 5px 5px;
  }
`

// const Footer = styled(_Footer)`
//   padding: 10px 24px !important;
//   background-color: rgba(256, 256, 256, 0.8);
//   position: relative;
//   z-index: 3;
// `

const App = ({
  children,
  title,
  description,
  showFooter = true,
  showNav = false,
}: {
  children: any
  title: string
  description: string
  showFooter?: boolean
  showNav?: boolean
}) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {showNav && (
        <Header>
          <PageHeader
            className="site-page-header"
            title={
              <Link href="/" as="/">
                <a title="Home">
                  <h1>{title}</h1>
                </a>
              </Link>
            }
          />
        </Header>
      )}

      <Content className="app__content">{children}</Content>

      {showFooter && (
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Link as="/" href="/">
              <a>Home</a>
            </Link>
            {' • '}
            <Link as="/policy/privacy" href="/policy/privacy">
              <a>Privacy policy</a>
            </Link>
            {' • '}
            <Link as="/policy/tos" href="/policy/tos">
              <a>Terms of service</a>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Coffee />
          </Col>
        </Row>
      )}
    </Layout>
  )
}

export default App
