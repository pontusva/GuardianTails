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
import { useEffect, useRef } from 'react';

interface Props {
  // userChosenLocation: unknown[];
  result: unknown[] | undefined;
}

export default function MapConfirmLocationModal({ result }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    result && result.length > 0 && inputRef.current && inputRef.current.click();
  }, [result]);
  return (
    <>
      <div className="hidden">
        <Button ref={inputRef} onClick={onOpen}>
          Open Modal
        </Button>
      </div>
      {isOpen && result && result.length > 0 && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Välj området som passar dig bäst</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {result && result.map((item: any) => <p>{item.place_name}</p>)}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
