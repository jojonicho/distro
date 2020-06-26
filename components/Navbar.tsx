import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import styled from '@emotion/styled'
import { setAccessToken } from '../lib/accessToken'
import Link from 'next/link'
import theme from '../lib/theme'

const Nav = styled.nav`
  padding: 1vw 2vw 0 2vw;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  a {
    margin-right: 2rem;
  }
`
const Logout = styled.div`
  display: flex;
`
const Button = styled.button`
  margin-left: 0.1vw;
  background: ${theme.colors.black.blue};
  color: ${theme.colors.white.base};
  padding: 0 0.2vw;
  border: none;
  border-radius: ${theme.borderRadius.default};
  font-weight: bold;
`

const Message = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: calc(0.4vw + 0.5rem);
`
const Detail = styled.div`
  margin: 0 0.4rem;
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: ${theme.borderRadius.round};
`

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { data, loading } = useMeQuery()
  const [logout, { client }] = useLogoutMutation()

  const user = loading ? null : data && data.me ? (
    <Message>
      <Img src={data.me.image} />
      <Detail>
        <p>{data.me.username}</p>
      </Detail>
    </Message>
  ) : null

  return (
    <Nav>
      <div>
        <Link as="/" href="/">
          <a>Home</a>
        </Link>
        <Link as="/register" href="/register">
          <a>Register</a>
        </Link>
        <Link as="/login" href="/login">
          <a>Login</a>
        </Link>
      </div>
      <Logout>
        {user}
        {!loading && data && data.me ? (
          <Button
            onClick={async () => {
              await logout()
              setAccessToken('')
              await client!.resetStore()
            }}
          >
            logout
          </Button>
        ) : null}
      </Logout>
    </Nav>
  )
}
