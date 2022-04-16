import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import contribute from "../contract/contribute";

export default function ContributionModal({ contract_address, contributor_address, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const amountRef = useRef();

  async function handleSubmission(e) {
    e.preventDefault();
    try {
      console.log("hello");
      setIsLoading(true);
      const amount = Number(amountRef.current.value);
      await contribute(contract_address, contributor_address, amount);

      setIsLoading(false);
      setTimeout(() => {
        console.log("Calling");
        refetch();
      }, 5000);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <Box>
      <Button onClick={onOpen}>Contribute</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contribute</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmission}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="amount">Amount</FormLabel>

                <InputGroup>
                  <Input type="number" id="amount" name="amount" ref={amountRef} />
                  <InputRightElement
                    pointerEvents="none"
                    color="gray.800"
                    children={<Text color="purple.700">ETH</Text>}
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={isLoading} onClick={onClose} mr={3}>
                Close
              </Button>
              <Button isLoading={isLoading} type="submit" colorScheme="green">
                Contribute
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
