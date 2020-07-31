import React from 'react'
import { useForm } from 'react-hook-form'
import {
  // useRegisterMutation,
  useLoginMutation,
  MeDocument,
  MeQuery,
} from '../generated/graphql'
import { setAccessToken } from '../lib/accessToken'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Subtitle } from '../components/Subtitle'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FormContainer = styled.div`
  background: ${({ theme }) => theme.gradient.rightToLeft};
  margin-top: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: calc(0.05vw + 2.5rem);
  color: ${({ theme }) => theme.colors.secondary.base};
  font-weight: bold;
  .submit {
    cursor: pointer;
    margin-bottom: 0;
    font-weight: bold;
    &:hover {
      filter: brightness(1.2);
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    width: 80vw;
  }
`

const Form = styled.form`
  div {
    margin-bottom: 1rem;
  }
`
const Input = styled.input`
  // margin: 0.4rem 0 0.8rem 0;
  margin: 0.4rem 0;
  padding: calc(0.1vw + 0.5rem);
  display: flex;
  justify-content: center;
  width: 20rem;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.black.light};
  color: ${({ theme }) => theme.colors.white.base};
  &:focus {
    border: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    width: 100%;
  }
`

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const [login, { client }] = useLoginMutation()
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
      router.push('/')
    }
  }
  return (
    <LoginContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Subtitle text="email" />
            <Input
              placeholder="iloveemilia@rem.com"
              name="email"
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            {errors.email && errors.email.message}
          </div>
          <div>
            <Subtitle text="password" />
            <Input
              type="password"
              placeholder="password"
              name="password"
              autoComplete="new-password"
              ref={register({
                required: 'Required',
              })}
            />
            {errors.password && errors.password.message}
          </div>
          <Input className="submit" type="submit" />
        </Form>
      </FormContainer>
    </LoginContainer>
  )
}

export default Login
