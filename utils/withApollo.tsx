import {
  ApolloClient,
  ApolloLink,
  Observable,
  HttpLink,
  InMemoryCache,
  fromPromise,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import fetch from 'isomorphic-fetch'
import { getAccessToken, setAccessToken, fetchAccessToken } from './accessToken'
import { enableMapSet } from 'immer'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getMainDefinition } from '@apollo/client/utilities'
import { createWithApollo } from './createWithApollo'
import { NextPageContext } from 'next'
import { PaginatedMessages } from '../generated/graphql'

enableMapSet()

let apolloClient = null

const production = process.env.NODE_ENV === 'production'
const API_URL = production
  ? 'https://distrobackend.herokuapp.com'
  : 'http://localhost:4000'
const WS_URL = production
  ? 'wss://distrobackend.herokuapp.com'
  : 'ws://localhost:4000'

const createClient = (ctx: NextPageContext) => {
  const cache = new InMemoryCache({
    typePolicies: {
      // Query: {
      //   fields: {
      //     messages: {
      //       keyArgs: [],
      //       merge(
      //         existing: PaginatedMessages | undefined,
      //         incoming: PaginatedMessages
      //       ): PaginatedMessages {
      //         return {
      //           ...incoming,
      //           messages: [...(existing?.messages || []), ...incoming.messages],
      //         }
      //       },
      //     },
      //   },
      // },
    },
  })
  // }).restore(initialState || {})
  // }).restore(initialState || {})
  // const cache = new InMemoryCache()
  const ssrMode = !process.browser
  // const request = async (operation) => {
  //   operation.setContext({
  //     http: {
  //       includeExtensions: true,
  //       includeQuery: false,
  //     },
  //     headers,
  //   })
  // }

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any
        Promise.resolve(operation)
          .then((op) => {
            const accessToken = getAccessToken()
            if (accessToken) {
              op.setContext({
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              })
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

  // Create File Upload Link
  // const isFile = (value) =>
  //   (typeof File !== 'undefined' && value instanceof File) ||
  //   (typeof Blob !== 'undefined' && value instanceof Blob);

  const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: 'include',
    fetch,
  })

  // Make sure the wsLink is only created on the browser. The server doesn't have a native implemention for websockets
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: `${WS_URL}/subscriptions`,
        options: {
          reconnect: true,
        },
      })
    : null

  // // Let Apollo figure out if the request is over ws or http
  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  let forward$
  let isRefreshing = false
  let pendingRequests: any = []
  const refreshAuthLogic = (failedRequest: any) =>
    axios
      .post('/auth/refresh_token', {}, { withCredentials: true })
      .then((tokenRefreshResponse) => {
        setAccessToken(tokenRefreshResponse.data.accessToken)
        failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`
        return Promise.resolve()
      })

  createAuthRefreshInterceptor(axios, refreshAuthLogic)

  const resolvePendingRequests = () => {
    pendingRequests.map((callback: any) => callback())
    pendingRequests = []
  }

  const resolvePromise = (resolve: () => void) => {
    pendingRequests.push(() => resolve())
  }

  const resetPendingRequests = () => {
    pendingRequests = []
  }

  const setRefreshing = (newVal: boolean) => {
    isRefreshing = newVal
  }
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (err.extensions && err.extensions.code) {
            switch (err.extensions.code) {
              case 'UNAUTHENTICATED':
                if (!isRefreshing) {
                  setRefreshing(true)
                  forward$ = fromPromise(
                    fetchAccessToken()
                      .then((response: any) => {
                        setAccessToken(response.accessToken)
                        resolvePendingRequests()
                        return response.accessToken
                      })
                      .catch(() => {
                        resetPendingRequests()
                        // TODO
                        // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                        return undefined
                      })
                      .finally(() => {
                        setRefreshing(false)
                      })
                  ).filter((value) => Boolean(value))
                } else {
                  forward$ = fromPromise(new Promise(resolvePromise))
                }
                return forward$.flatMap(() => forward(operation))
              default:
              // pass
            }
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`) // eslint-disable-line no-console
      }
      return undefined
    }
  )

  return new ApolloClient({
    link: ApolloLink.from([
      // onError(({ graphQLErrors, networkError }) => {
      //   if (graphQLErrors) {
      //     graphQLErrors.forEach(
      //       ({ message, locations, path }) =>
      //         console.log(
      //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //         ) // eslint-disable-line no-console
      //     )
      //   }
      //   if (networkError) {
      //     console.log(`[Network error]: ${networkError}`) // eslint-disable-line no-console
      //   }
      // }),
      errorLink,
      requestLink,
      splitLink,
    ]),
    ssrMode,
    cache,
  })
}

// export default (initialState, headers) => {
//   if (!process.browser) {
//     return create(initialState, headers)
//   }
//   if (!apolloClient) {
//     apolloClient = create(initialState, headers)
//   }

//   return apolloClient
// }

export const withApollo = createWithApollo(createClient)
