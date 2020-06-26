import React from 'react'
import styled from '@emotion/styled'
import { User } from '../generated/graphql'

interface MessageProps {
  image: string
  username: string
  message: string
}

const MessageContainer = styled.div`
  padding: calc(0.3vw + 0.4rem) 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Detail = styled.div`
  margin: 0 0.6rem;
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: ${({ theme }) => theme.borderRadius.round};
`

export const Message: React.FC<MessageProps> = ({
  image,
  username,
  message,
}) => {
  return (
    <MessageContainer>
      <Img src={image} />
      <Detail>
        <h1>{username}</h1>
        <p>{message}</p>
      </Detail>
    </MessageContainer>
  )
}
