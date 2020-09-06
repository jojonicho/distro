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
import { Subtitle } from '../components/Subtitle'
import Link from 'next/link'
import { ClipLoader as Loader } from 'react-spinners'
import { withApollo } from '../utils/withApollo'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(0.05vw + 2.5rem);
  font-weight: bold;
  .submit {
    cursor: pointer;
    margin-bottom: 0;
    font-weight: bold;
    &:hover {
      filter: brightness(1.2);
    }
  }
`

const Form = styled.form`
  div {
    margin-bottom: 1rem;
  }
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  // margin: 0.4rem 0 0.8rem 0;
  margin: 0.4rem 0;
  padding: calc(0.1vw + 0.5rem);
  display: flex;
  justify-content: center;
  width: 20rem;
  border-radius: 2px;
  &:focus {
    border: none;
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
    <LoginContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Subtitle text="email" />
            <Input
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
                required: 'password pls.',
                pattern: {
                  value: /^.{8,}$/i,
                  message: 'password must be atleast 8 characters',
                },
              })}
            />
            {errors.password && errors.password.message}
          </div>
          {loading ? (
            <LoaderContainer>
              <Loader color="white" />
            </LoaderContainer>
          ) : (
            <Input className="submit" type="submit" />
          )}
        </Form>
      </FormContainer>
      <Link href="/register">or Register for an account</Link>
    </LoginContainer>
  )
}

export default withApollo({ ssr: false })(Login)
