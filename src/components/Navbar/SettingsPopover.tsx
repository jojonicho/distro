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
  Tooltip,
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
  <PopoverContent border="0">
    <Stack p={2} spacing={0} color="gray.800">
      {/* <ChakraLink href={`/users/${id}`}> */}
      <ChakraLink href={`/me`}>
        <Badge mb={2} fontSize="sm">
          {username}
        </Badge>
      </ChakraLink>
      <Button variantColor="teal" onClick={onOpen}>
        Change Image
      </Button>
      <Button
        variantColor="pink"
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
