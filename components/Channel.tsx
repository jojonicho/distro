import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

interface ChannelProps {
  id: number
  image: string
  name: string
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black.light};
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  p {
    color: ${({ theme }) => theme.colors.white.grey};
  }
`

const ChannelContainer = styled.div`
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.colors.white.base};
  }
  padding: calc(0.3vw + 0.4rem) 1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transitions.boom.transition};
  &:hover {
    background-color: ${({ theme }) => theme.colors.black.light};
    img {
      border-radius: ${({ theme }) => theme.borderRadius.default};
    }
  }
`
const Detail = styled.div`
  margin: 0 0.6rem;
  font-size: 0.5rem;
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  transition: all 100ms;
  border-radius: ${({ theme }) => theme.borderRadius.round};
`

export const Channel: React.FC<ChannelProps> = ({ id, image, name }) => {
  return (
    <Link as={`/channels/${id}`} href={`/channels/${id}`}>
      <ChannelContainer>
        <a>
          <Content>
            <Img src={image} />
            <Detail>
              <h1>{name}</h1>
            </Detail>
          </Content>
        </a>
      </ChannelContainer>
    </Link>
  )
}
