import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import App from '../components/App'
import Head from 'next/head'
import {
  useChatSubscription,
  useSendMessageMutation,
  useMessagesQuery,
  ChatDocument,
  ChatSubscriptionVariables,
  useChannelsQuery,
  useCreateChannelMutation,
} from '../generated/graphql'
import { useForm } from 'react-hook-form'
import { useSubscription } from '@apollo/react-hooks'
import { Message } from '../components/Message'
import { Channel } from '../components/Channel'

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
  height: 90vh;
  margin: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.white.base};
  background: ${({ theme }) => theme.gradient.rightToLeft};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`
const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const MemberContainer = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  min-width: 300px;
  width: 70vw;
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
const AddChannelContainer = styled.div`
  padding: calc(0.3vw + 0.4rem) 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transitions.boom.transition};
  input {
    width: 60%;
  }
`
const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background: ${({ theme }) => theme.gradient.rightToLeft};
  color: ${({ theme }) => theme.colors.white.base};
  transition: ${({ theme }) => theme.transitions.boom.transition};
  font-size: calc(0.5vw + 1rem);
  &:hover {
    background: ${({ theme }) => theme.colors.black.light};
  }
  border: none;
  margin-right: 0.4vw;
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
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
  const [msg] = useSendMessageMutation()
  const [chn] = useCreateChannelMutation()
  const onSubmit = handleSubmit(async ({ content }) => {
    await msg({
      variables: {
        content,
      },
    })
    reset()
  })
  const { data: channels, loading: channelsLoading } = useChannelsQuery()
  const [channelName, setChannelName] = useState('')
  const onClick = async () => {
    await chn({
      variables: {
        name: channelName,
      },
    })
  }
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
      <IndexContainer>
        <ChannelContainer>
          <AddChannelContainer>
            <Button onClick={onClick}>+</Button>
            <Input
              placeholder="add channel"
              onChange={(e) => setChannelName(e.target.value)}
            />
          </AddChannelContainer>
          {channelsLoading ? (
            <>loading..</>
          ) : (
            channels.channels.map((chn) => (
              <Channel id={chn.id} image={chn.image} name={chn.name} />
            ))
          )}
        </ChannelContainer>
        <ChatContainer>
          <Chat>
            <div>
              {messageLoading ? (
                <>loading..</>
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
        <MemberContainer></MemberContainer>
      </IndexContainer>
    </App>
  )
}

export default Home
