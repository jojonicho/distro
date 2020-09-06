import React, { useState, useEffect } from 'react'
import {
  useLogoutMutation,
  useMeQuery,
  MeQuery,
  useChangeImageMutation,
} from '../../generated/graphql'
import styled from '@emotion/styled'
import { setAccessToken, getAccessToken } from '../../utils/accessToken'
import Link from 'next/link'
import theme from '../../utils/theme'
import { useRouter } from 'next/router'
import { BarLoader } from 'react-spinners'
import {
  Text,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  useDisclosure,
  Image,
  PseudoBox,
  Tooltip,
} from '@chakra-ui/core'
import { SettingsPopover } from './SettingsPopover'
import { useForm } from 'react-hook-form'
import gql from 'graphql-tag'
import { ChangeImageModal } from './ChangeImageModal'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  position: absolute;
  right: 0;
  backdrop-filter: blur(30px);
  z-index: 1000;
`

const Img = styled.img`
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
  border-radius: ${theme.borderRadius.round};
  &:hover {
    filter: brightness(0.8);
  }
  margin-right: 5px;
  cursor: pointer;
`
interface NavbarProps {
  data: MeQuery
  loading: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ data, loading }) => {
  const router = useRouter()
  const { handleSubmit, formState } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [logout, { client }] = useLogoutMutation()
  const [currentImage, setCurrentImage] = useState(
    loading ? '' : data?.me?.image || ''
  )
  useEffect(() => {
    if (!loading && data && data.me) setCurrentImage(data.me.image)
  }, [loading])
  const [img] = useChangeImageMutation()
  const onSubmit = async () => {
    await img({
      variables: {
        image: currentImage,
      },
      update: (cache) => {
        cache.writeFragment({
          id: 'User:' + data.me?.id,
          fragment: gql`
            fragment __ on User {
              image
            }
          `,
          data: { image: currentImage } as any,
        })
      },
    })
  }
  return (
    <Nav>
      {loading ? (
        <BarLoader />
      ) : !loading && data && data.me ? (
        <Stack isInline color="white" justify="center" align="center">
          <Popover trigger="click" placement="bottom">
            <PopoverTrigger>
              <Img
                width="calc(1vw + 1.75rem)"
                height="calc(1vw + 1.75rem)"
                src={data.me.image}
              />
            </PopoverTrigger>
            <SettingsPopover
              id={data.me.id}
              username={data.me.username}
              currentImage={currentImage}
              onOpen={onOpen}
              client={client}
              logout={logout}
              router={router}
            />
          </Popover>
          <Text fontWeight="bold">{data.me.username}</Text>
          <ChangeImageModal
            onClose={onClose}
            isOpen={isOpen}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </Stack>
      ) : null}
    </Nav>
  )
}
