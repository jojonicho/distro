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
import { Stack, Input, Button } from '@chakra-ui/core'

const MemberContainer = styled.div`
  display: flex;
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

  return (
    <>
      {userLoading ? (
        <BarLoader />
      ) : user && user.me ? (
        <Stack isInline overflowY="scroll" height="100vh" width="100vw">
          <Navbar data={user} loading={userLoading} />
          <ChannelList />
          <Stack bg="gray.700" color="purple.50" w="100%" justify="flex-end">
            <Stack
              overflowY="scroll"
              flexDirection="column-reverse"
              justify="flex-start"
            >
              {messageLoading ? (
                <BarLoader />
              ) : (
                <Stack flexDirection="column-reverse">
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
                  {message && message.messages && message.messages.hasMore && (
                    <Button
                      bg="gray.600"
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
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Input
                autoComplete="off"
                bg="gray.600"
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
          </Stack>
          <MemberContainer></MemberContainer>
        </Stack>
      ) : (
        <Login />
      )}
    </>
  )
}
export default withApollo({ ssr: true })(Index)
