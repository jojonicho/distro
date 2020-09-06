import React from 'react'
import { useMeQuery } from '../generated/graphql'
import styled from '@emotion/styled'
import theme from '../utils/theme'

interface MeProps {}

const Img = styled.img`
  width: calc(1vw + 10rem);
  height: calc(1vw + 10rem);
  border-radius: ${theme.borderRadius.round};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Me: React.FC<MeProps> = () => {
  const { data, error, loading } = useMeQuery()
  const Detail = loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : data ? (
    <Container>
      <Img src={data.me.image} />
      <h1>{data.me.username}</h1>
    </Container>
  ) : (
    <div>No data</div>
  )
  return Detail
}

export default Me
