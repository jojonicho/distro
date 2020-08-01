import React from 'react'
import { useLogoutMutation, useMeQuery, MeQuery } from '../generated/graphql'
import styled from '@emotion/styled'
import { setAccessToken, getAccessToken } from '../lib/accessToken'
import Link from 'next/link'
import theme from '../lib/theme'
import { useRouter } from 'next/router'
import { BarLoader } from 'react-spinners'

const Nav = styled.nav`
  // padding: 1vw 2vw 0 2vw;
  // margin-right: 0.5vw;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  position: absolute;
  right: 0;
  // background: ${({ theme }) => theme.colors.snazzy.mekariPurple};
  // border-radius: 5px;
  backdrop-filter: blur(30px);
  // border: 1px solid white;
  // @media (-webkit-min-device-pixel-ratio: 2){
  //   border-width: 0.5px;
  // }
  // backdrop-filter: brightness(60%);
  // backdrop-filter: contrast(40%);
  // backdrop-filter: drop-shadow(4px 4px 10px blue);
  // backdrop-filter: grayscale(30%);
  // backdrop-filter: hue-rotate(120deg);
  // backdrop-filter: invert(70%);
  // backdrop-filter: opacity(20%);
`
// const Navlink = styled.div`
//   a {
//     margin-right: 1rem;
//   }
// `
const Logout = styled.div`
  display: flex;
  button {
    margin-left: 0.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white.base};
    background: ${({ theme }) => theme.colors.secondary.base};
  }
`

const Button = styled.button`
  background: ${theme.colors.black.blue};
  transition: ${(props) => props.theme.transitions.boom.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  padding: 0 calc(5px + 0.2vw);
  &:focus {
    outline: 0;
  }
  &:hover {
    transform: scale(1.03);
  }
  border: none;
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
  &:hover {
    filter: brightness(0.8);
  }
`
interface NavbarProps {
  data: MeQuery
  loading: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ data, loading }) => {
  const [logout, { client }] = useLogoutMutation()
  const router = useRouter()
  return (
    <Nav>
      {/* <Navlink>
        <Link as="/" href="/">
          <a>Home</a>
        </Link>
        {data && !data.me ? (
          <>
            <Link as="/register" href="/register">
              <a>Register</a>
            </Link>
            <Link as="/login" href="/login">
              <a>Login</a>
            </Link>
          </>
        ) : null}
      </Navlink> */}

      {loading ? (
        <BarLoader />
      ) : !loading && data && data.me ? (
        <Logout>
          <Message>
            <Link href="/me">
              <a>
                <Img src={data.me.image} />
              </a>
            </Link>
            <Detail>
              <p>{data.me.username}</p>
            </Detail>
          </Message>
          <Button
            onClick={async () => {
              await logout()
              setAccessToken('')
              await client!.resetStore()
              router.push('/')
            }}
          >
            logout
          </Button>
        </Logout>
      ) : null}
    </Nav>
  )
}
