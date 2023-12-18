import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';

interface Props {
  title: string;
  buttonTextContinue: string;
  buttonTextLeave: string;
  body: string;
  func?: () => void;
  defaultOpen?: boolean | undefined;
}

export default function DefaultModal({
  title,
  buttonTextContinue,
  buttonTextLeave,
  body,
  func,
  defaultOpen,
}: Props) {
  console.log(defaultOpen);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(defaultOpen);
    !defaultOpen && onOpen();
  }, [defaultOpen]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {buttonTextLeave}
            </Button>
            <Button
              onClick={() => {
                func && func();
                onClose();
              }}
              variant="ghost">
              {buttonTextContinue}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
