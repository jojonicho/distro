import React, { useState } from 'react'
import { Channel } from './Channel'
import styled from '@emotion/styled'
import {
  useCreateChannelMutation,
  CreateChannelMutationVariables,
  useChannelsQuery,
} from '../../generated/graphql'
import { BarLoader } from 'react-spinners'
import Link from 'next/link'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormLabel,
  Badge,
  Input,
  Button as ChakraButton,
  FormControl,
} from '@chakra-ui/core'
import { colors } from '../../utils/theme'
import { useForm } from 'react-hook-form'

interface ChannelListProps {}

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.1rem;
`
const AddChannelContainer = styled.div`
  padding: calc(0.3vw + 0.4rem) 1vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
const Button = styled.button`
  font-size: calc(0.5vw + 1rem);
  &:hover {
  }
  border: none;
  width: calc(1vw + 1.75rem);
  height: calc(1vw + 1.75rem);
`

const ChannelList: React.FC<ChannelListProps> = () => {
  const [chn] = useCreateChannelMutation()
  const { data: channels, loading, refetch } = useChannelsQuery()
  const { handleSubmit, register, formState } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onSubmit = async ({ name }: CreateChannelMutationVariables) => {
    if (name !== '') {
      await chn({
        variables: {
          name,
        },
        update: (cache) => {
          cache.evict({ fieldName: 'channels' })
        },
      })
    }
  }
  return (
    // <Stack bg="gray.800">
    <Stack>
      {loading ? (
        <BarLoader />
      ) : (
        <>
          <Link href="/">
            <AddChannelContainer>
              <Button>🏠</Button>
            </AddChannelContainer>
          </Link>
          {channels &&
            channels.channels.map((chn) => (
              <Channel id={chn.id} image={chn.image} name={chn.name} />
            ))}
          <AddChannelContainer>
            <Button onClick={onOpen}>+</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay style={{ backdropFilter: 'blur(4px)' }} />
              <ModalContent
                rounded="0.4rem"
                bg={colors.background.ddark}
                color={colors.white.base}
                width="550px"
                p={3}
              >
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                      <Stack spacing={3} align="center" justify="center">
                        <FormLabel>Create A Channel</FormLabel>
                        <Input
                          p={3}
                          variant="outline"
                          placeholder="Super Secret Group"
                          name="name"
                          ref={register}
                          color={colors.black.base}
                        />
                        <ChakraButton
                          p={3}
                          w="100%"
                          borderRadius={3}
                          background={colors.secondary.base}
                          isLoading={formState.isSubmitting}
                          onClick={handleSubmit(onSubmit)}
                          type="submit"
                        >
                          Submit
                        </ChakraButton>
                      </Stack>
                    </FormControl>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </AddChannelContainer>
        </>
      )}
    </Stack>
  )
}

export default ChannelList
