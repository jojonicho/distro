import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDeleteMessageMutation, User } from '../../generated/graphql'

interface MessageProps {
  id: number
  image: string
  username: string
  message: string
  user: User
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.colors.black.light};
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  p {
    color: ${({ theme }) => theme.colors.white.light};
    font-size: calc(0.8rem + 0.1vw);
  }
  h1 {
    font-size: calc(0.8rem + 0.1vw);
  }
`

const MessageContainer = styled.div`
  padding: calc(0.15vw + 0.3rem);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-star;
  &:hover {
    background: ${({ theme }) => theme.colors.black.light};
    img {
      border-radius: ${({ theme }) => theme.borderRadius.default};
    }
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transitions.boom.transition};
`
const Detail = styled.div`
  margin: 0 0.6rem;
  backdrop-filter: blur(30px);
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: ${({ theme }) => theme.borderRadius.round};
`

const SettingsContainer = styled.div`
  margin: 1rem 0;
  padding: 0 0.2rem;
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
  // padding: calc(0.01vw + 0.1rem);
  padding: 0;
  border: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white.grey};
  h1 {
    margin-top: -10px;
    padding: 0;
  }
`

export const Message: React.FC<MessageProps> = ({
  id,
  image,
  username,
  message,
  user,
}) => {
  const [open, setOpen] = useState(false)
  const [deleteMessage] = useDeleteMessageMutation()
  const onClick = () => {
    deleteMessage({
      variables: {
        id,
      },
    })
    setOpen(!open)
  }
  return (
    <MessageContainer>
      <Content>
        <Img src={image} />
        <Detail>
          <h1>{username}</h1>
          <p>{message}</p>
        </Detail>
      </Content>
      {user.username === username && (
        <SettingsContainer>
          <Button onClick={onClick}>
            <h1>...</h1>
          </Button>
          {open ? <>unsent</> : null}
        </SettingsContainer>
      )}
    </MessageContainer>
  )
}
