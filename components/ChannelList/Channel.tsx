import React, { useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

interface ChannelProps {
  id: number
  image: string
  name: string
}

interface DetailProps {
  open: boolean
}

const ChannelContainer = styled.div`
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.colors.white.base};
  }
  padding: calc(0.3vw + 0.4rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: ${({ theme }) => theme.transitions.boom.transition};
  &:hover {
    background: ${({ theme }) => theme.colors.black.light};
    img {
      transform: scale(1.15);
    }
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.colors.black.light};
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  p {
    color: ${({ theme }) => theme.colors.white.grey};
  }
`

const Detail = styled.div<DetailProps>`
  margin: 0 0.6rem;
  font-size: 0.5rem;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  z-index: 20;
  position: fixed;
  left: calc(1.5vw + 2rem);
  border-radius: ${({ theme }) => theme.borderRadius.default};
  // color: ${({ theme }) => theme.colors.background.ddark};
  color: ${({ theme }) => theme.colors.white.base};
  backdrop-filter: blur(30px);
  padding: 10px;
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  transition: ${({ theme }) => theme.transitions.boom.transition};
  border-radius: ${({ theme }) => theme.borderRadius.round};
`

export const Channel: React.FC<ChannelProps> = ({ id, image, name }) => {
  const [open, setOpen] = useState(false)
  return (
    <Link as={`/channels/${id}`} href={`/channels/${id}`}>
      <ChannelContainer
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <a>
          <Content>
            <Img src={image} />
            <Detail open={open}>
              <h1>{name}</h1>
            </Detail>
          </Content>
        </a>
      </ChannelContainer>
    </Link>
  )
}
