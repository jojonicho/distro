/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
// import { Button, Radio } from 'antd';
// import { useRouter } from 'next/router';
import styled from '@emotion/styled'
import App from '../components/App'
// import { useStartGameMutation, Language } from '../generated';
import Head from 'next/head'
import {
  useHelloQuery,
  useUsersQuery,
  useChatSubscription,
  useMessageMutation,
} from '../generated/graphql'
import { useForm } from 'react-hook-form'
// import Error from '../components/Error';

const Wrapper = styled.div`
  padding: 1rem;
  z-index: 2;
  position: relative;
  .inner {
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: rgba(256, 256, 256, 0.8);
    border-radius: 4px;
  }
`
type FormData = {
  content: string
}
const Home = () => {
  // const { data, loading, error } = useHelloQuery();
  // const { data, loading, error } = useUsersQuery()
  const [message, setMessage] = useState([])
  const { data, loading, error } = useChatSubscription()
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const [msg] = useMessageMutation()
  const onSubmit = handleSubmit(async ({ content }) => {
    console.log(content)
    const response = await msg({
      variables: {
        content,
      },
    })
    console.log(response)
  })
  return (
    <App
      title="Codenames"
      description="Play codenames online with friends and family. Choose between family-friendly words or adult-only words."
    >
      <Head>
        <script
          type="text/javascript"
          src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e88192c0627598b"
        ></script>
      </Head>
      <Wrapper>
        {/* <div id="add-this-wrapper">
          <div className="addthis_floating_share_toolbox" />
        </div> */}
        <div className="inner">
          {/* {data && data.users && !loading ? (
            // <div>{data.users}</div>
            data.users.map((user) => <li key={user.id}>{user.username} </li>)
          ) : (
            <div>loading..</div>
          )} */}
          {data && data.newMessage && !loading ? (
            // <div>{data.users}</div>
            <>
              <div>{data.newMessage.user.username}</div>
              <div>{data.newMessage.content}</div>
            </>
          ) : (
            <div>waiting for new messages..</div>
          )}
          <form onSubmit={onSubmit}>
            <input name="content" ref={register} />
          </form>
        </div>
      </Wrapper>
    </App>
  )
}

export default Home
