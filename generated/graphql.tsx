import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  users: Array<User>;
  messages: Array<Message>;
  channelMessages: Array<Message>;
  channels: Array<Channel>;
};


export type QueryChannelMessagesArgs = {
  channelId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  image: Scalars['String'];
  messages: Array<Message>;
  channels: Array<Channel>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  date: Scalars['DateTime'];
  content: Scalars['String'];
  user: User;
  channel: Channel;
};


export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
  name: Scalars['String'];
  users: Array<User>;
  image: Scalars['String'];
  messages: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  confirmEmail: Scalars['Boolean'];
  revokeRefreshTokenUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  sendChannelMessage: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationRevokeRefreshTokenUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSendMessageArgs = {
  input: MessageInput;
};


export type MutationSendChannelMessageArgs = {
  input: ChannelMessageInput;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type MessageInput = {
  content: Scalars['String'];
};

export type ChannelMessageInput = {
  content: Scalars['String'];
  channelId: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  newUser: User;
};

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = (
  { __typename?: 'Query' }
  & { channels: Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'image'>
  )> }
);

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChannel'>
);

export type ChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type ChannelMessagesQuery = (
  { __typename?: 'Query' }
  & { channelMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'date' | 'content'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'image'>
    ) }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'image'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'image'>
  )> }
);

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'date' | 'content'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'image'>
    ) }
  )> }
);

export type ChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'date' | 'content'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'image'>
    ) }
  ) }
);

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendMessage'>
);

export type SendChannelMessageMutationVariables = Exact<{
  content: Scalars['String'];
  channelId: Scalars['Int'];
}>;


export type SendChannelMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendChannelMessage'>
);

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'image'>
  )> }
);


export const ChannelsDocument = gql`
    query Channels {
  channels {
    id
    name
    image
  }
}
    `;

/**
 * __useChannelsQuery__
 *
 * To run a query within a React component, call `useChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
        return ApolloReactHooks.useQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
      }
export function useChannelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
        }
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
export type ChannelsQueryResult = ApolloReactCommon.QueryResult<ChannelsQuery, ChannelsQueryVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!) {
  createChannel(name: $name)
}
    `;
export type CreateChannelMutationFn = ApolloReactCommon.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = ApolloReactCommon.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const ChannelMessagesDocument = gql`
    query ChannelMessages($channelId: Int!) {
  channelMessages(channelId: $channelId) {
    id
    user {
      username
      image
    }
    date
    content
  }
}
    `;

/**
 * __useChannelMessagesQuery__
 *
 * To run a query within a React component, call `useChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, baseOptions);
      }
export function useChannelMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, baseOptions);
        }
export type ChannelMessagesQueryHookResult = ReturnType<typeof useChannelMessagesQuery>;
export type ChannelMessagesLazyQueryHookResult = ReturnType<typeof useChannelMessagesLazyQuery>;
export type ChannelMessagesQueryResult = ApolloReactCommon.QueryResult<ChannelMessagesQuery, ChannelMessagesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      username
      email
      image
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    email
    image
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesDocument = gql`
    query Messages {
  messages {
    id
    user {
      username
      image
    }
    date
    content
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = ApolloReactCommon.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const ChatDocument = gql`
    subscription Chat {
  newMessage {
    id
    user {
      username
      image
    }
    date
    content
  }
}
    `;

/**
 * __useChatSubscription__
 *
 * To run a query within a React component, call `useChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ChatSubscription, ChatSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ChatSubscription, ChatSubscriptionVariables>(ChatDocument, baseOptions);
      }
export type ChatSubscriptionHookResult = ReturnType<typeof useChatSubscription>;
export type ChatSubscriptionResult = ApolloReactCommon.SubscriptionResult<ChatSubscription>;
export const SendMessageDocument = gql`
    mutation SendMessage($content: String!) {
  sendMessage(input: {content: $content})
}
    `;
export type SendMessageMutationFn = ApolloReactCommon.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SendChannelMessageDocument = gql`
    mutation SendChannelMessage($content: String!, $channelId: Int!) {
  sendChannelMessage(input: {content: $content, channelId: $channelId})
}
    `;
export type SendChannelMessageMutationFn = ApolloReactCommon.MutationFunction<SendChannelMessageMutation, SendChannelMessageMutationVariables>;

/**
 * __useSendChannelMessageMutation__
 *
 * To run a mutation, you first call `useSendChannelMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendChannelMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendChannelMessageMutation, { data, loading, error }] = useSendChannelMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSendChannelMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendChannelMessageMutation, SendChannelMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<SendChannelMessageMutation, SendChannelMessageMutationVariables>(SendChannelMessageDocument, baseOptions);
      }
export type SendChannelMessageMutationHookResult = ReturnType<typeof useSendChannelMessageMutation>;
export type SendChannelMessageMutationResult = ApolloReactCommon.MutationResult<SendChannelMessageMutation>;
export type SendChannelMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<SendChannelMessageMutation, SendChannelMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: Int!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(input: {username: $username, email: $email, password: $password})
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
    image
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;