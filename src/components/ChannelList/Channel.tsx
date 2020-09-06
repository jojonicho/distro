import React, { useState } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Text, Avatar } from '@chakra-ui/core'
import { colors } from '../../utils/theme'

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
  }
  padding: calc(0.3vw + 0.4rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
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
  }
  p {
  }
`

const Detail = styled.div<DetailProps>`
  margin: 0 0.6rem;
  font-size: 0.5rem;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  z-index: 20;
  position: fixed;
  left: calc(1.5vw + 2rem);
  backdrop-filter: blur(30px);
  padding: 10px;
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
            <Avatar
              src={image}
              width="calc(1vw + 1.75rem)"
              height="calc(1vw + 1.75rem)"
            />
            <Detail open={open}>
              <Text
                color={colors.white.base}
                fontWeight="bold"
                fontFamily="arial"
                fontSize="1rem"
              >
                {name}
              </Text>
            </Detail>
          </Content>
        </a>
      </ChannelContainer>
    </Link>
  )
}
