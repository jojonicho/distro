import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import App from '../../components/App'
import {
  useMessageSubscription,
  useSendMessageMutation,
  useMessagesQuery,
  useChannelsQuery,
  useCreateChannelMutation,
  useChannelMessagesQuery,
  useSendChannelMessageMutation,
  useChannelUsersQuery,
  useMeQuery,
} from '../../generated/graphql'
import { useForm } from 'react-hook-form'
import { Message } from '../../components/MessageList/Message'
import { Channel } from '../../components/ChannelList/Channel'
import ChannelList from '../../components/ChannelList'
import { BarLoader } from 'react-spinners'
import { Navbar } from '../../components/Navbar'
import Login from '../login'

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
  width: 99vw;
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
const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`
type FormData = {
  content: string
}

const Home = () => {
  const { data: user, loading: userLoading } = useMeQuery()
  const router = useRouter()
  const { id } = router.query
  const channelId = Number.parseInt(id.toString())
  const {
    data: message,
    loading: messageLoading,
    error: messagesError,
    subscribeToMore,
  } = useChannelMessagesQuery({ variables: { channelId } })
  const {
    data: chat,
    loading: chatLoading,
    error: chatError,
  } = useMessageSubscription()
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [msg] = useSendChannelMessageMutation()
  const onSubmit = handleSubmit(async ({ content }) => {
    await msg({
      variables: {
        content,
        channelId,
      },
    })
    reset()
  })
  const { data: channels, loading: channelsLoading } = useChannelsQuery()
  const { data: users, loading: usersLoading } = useChannelUsersQuery({
    variables: {
      channelId,
    },
  })
  useEffect(() => {
    if (!messageLoading && chat) {
      message.channelMessages.push(chat.newMessage)
    }
  }, [subscribeToMore, chat, message])

  return (
    <App title="Distro" description="Distro, the productivity app">
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
                ) : message ? (
                  message.channelMessages.map((msg) => (
                    <Message
                      key={msg.id}
                      id={msg.id}
                      image={msg.user.image}
                      username={msg.user.username}
                      message={msg.content}
                    />
                  ))
                ) : null}
                {chatLoading ? null : (
                  <Message
                    id={chat.newMessage.id}
                    image={chat.newMessage.user.image}
                    username={chat.newMessage.user.username}
                    message={chat.newMessage.content}
                  />
                )}
              </div>
            </Chat>
            <InputContainer>
              <form onSubmit={onSubmit}>
                <Input name="content" placeholder="Message" ref={register} />
              </form>
            </InputContainer>
          </ChatContainer>
          <ChannelContainer>
            {usersLoading ? (
              <BarLoader />
            ) : users ? (
              users.channelUsers.map((user) => (
                <Channel id={user.id} image={user.image} name={user.username} />
              ))
            ) : null}
          </ChannelContainer>
        </IndexContainer>
      ) : (
        <Login />
      )}
    </App>
  )
}

export default Home
