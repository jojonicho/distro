import React from 'react'
import { PageHeader, Layout as _Layout, Row, Col } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import styled from '@emotion/styled'
const { Header: _Header, Footer: _Footer, Content: _Content } = _Layout

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

const App = ({
  children,
  title,
  description,
  showFooter = false,
  showNav = false,
}: {
  children: any
  title: string
  description: string
  showFooter?: boolean
  showNav?: boolean
}) => {
  return (
    <>
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
      {children}
    </>
  )
}

export default App
