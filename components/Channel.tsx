import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDeleteMessageMutation } from '../generated/graphql'

interface ChannelProps {
  id: number
  image: string
  name: string
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black.light};
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  p {
    color: ${({ theme }) => theme.colors.white.grey};
  }
`

const MessageContainer = styled.div`
  padding: calc(0.3vw + 0.4rem) 1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black.light};
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transitions.boom.transition};
`
const Detail = styled.div`
  margin: 0 0.6rem;
  font-size: 0.5rem;
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: ${({ theme }) => theme.borderRadius.round};
`

const SettingsContainer = styled.div`
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black.light};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.2);
  }
  transition: filter 150ms ease-in-out;
`

const Button = styled.button`
  background: transparent;
  padding: calc(0.04vw + 0.1rem);
  border: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white.grey};
  h1 {
    margin-top: -10px;
  }
`

export const Channel: React.FC<ChannelProps> = ({ id, image, name }) => {
  // const onClick = () => {
  //   deleteMessage({
  //     variables: {
  //       id,
  //     },
  //   })
  //   setOpen(!open)
  // }
  return (
    <MessageContainer>
      <Content>
        <Img src={image} />
        <Detail>
          <h1>{name}</h1>
        </Detail>
      </Content>
    </MessageContainer>
  )
}
