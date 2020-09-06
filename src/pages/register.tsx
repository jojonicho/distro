import React from 'react'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Link from 'next/link'
import { withApollo } from '../utils/withApollo'
import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Icon,
  Link as ChakraLink,
  Input,
} from '@chakra-ui/core'

type FormData = {
  username: string
  email: string
  password: string
}

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Register = () => {
  const router = useRouter()
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const [reg] = useRegisterMutation()
  const onSubmit = async ({ username, email, password }) => {
    const response = await reg({
      variables: {
        username,
        email,
        password,
      },
    })
    router.push('/')
    console.log(response)
  }
  return (
    <Stack bg="gray.700" p={10} borderRadius="5px" color="white">
      <RegisterContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={Boolean(
              errors.email?.message || errors.password?.message
            )}
          >
            <FormLabel htmlFor="email">email</FormLabel>
            <Input
              color="gray.700"
              name="email"
              placeholder="raphtalia@bestgirl.com"
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

            <FormLabel htmlFor="username">username</FormLabel>
            <Input
              color="gray.700"
              name="username"
              placeholder="raphtalia"
              ref={register({
                required: 'username equired.',
                pattern: {
                  value: /^.{6,25}$/i,
                  message: 'username must be between 6 and 25 characters',
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
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
      </RegisterContainer>
      <ChakraLink href="/login">
        already have an account? <Icon name="external-link" mx="2px" />
      </ChakraLink>
    </Stack>
  )
}
export default withApollo({ ssr: false })(Register)
