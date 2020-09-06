import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  ModalFooter,
  Button,
  Image,
} from "@chakra-ui/core";

interface ChangeImageModalProps {
  onClose: () => void;
  isOpen: boolean;
  currentImage: string;
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
  formState: any;
  handleSubmit: any;
  onSubmit: () => Promise<void>;
}

export const ChangeImageModal: React.FC<ChangeImageModalProps> = ({
  onClose,
  isOpen,
  currentImage,
  setCurrentImage,
  formState,
  handleSubmit,
  onSubmit,
}) => {
  const images = [
    "https://images-ext-1.discordapp.net/external/ZNDgJ2gKt-v92XI3nYgDwx1bd0aBm6N41-MDWU_mfaE/https/imgur.com/TAlz65L.gif",
    "https://images-ext-1.discordapp.net/external/Hq_g8eT-zyW1V9XEy5w3bh08-RquxOJhUgs1Y6qEniE/https/imgur.com/xftxkFF.gif",
    "https://images-ext-2.discordapp.net/external/HcBpqz5Z-GTlhY84YfPwHWpJ_T4nG6BF1iidvkDrzXE/https/imgur.com/yozNjc8.gif",
    "https://images-ext-1.discordapp.net/external/fl-oiDHbQKVxJVVWU1XR6qyn2unZakVHjcqwsXayH_c/https/imgur.com/mSl5Umg.gif.gif",
    "https://images-ext-1.discordapp.net/external/uglykyOnroioO07ceP5ZrwTlkRjf7XMKIt0TJPR3k0Y/https/imgur.com/oI8Gk4g.gif",
    "https://images-ext-1.discordapp.net/external/xIQ5THfX_nW_jh5WTYg9VuIQSQZyW4uXPYn_XEr2rNI/https/imgur.com/ieF92zm.gif",
  ];
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay style={{ backdropFilter: "blur(4px)" }} />
      <ModalContent rounded="0.4rem">
        <ModalHeader>User Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center">
            <Image
              mr={3}
              size="150px"
              objectFit="cover"
              rounded="0.4rem"
              src={currentImage}
            />
            <Flex dir="row" wrap="wrap">
              {images.map((img, i) => (
                <Image
                  key={i}
                  cursor="pointer"
                  size="75px"
                  objectFit="cover"
                  rounded="0.4rem"
                  src={img}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            variantColor="pink"
            type="submit"
            isLoading={formState.isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
