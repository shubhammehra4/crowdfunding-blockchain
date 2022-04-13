import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

const initialValues = {
  title: "",
  descrription: "",
  website: "",
  ownerName: "",
  ownerEmail: "",
  goal: 0,
  deadline: new Date(),
};

const CreateFund = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (data) => console.log(data),
  });

  return (
    <Stack justifyContent="center" alignItems="center" py="6" spacing={10}>
      <Heading>Create a Fund Raising Campaign</Heading>

      <Box w="full" maxW="3xl">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4} justifyContent="center" alignItems="center">
            <FormControl
              isRequired
              isInvalid={formik.errors.title && formik.touched.title}
            >
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                value={formik.values.title}
                onChange={formik.handleChange}
                id="title"
                name="title"
                placeholder="What's your company called?"
              />
              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                formik.errors.descrription && formik.touched.descrription
              }
            >
              <FormLabel htmlFor="descrription">Description</FormLabel>
              <Textarea
                value={formik.values.descrription}
                onChange={formik.handleChange}
                id="descrription"
                name="descrription"
                placeholder="Describe why you need the funds"
              />
              <FormErrorMessage>{formik.errors.descrription}</FormErrorMessage>
            </FormControl>

            <HStack spacing={5} alignItems="flex-start" w="full">
              <FormControl
                isRequired
                isInvalid={formik.errors.ownerName && formik.touched.ownerName}
              >
                <FormLabel htmlFor="ownerName">CEO</FormLabel>
                <Input
                  value={formik.values.ownerName}
                  onChange={formik.handleChange}
                  id="ownerName"
                  name="ownerName"
                  placeholder="Name"
                />
                <FormErrorMessage>{formik.errors.ownerName}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  formik.errors.ownerEmail && formik.touched.ownerEmail
                }
              >
                <FormLabel htmlFor="ownerEmail">Company Email</FormLabel>
                <Input
                  value={formik.values.ownerEmail}
                  onChange={formik.handleChange}
                  id="ownerEmail"
                  name="ownerEmail"
                  placeholder="Email"
                />
                <FormErrorMessage>{formik.errors.ownerEmail}</FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack spacing={5} alignItems="flex-start" w="full">
              <FormControl
                isRequired
                isInvalid={formik.errors.goal && formik.touched.goal}
              >
                <FormLabel htmlFor="goal">Fund Goal</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    value={formik.values.goal}
                    onChange={formik.handleChange}
                    id="goal"
                    name="goal"
                  />
                  <InputRightElement
                    pointerEvents="none"
                    color="gray.800"
                    children={<Text color="purple.700">ETH</Text>}
                  />
                </InputGroup>

                <FormErrorMessage>{formik.errors.goal}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.website && formik.touched.website}
              >
                <FormLabel htmlFor="website">Company Website</FormLabel>
                <Input
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  id="website"
                  name="website"
                  placeholder="Link to company's website"
                />
                <FormErrorMessage>{formik.errors.website}</FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl
              isInvalid={formik.errors.deadline && formik.touched.deadline}
            >
              <FormLabel htmlFor="deadline">Campaign Deadline</FormLabel>
              <Input
                type="datetime-local"
                value={formik.values.deadline}
                onChange={formik.handleChange}
                id="deadline"
                name="deadline"
              />
              <FormErrorMessage>{formik.errors.deadline}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="purple" w="md">
              Create Fund
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};
export default CreateFund;
