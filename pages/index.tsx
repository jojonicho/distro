/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { Button, Radio } from 'antd';
// import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import App from '../components/App';
// import { useStartGameMutation, Language } from '../generated';
import Head from 'next/head';
import { useHelloQuery, useUsersQuery } from '../generated/graphql';
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
    padding: 1rem;
    background-color: rgba(256, 256, 256, 0.8);
    border-radius: 4px;
  }
`;

const Home = () => {
  // const { data, loading, error } = useHelloQuery();
  const { data, loading, error } = useUsersQuery();
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
          {data && data.users && !loading ? (
            // <div>{data.users}</div>
            data.users.map((user) => <li key={user.id}>{user.username} </li>)
          ) : (
            <div>loading..</div>
          )}
          <p>To get started playing codenames online with your friends:</p>
          <ol>
            <li>Select your language</li>
            <li>Click 'START GAME'</li>
            <li>Select your team and role</li>
            <li>Share the link with your friends</li>
            <li>Start playing Codenames</li>
          </ol>

          <p>
            Codenames is a simple game to play. Simple, choose your team and
            your role. Each team will have a spymaster and a player. When it's
            your turn, the Spymaster will give the player a one word clue and a
            number of words that clue relates to. The player should then click
            the words that they think the clue relates to. Whoever finds all the
            words first, wins!
          </p>
          <p>
            Each round will include a 'death' word. Be sure to not click it or
            you and your teammate will instantly lose the game.
          </p>
        </div>
      </Wrapper>
    </App>
  );
};

export default Home;
