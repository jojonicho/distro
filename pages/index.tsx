import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import App from '../components/App'
import Head from 'next/head'
import {
  useMessageSubscription,
  useSendMessageMutation,
  useMessagesQuery,
  MessageDocument,
  useChannelsQuery,
  useCreateChannelMutation,
  useMeQuery,
  MessageSubscription as MessageSubscriptionType,
  // MessagesDocument,
} from '../generated/graphql'
import { useForm } from 'react-hook-form'
import { Message } from '../components/MessageList/Message'
import ChannelList from '../components/ChannelList'
import Login from './login'
import { Navbar } from '../components/Navbar'
import { BarLoader } from 'react-spinners'
// import { Navbar } from '../components/Navbar'

const InputContainer = styled.div`
  padding: calc(0.3vw + 0.3rem);
`

const Input = styled.input`
  padding: calc(0.3vw + 0.3rem);
  width: 100%;
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
const IndexContainer = styled.div`
  height: 100vh;
  width: calc(99vw + 0.5rem);
  // margin: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.white.base};
  background: ${({ theme }) => theme.gradient.rightToLeft};
  // border-radius: ${({ theme }) => theme.borderRadius.default};
`
const MemberContainer = styled.div`
  display: flex;
`
const ChatContainer = styled.div`
  min-width: 300px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  const { data: user, loading: userLoading } = useMeQuery()
  const {
    data: message,
    loading: messageLoading,
    error: messagesError,
    subscribeToMore,
  } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
  })
  const {
    data: chat,
    loading: chatLoading,
    error: chatError,
  } = useMessageSubscription()
  const { register, handleSubmit, reset, errors } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const [msg] = useSendMessageMutation()
  const onSubmit = async ({ content }) => {
    reset()
    await msg({
      variables: {
        content,
      },
    })
  }
  const { data: channels, loading: channelsLoading } = useChannelsQuery()

  // useEffect(() => {
  //   if (!messageLoading && chat) {
  //     message.messages.push(chat.newMessage)
  //   }
  //   // subscribeToMore<ChatSubscriptionVariables>({
  //   //   document: ChatDocument,
  //   //   updateQuery: (prev, { subscriptionData }) => {
  //   //     if (!subscriptionData.data) return prev
  //   //     const newMessage = subscriptionData.data.messages
  //   //     return {
  //   //       messages: [newMessage, ...prev.messages],
  //   //     }
  //   //   },
  //   // })
  //   // }
  // }, [subscribeToMore, chat, message])
  useEffect(() => {
    if (!messageLoading && chat) {
      message.messages.push(chat.newMessage)
    }
    if (!message && user && user.me.id && chat) {
      subscribeToMore<MessageSubscriptionType>({
        document: MessageDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) {
            return prev
          }
          const newMessage = subscriptionData.data.newMessage
          if (user.me.id === newMessage.user.id) {
            return prev
          }
          return {
            messages: [...prev.messages, newMessage],
          }
        },
      })
    }
  }, [subscribeToMore, chat])

  return (
    <App title="Distro" description="Recharge yourself!">
      {userLoading ? (
        <BarLoader />
      ) : user && user.me ? (
        <IndexContainer>
          <Navbar data={user} loading={userLoading} />
          <ChannelList channels={channels} loading={channelsLoading} />
          <ChatContainer>
            <Chat>
              <div>
                {messageLoading ? (
                  <BarLoader />
                ) : (
                  message.messages.map((msg) => (
                    <Message
                      key={msg.id}
                      id={msg.id}
                      image={msg.user.image}
                      username={msg.user.username}
                      message={msg.content}
                    />
                  ))
                )}
                {chat &&
                chat.newMessage.id !==
                  message.messages[message.messages.length - 1].id ? (
                  <Message
                    id={chat.newMessage.id}
                    image={chat.newMessage.user.image}
                    username={chat.newMessage.user.username}
                    message={chat.newMessage.content}
                  />
                ) : null}
              </div>
            </Chat>
            <InputContainer>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Input
                  autoComplete="off"
                  type="search"
                  name="content"
                  placeholder={
                    errors.content
                      ? errors.content.message
                      : 'Message global chat'
                  }
                  ref={register({
                    required: 'Required',
                  })}
                />
              </form>
            </InputContainer>
          </ChatContainer>
          <MemberContainer></MemberContainer>
        </IndexContainer>
      ) : (
        <Login />
      )}
    </App>
  )
}

export default Home
