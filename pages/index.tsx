/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
// import { Button, Radio } from 'antd';
// import { useRouter } from 'next/router';
import styled from '@emotion/styled'
import App from '../components/App'
// import { useStartGameMutation, Language } from '../generated';
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
import theme from '../lib/theme'
// import Error from '../components/Error';

const Input = styled.input`
  padding: calc(0.3vw + 0.3rem);
  width: 100%;
  margin-top: 0.4rem;
  border-radius: ${theme.borderRadius.default};
  background: ${theme.colors.black.light};
  color: ${theme.colors.white.base};
  &:focus {
    border: none;
  }
`
const Message = styled.div`
  padding: calc(0.3vw + 0.4rem) 0;
  display: flex;
  flex-direction: row;
`
const Detail = styled.div`
  margin: 0 1rem;
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: ${theme.borderRadius.round};
`

const Container = styled.div`
  padding: 1vw;
  margin: 1vw 3vw;
  height: 90vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  h1 {
    font-size: calc(0.8rem + 0.4vw);
  }
  p {
    maring: auto;
    font-size: calc(0.75rem + 0.4vw);
  }
  color: ${theme.colors.white.base};
  background: ${theme.gradient.rightToLeft};
  // background: ${theme.colors.white.light}
  border-radius: ${theme.borderRadius.default};
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
    <App
      title="Codenames"
      description="Play codenames online with friends and family. Choose between family-friendly words or adult-only words."
    >
      <Container>
        <div className="inner">
          {messageLoading ? (
            <>loading..</>
          ) : (
            message.messages.map((msg) => (
              <Message>
                <Img src={msg.user.image} />
                <Detail>
                  <h1>{msg.user.username}</h1>
                  <p>{msg.content}</p>
                </Detail>
              </Message>
            ))
          )}
          {chatLoading ? null : (
            <Message>
              <Img src={chat.newMessage.user.image} />
              <Detail>
                <h1>{chat.newMessage.user.username}</h1>
                <p>{chat.newMessage.content}</p>
              </Detail>
            </Message>
          )}
          <form onSubmit={onSubmit}>
            <Input name="content" ref={register} />
          </form>
        </div>
      </Container>
    </App>
  )
}

export default Home
