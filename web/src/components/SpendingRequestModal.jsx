import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import { number, object, string } from "yup";
import createSpendingRequest from "../contract/spendingRequest";

const spendinRequestValidation = (balance) =>
  object().shape({
    description: string().required("Required"),
    value: number()
      .required("Required")
      .positive("Goal must be greater than 0")
      .max(balance, "Value cannot be greater than fund balance"),
    recipient: string()
      .required("Required")
      .test("address", "Provide a valid address", (address) => ethers.utils.isAddress(address)),
    minimumVotePercent: number()
      .required("Required")
      .min(50, "Minimum Percent must be greater than 50"),
  });

export default function SpendingRequestModal({
  contract_address,
  owner_address,
  refetch,
  balance,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      setIsLoading(true);
      const { description, value, recipient, minimumVotePercent } = data;
      await createSpendingRequest(
        contract_address,
        description,
        recipient,
        value,
        minimumVotePercent
      );

      setIsLoading(false);
      setTimeout(() => {
        refetch();
      }, 5000);
      onClose();
      toast({
        title: "Spending Request Created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      description: "",
      value: "",
      recipient: owner_address,
      minimumVotePercent: 50,
    },
    validationSchema: spendinRequestValidation(balance),
    onSubmit: handleSubmit,
  });

  return (
    <Box w="full">
      <Button w="full" colorScheme="green" onClick={onOpen}>
        Create Spending Request
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Spending Request</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <Stack spacing={5}>
                <FormControl
                  isInvalid={formik.errors.description && formik.touched.description}
                  isRequired
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="description"
                    name="description"
                  />
                  <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={formik.errors.value && formik.touched.value} isRequired>
                  <FormLabel htmlFor="value">Value</FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.value}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      id="value"
                      name="value"
                    />
                    <InputRightElement
                      pointerEvents="none"
                      color="gray.800"
                      children={<Text color="purple.700">ETH</Text>}
                    />
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.value}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.recipient && formik.touched.recipient}
                  isRequired
                >
                  <FormLabel htmlFor="recipient">Recipient</FormLabel>
                  <Input
                    value={formik.values.recipient}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="recipient"
                    name="recipient"
                  />
                  <FormHelperText>Account that recieves the ETH</FormHelperText>
                  <FormErrorMessage>{formik.errors.recipient}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.minimumVotePercent && formik.touched.minimumVotePercent}
                  isRequired
                >
                  <FormLabel htmlFor="minimumVotePercent">Minimum Vote Percent</FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.minimumVotePercent}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="number"
                      id="minimumVotePercent"
                      name="minimumVotePercent"
                    />
                    <InputRightAddon children="%" />
                  </InputGroup>
                  <FormHelperText>Minimum Vote Percent required to approve request</FormHelperText>
                  <FormErrorMessage>{formik.errors.minimumVotePercent}</FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={isLoading} onClick={onClose} mr={3}>
                Close
              </Button>
              <Button isLoading={isLoading} type="submit" colorScheme="green">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
