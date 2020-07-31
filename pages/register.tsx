import React from 'react'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { Subtitle } from '../components/Subtitle'

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
const Register = () => {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm<FormData>({
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
    <RegisterContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Subtitle text="username" />
            <Input
              name="username"
              placeholder="raphtalia"
              ref={register({
                required: 'Required',
              })}
            />
            {errors.username && errors.username.message}
          </div>
          <div>
            <Subtitle text="email" />
            <Input
              name="email"
              placeholder="raphtalia@bestgirl.com"
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
    </RegisterContainer>
  )
}
export default Register
