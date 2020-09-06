import React from 'react'
import { useForm } from 'react-hook-form'
import {
  // useRegisterMutation,
  useLoginMutation,
  MeDocument,
  MeQuery,
} from '../generated/graphql'
import { setAccessToken } from '../utils/accessToken'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Link from 'next/link'
import { ClipLoader as Loader } from 'react-spinners'
import { withApollo } from '../utils/withApollo'
import {
  Stack,
  Input,
  Text,
  FormControl,
  Button,
  Link as ChakraLink,
  FormLabel,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/core'

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(0.05vw + 2.5rem);
  font-weight: bold;
`

const Form = styled.form``
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const [login, { loading }] = useLoginMutation()
  const onSubmit = async ({ email, password }) => {
    const response = await login({
      variables: {
        email,
        password,
      },
      // cache
      update: (store, { data }) => {
        if (!data) return null
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data.login.user,
          },
        })
      },
    })
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken)
    }
    router.push('/')
  }
  return (
    <Stack p={10} bg="gray.700" color="white" borderRadius="5px">
      <Stack align="center" justify="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={Boolean(
              errors.email?.message || errors.password?.message
            )}
          >
            <FormLabel htmlFor="email">email</FormLabel>
            <Input
              color="gray.700"
              placeholder="iloveemilia@rem.com"
              name="email"
              ref={register({
                required: 'please provide an email.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              color="gray.700"
              type="password"
              placeholder="password"
              name="password"
              autoComplete="new-password"
              ref={register({
                required: 'password pls.',
                pattern: {
                  value: /^.{8,}$/i,
                  message: 'password must be atleast 8 characters',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Stack>
      <ChakraLink href="/register" flexGrow={1} mr={2}>
        or Register for an account <Icon name="external-link" mx="2px" />
      </ChakraLink>
    </Stack>
  )
}

export default withApollo({ ssr: false })(Login)
