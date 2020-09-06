import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  users: Array<User>;
  messages: PaginatedMessages;
  channelMessages: PaginatedMessages;
  channels?: Maybe<Array<Channel>>;
  channelUsers: Array<User>;
};


export type QueryMessagesArgs = {
  channelId?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryChannelMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  channelId: Scalars['Int'];
};


export type QueryChannelUsersArgs = {
  channelId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  image: Scalars['String'];
  messages?: Maybe<Array<Message>>;
  channels?: Maybe<Array<Channel>>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  date: Scalars['String'];
  content: Scalars['String'];
  user: User;
  channel?: Maybe<Channel>;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
  name: Scalars['String'];
  users: Array<User>;
  image: Scalars['String'];
  messages: Array<Message>;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<Message>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  revokeRefreshTokenUser: Scalars['Boolean'];
  login: LoginResponse;
  changeImage: Scalars['String'];
  logout: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRevokeRefreshTokenUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangeImageArgs = {
  image: Scalars['String'];
};


export type MutationSendMessageArgs = {
  input: MessageInput;
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
  channelId?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  newUser: User;
};

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = (
  { __typename?: 'Query' }
  & { channels?: Maybe<Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'image'>
  )>> }
);

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChannel'>
);

export type ChannelUsersQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type ChannelUsersQuery = (
  { __typename?: 'Query' }
  & { channelUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'image'>
  )> }
);

export type MessagesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  channelId?: Maybe<Scalars['Int']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'date' | 'content'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'image'>
      ) }
    )> }
  ) }
);

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'date' | 'content'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'image'>
    ) }
  ) }
);

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String'];
  channelId?: Maybe<Scalars['Int']>;
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendMessage'>
);

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type ChangeImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type ChangeImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeImage'>
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
    & Pick<User, 'id' | 'username' | 'email' | 'image'>
  )> }
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
export function useChannelsQuery(baseOptions?: Apollo.QueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
        return Apollo.useQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
      }
export function useChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
          return Apollo.useLazyQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
        }
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
export type ChannelsQueryResult = Apollo.QueryResult<ChannelsQuery, ChannelsQueryVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($name: String!) {
  createChannel(name: $name)
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

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
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const ChannelUsersDocument = gql`
    query ChannelUsers($channelId: Int!) {
  channelUsers(channelId: $channelId) {
    id
    username
    email
    image
  }
}
    `;

/**
 * __useChannelUsersQuery__
 *
 * To run a query within a React component, call `useChannelUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelUsersQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelUsersQuery(baseOptions?: Apollo.QueryHookOptions<ChannelUsersQuery, ChannelUsersQueryVariables>) {
        return Apollo.useQuery<ChannelUsersQuery, ChannelUsersQueryVariables>(ChannelUsersDocument, baseOptions);
      }
export function useChannelUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelUsersQuery, ChannelUsersQueryVariables>) {
          return Apollo.useLazyQuery<ChannelUsersQuery, ChannelUsersQueryVariables>(ChannelUsersDocument, baseOptions);
        }
export type ChannelUsersQueryHookResult = ReturnType<typeof useChannelUsersQuery>;
export type ChannelUsersLazyQueryHookResult = ReturnType<typeof useChannelUsersLazyQuery>;
export type ChannelUsersQueryResult = Apollo.QueryResult<ChannelUsersQuery, ChannelUsersQueryVariables>;
export const MessagesDocument = gql`
    query Messages($limit: Int!, $cursor: String, $channelId: Int) {
  messages(limit: $limit, cursor: $cursor, channelId: $channelId) {
    messages {
      id
      user {
        username
        image
      }
      date
      content
    }
    hasMore
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MessageDocument = gql`
    subscription Message {
  newMessage {
    id
    user {
      id
      username
      image
    }
    date
    content
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, baseOptions);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;
export const SendMessageDocument = gql`
    mutation SendMessage($content: String!, $channelId: Int) {
  sendMessage(input: {content: $content, channelId: $channelId})
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

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
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: Int!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

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
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const ChangeImageDocument = gql`
    mutation ChangeImage($image: String!) {
  changeImage(image: $image)
}
    `;
export type ChangeImageMutationFn = Apollo.MutationFunction<ChangeImageMutation, ChangeImageMutationVariables>;

/**
 * __useChangeImageMutation__
 *
 * To run a mutation, you first call `useChangeImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeImageMutation, { data, loading, error }] = useChangeImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useChangeImageMutation(baseOptions?: Apollo.MutationHookOptions<ChangeImageMutation, ChangeImageMutationVariables>) {
        return Apollo.useMutation<ChangeImageMutation, ChangeImageMutationVariables>(ChangeImageDocument, baseOptions);
      }
export type ChangeImageMutationHookResult = ReturnType<typeof useChangeImageMutation>;
export type ChangeImageMutationResult = Apollo.MutationResult<ChangeImageMutation>;
export type ChangeImageMutationOptions = Apollo.BaseMutationOptions<ChangeImageMutation, ChangeImageMutationVariables>;
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(input: {username: $username, email: $email, password: $password})
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;