import React, { useState } from 'react'
import { Channel } from './Channel'
import styled from '@emotion/styled'
import { useCreateChannelMutation } from '../../generated/graphql'
import { BarLoader } from 'react-spinners'
import Link from 'next/link'

interface ChannelListProps {
  loading: boolean
  channels: any
}

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.1rem;
  background: ${({ theme }) => theme.gradient.rightToLeft};
`
const AddChannelContainer = styled.div`
  padding: calc(0.3vw + 0.4rem) 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transitions.boom.transition};
  input {
    width: 60%;
  }
`
const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background: ${({ theme }) => theme.gradient.rightToLeft};
  color: ${({ theme }) => theme.colors.white.base};
  transition: ${({ theme }) => theme.transitions.boom.transition};
  font-size: calc(0.5vw + 1rem);
  &:hover {
    background: ${({ theme }) => theme.colors.black.light};
  }
  border: none;
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
`

const ChannelList: React.FC<ChannelListProps> = ({ loading, channels }) => {
  const [channelName, setChannelName] = useState('')
  const [chn] = useCreateChannelMutation()
  const onClick = async () => {
    if (channelName !== '') {
      await chn({
        variables: {
          name: channelName,
        },
      })
    }
  }
  return (
    <ChannelContainer>
      {loading ? (
        <BarLoader />
      ) : (
        <>
          <Link href="/">
            <AddChannelContainer>
              <Button>🏠</Button>
            </AddChannelContainer>
          </Link>
          {channels.channels.map((chn) => (
            <Channel id={chn.id} image={chn.image} name={chn.name} />
          ))}
          <AddChannelContainer>
            <Button onClick={onClick}>+</Button>
          </AddChannelContainer>
        </>
      )}
    </ChannelContainer>
  )
}

export default ChannelList
