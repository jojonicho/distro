import React from 'react'
import { ApolloClient } from '@apollo/client'
import { NextRouter } from 'next/router'
import {
  PopoverContent,
  Flex,
  Badge,
  Avatar,
  Button,
  Text,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/core'

interface SettingsProps {
  id: number
  username: string
  currentImage: string
  onOpen: () => void
  client: any
  logout: any
  router: NextRouter
}

export const SettingsPopover: React.FC<SettingsProps> = ({
  id,
  username,
  currentImage,
  onOpen,
  client,
  logout,
  router,
}) => (
  <PopoverContent border="0" width="100px">
    <Stack p={2} spacing={0}>
      <Text fontWeight="bold">
        <ChakraLink href={`/users/${id}`}>
          <Badge fontSize="sm">{username}</Badge>
        </ChakraLink>
      </Text>
      <Flex align="center" mt={2}>
        <Avatar
          name="profPic"
          src={currentImage}
          cursor="pointer"
          onClick={onOpen}
        />
      </Flex>
      <Button
        mt={2}
        onClick={async () => {
          await logout()
          await client!.resetStore()
          router.push('/')
        }}
      >
        Logout
      </Button>
    </Stack>
  </PopoverContent>
)
