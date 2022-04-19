import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import shareReport from "../contract/shareReport";

export default function ShareReport({ contract_address, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const linkRef = useRef();

  async function handleSubmission(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const link = linkRef.current.value;
      await shareReport(contract_address, link);

      setIsLoading(false);
      setTimeout(() => {
        refetch();
      }, 5000);

      toast({
        title: "Successfully shared report",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <Box w="full">
      <Button w="full" colorScheme="facebook" onClick={onOpen}>
        Share Report
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Report</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmission}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="link">Link to report</FormLabel>
                <Input type="url" id="link" name="link" ref={linkRef} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={isLoading} onClick={onClose} mr={3}>
                Close
              </Button>
              <Button isLoading={isLoading} type="submit" colorScheme="green">
                Share
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
