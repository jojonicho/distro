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
  padding: calc(0.1vw + 3rem);
  color: white;
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

const Input = styled.input`
  margin: 0.4rem 0 0.8rem 0;
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
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [login, { client }] = useLoginMutation()
  const onSubmit = handleSubmit(async ({ email, password }) => {
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
  })
  return (
    <LoginContainer>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <label>email</label>
          <Input name="email" placeholder="email" ref={register} />
          {errors.email && 'email is required.'}
          <label>password</label>
          <Input
            type="password"
            placeholder="password"
            name="password"
            ref={register}
          />
          {errors.password && 'password is required.'}
          <Input className="submit" type="submit" />
        </form>
      </FormContainer>
    </LoginContainer>
  )
}

export default Login
