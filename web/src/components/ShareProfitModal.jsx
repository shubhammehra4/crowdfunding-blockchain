import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import shareProfit from "../contract/shareProfit";

export default function ShareProfitModal({ contract_address, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const amountRef = useRef();

  async function handleSubmission(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const amount = Number(amountRef.current.value);
      await shareProfit(contract_address, amount);

      setIsLoading(false);
      setTimeout(() => {
        refetch();
      }, 5000);

      toast({
        title: "Successfully shared profit",
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
      <Button w="full" colorScheme="twitter" onClick={onOpen}>
        Share Profit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Profit</ModalHeader>
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
                Share
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
