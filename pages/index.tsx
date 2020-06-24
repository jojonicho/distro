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
// import Error from '../components/Error';

const Wrapper = styled.div`
  padding: 1rem;
  z-index: 2;
  position: relative;
  .inner {
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: rgba(256, 256, 256, 0.8);
    border-radius: 4px;
  }
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
      <Head>
        <script
          type="text/javascript"
          src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e88192c0627598b"
        ></script>
      </Head>
      <Wrapper>
        <div className="inner">
          {messageLoading ? (
            <>loading..</>
          ) : (
            message.messages.map((msg) => (
              <div>
                <h2>{msg.user.username}</h2>
                <p>{msg.content}</p>
              </div>
            ))
          )}
          {chatLoading ? (
            <>send a message!</>
          ) : (
            <div>
              <h2>{chat.newMessage.user.username}</h2>
              <p>{chat.newMessage.content}</p>
            </div>
          )}
          <form onSubmit={onSubmit}>
            <input name="content" ref={register} />
          </form>
        </div>
      </Wrapper>
    </App>
  )
}

export default Home
