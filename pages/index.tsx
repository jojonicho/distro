/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
// import { Button, Radio } from 'antd';
// import { useRouter } from 'next/router';
import styled from '@emotion/styled'
import App from '../components/App'
import Head from 'next/head'
import {
  useUsersQuery,
  useChatSubscription,
  useMessageMutation,
  useMessagesQuery,
  ChatDocument,
  ChatSubscriptionVariables,
} from '../generated/graphql'
import { useForm } from 'react-hook-form'
import { useSubscription } from '@apollo/react-hooks'
import { Message } from '../components/Message'
// import Error from '../components/Error';

const Input = styled.input`
  padding: calc(0.3vw + 0.3rem);
  width: 100%;
  margin-top: 0.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.black.light};
  color: ${({ theme }) => theme.colors.white.base};
  &:focus {
    border: none;
  }
  position: relative;
  bottom: 1px;
`
const Chat = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
`
const Container = styled.div`
  padding: 1vw;
  margin: 1vw 2vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: calc(0.9rem + 0.1vw);
  }
  p {
    maring: auto;
    font-size: calc(0.9rem + 0.1vw);
  }
  color: ${({ theme }) => theme.colors.white.base};
  background: ${({ theme }) => theme.gradient.rightToLeft};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`
type FormData = {
  content: string
}
const Home = () => {
  const {
    data: message,
    loading: messageLoading,
    error: messagesError,
    subscribeToMore,
  } = useMessagesQuery()
  const {
    data: chat,
    loading: chatLoading,
    error: chatError,
  } = useChatSubscription()
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [msg] = useMessageMutation()
  const onSubmit = handleSubmit(async ({ content }) => {
    await msg({
      variables: {
        content,
      },
    })
    reset()
  })
  useEffect(() => {
    if (!messageLoading && chat) {
      message.messages.push(chat.newMessage)
    }
    // subscribeToMore<ChatSubscriptionVariables>({
    //   document: ChatDocument,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     if (!subscriptionData.data) return prev
    //     const newMessage = subscriptionData.data.messages
    //     return {
    //       messages: [newMessage, ...prev.messages],
    //     }
    //   },
    // })
    // }
  }, [subscribeToMore, chat, message])

  return (
    <App title="Distro" description="Distro, the productivity app">
      <Container>
        <Chat>
          <div>
            {messageLoading ? (
              <>loading..</>
            ) : (
              message.messages.map((msg) => (
                <Message
                  image={msg.user.image}
                  username={msg.user.username}
                  message={msg.content}
                />
              ))
            )}
            {chatLoading ? null : (
              <Message
                image={chat.newMessage.user.image}
                username={chat.newMessage.user.username}
                message={chat.newMessage.content}
              />
            )}
          </div>
        </Chat>
        <form onSubmit={onSubmit}>
          <Input name="content" ref={register} />
        </form>
      </Container>
    </App>
  )
}

export default Home
