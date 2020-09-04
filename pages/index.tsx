import React from 'react'
import styled from '@emotion/styled'
import {
  useMessageSubscription,
  useSendMessageMutation,
  useMessagesQuery,
  useChannelsQuery,
  useMeQuery,
  MessageSubscription as MessageSubscriptionType,
  MessagesQuery,
  MessagesDocument,
} from '../generated/graphql'
import { useForm } from 'react-hook-form'
import { Message } from '../components/MessageList/Message'
import ChannelList from '../components/ChannelList'
import Login from './login'
import { Navbar } from '../components/Navbar/Navbar'
import { BarLoader } from 'react-spinners'
import { withApollo } from '../utils/withApollo'

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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.white.base};
  background: ${({ theme }) => theme.gradient.rightToLeft};
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

const Index = () => {
  const { data: user, loading: userLoading } = useMeQuery()
  const {
    data: message,
    loading: messageLoading,
    fetchMore,
    variables,
  } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
    // notifyOnNetworkStatusChange: true,
    variables: {
      limit: 20,
      channelId: null,
    },
  })
  const { data: chat } = useMessageSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      // message.messages.messages.unshift(subscriptionData.data.newMessage)
      client.writeQuery({
        query: MessagesDocument,
        data: {
          messages: [...message.messages.messages, subscriptionData],
        },
      })
    },
  })
  const { register, handleSubmit, reset, errors } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const [msg] = useSendMessageMutation({})
  const onSubmit = async ({ content }) => {
    await msg({
      variables: {
        content,
        channelId: -1,
      },
    })
    reset()
  }
  const { data: channels, loading: channelsLoading } = useChannelsQuery()

  return (
    <>
      {userLoading ? (
        <BarLoader />
      ) : user && user.me ? (
        <IndexContainer>
          <Navbar data={user} loading={userLoading} />
          <ChannelList channels={channels} loading={channelsLoading} />
          <ChatContainer>
            <Chat>
              {messageLoading ? (
                <BarLoader />
              ) : (
                <Chat>
                  {chat &&
                  chat.newMessage &&
                  (message.messages.messages.length == 0 ||
                    chat.newMessage.id !== message.messages.messages[0].id) ? (
                    <Message
                      id={chat.newMessage.id}
                      image={chat.newMessage.user.image}
                      username={chat.newMessage.user.username}
                      message={chat.newMessage.content}
                      user={user.me}
                    />
                  ) : null}
                  {message &&
                    message.messages &&
                    message.messages &&
                    message.messages.messages.map((msg) => (
                      <Message
                        key={msg.id}
                        id={msg.id}
                        image={msg.user.image}
                        username={msg.user.username}
                        message={msg.content}
                        user={user.me}
                      />
                    ))}
                  {message.messages.hasMore && (
                    <button
                      onClick={() => {
                        fetchMore({
                          variables: {
                            limit: variables?.limit,
                            cursor:
                              message.messages.messages[
                                message.messages.messages.length - 1
                              ].date,
                          },
                          updateQuery: (
                            prev,
                            { fetchMoreResult }
                          ): MessagesQuery => {
                            if (!fetchMoreResult) {
                              return prev as MessagesQuery
                            }
                            return {
                              __typename: 'Query',
                              messages: {
                                __typename: 'PaginatedMessages',
                                hasMore: (fetchMoreResult as MessagesQuery)
                                  .messages.hasMore,
                                messages: [
                                  ...(prev as MessagesQuery).messages.messages,
                                  ...(fetchMoreResult as MessagesQuery).messages
                                    .messages,
                                ],
                              },
                            }
                          },
                        })
                      }}
                    >
                      load more
                    </button>
                  )}
                </Chat>
              )}
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
    </>
  )
}
export default withApollo({ ssr: true })(Index)
