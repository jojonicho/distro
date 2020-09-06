import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDeleteMessageMutation, User } from '../../generated/graphql'
import {
  Text,
  Stack,
  PseudoBox,
  Popover,
  PopoverContent,
  Button,
  Icon,
  PopoverTrigger,
} from '@chakra-ui/core'

interface MessageProps {
  id: number
  image: string
  username: string
  message: string
  user: User
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
  }
  p {
    font-size: calc(0.8rem + 0.1vw);
  }
  h1 {
    font-size: calc(0.8rem + 0.1vw);
  }
`

const Detail = styled.div`
  margin: 0 0.6rem;
  backdrop-filter: blur(30px);
`
const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: 5px;
  cursor: pointer;
`

export const Message: React.FC<MessageProps> = ({
  id,
  image,
  username,
  message,
  user,
}) => {
  const [deleteMessage] = useDeleteMessageMutation()
  const onClick = () => {
    deleteMessage({
      variables: {
        id,
      },
      update: (cache) => {
        cache.evict({ fieldName: 'messages' })
      },
    })
  }
  return (
    <PseudoBox _hover={{ bg: 'gray.600' }}>
      <Stack
        isInline
        width="100%"
        justify="space-between"
        mt={1}
        mb={1}
        pr={3}
        pl={3}
      >
        <Content>
          <Img src={image} />
          <Detail>
            <Text fontFamily="arial" fontWeight="bold">
              {username}
            </Text>
            <p>{message}</p>
          </Detail>
        </Content>
        {user.username === username && (
          <Stack>
            <Popover>
              <PopoverTrigger>
                <Icon name="drag-handle" cursor="pointer" />
              </PopoverTrigger>
              <PopoverContent border="0">
                <Stack p={2} spacing={0} color="gray.800">
                  <Button variantColor="pink" onClick={onClick}>
                    Delete
                  </Button>
                </Stack>
              </PopoverContent>
            </Popover>
          </Stack>
        )}
      </Stack>
    </PseudoBox>
  )
}
