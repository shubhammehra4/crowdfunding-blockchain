import {
  Box,
  Button,
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { date, number, object, string } from "yup";
import Thumbnail from "../components/Thumbnail";
import { useGlobalContext } from "../contexts/global";
import deployContarct from "../contract/deploy";
import server from "../utils/axios";
import { getWei } from "../utils/currency";

const initialValues = {
  company_name: "",
  imageUrl: "",
  description: "",
  website: "",
  ceo: "",
  goal: "",
  minimumContribution: "",
  deadline: new Date(),
};

const createFundValidation = object().shape({
  company_name: string().required("Required"),
  imageUrl: string().url(),
  description: string().required("Required"),
  website: string().url("Link should be valid").nullable(),
  ceo: string().required("Required"),
  goal: number().required("Required").positive("Goal must be greater than 0"),
  minimumContribution: number()
    .required("Required")
    .positive("Minimum Contribution must be greater than 0"),
  deadline: date().default(() => new Date()),
});

const CreateFund = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { refetchFunds } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);
      const deadline = new Date(data.deadline).getTime();
      const { contract_address, owner_address } = await deployContarct(
        deadline,
        getWei(data.goal),
        getWei(data.minimumContribution)
      );

      await server({
        url: "/companies",
        method: "POST",
        data: {
          ...data,
          minimum_contribution: data.minimumContribution,
          image_url: data.imageUrl,
          deadline: new Date(data.deadline).toString(),
          contract_address,
          owner_address,
        },
      });
      setIsLoading(false);
      toast({
        title: "Campaign successfully created!!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      refetchFunds();
      navigate("/funds");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: createFundValidation,
    onSubmit: handleSubmit,
  });

  const [preview, setPreview] = useState(undefined);
  const handleUpload = useCallback((event) => {
    const file = event.currentTarget.files[0];
    setPreview(file);

    const url = "https://api.cloudinary.com/v1_1/shubhamiiitp/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "scixegdc");

    fetch(url, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => formik.setFieldValue("imageUrl", data.secure_url));
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" py="6" spacing={10} mb="50px">
      <Heading>Create a Fund Raising Campaign</Heading>

      <Box w="full" maxW="3xl">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4} justifyContent="center" alignItems="center">
            <Flex w="full" justifyContent="center" alignItems="center" gap="5">
              <FormControl
                w="36"
                isInvalid={formik.errors.imageUrl && formik.touched.imageUrl}
                isRequired
              >
                <FormLabel htmlFor="logo" textAlign="center" cursor="pointer">
                  <Thumbnail file={preview} />
                  Logo
                </FormLabel>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                />

                <FormErrorMessage>{formik.errors.imageUrl}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={formik.touched.company_name && formik.errors.company_name}
              >
                <FormLabel htmlFor="company_name">Company Name</FormLabel>
                <Input
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="company_name"
                  name="company_name"
                  placeholder="What's your company called?"
                />
                <FormErrorMessage>{formik.errors.company_name}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl
              isRequired
              isInvalid={formik.errors.description && formik.touched.description}
            >
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="description"
                name="description"
                placeholder="Describe why you need the funds"
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>

            <HStack spacing={5} alignItems="flex-start" w="full">
              <FormControl isRequired isInvalid={formik.errors.ceo && formik.touched.ceo}>
                <FormLabel htmlFor="ceo">CEO</FormLabel>
                <Input
                  value={formik.values.ceo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="ceo"
                  name="ceo"
                  placeholder="Name"
                />
                <FormErrorMessage>{formik.errors.ceo}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.website && formik.touched.website}>
                <FormLabel htmlFor="website">Company Website</FormLabel>
                <Input
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="website"
                  name="website"
                  placeholder="Link to company's website"
                />
                <FormErrorMessage>{formik.errors.website}</FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack spacing={5} alignItems="flex-start" w="full">
              <FormControl isRequired isInvalid={formik.errors.goal && formik.touched.goal}>
                <FormLabel htmlFor="goal">Fund Goal</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    value={formik.values.goal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                isRequired
                isInvalid={formik.errors.minimumContribution && formik.touched.minimumContribution}
              >
                <FormLabel htmlFor="minimumContribution">Minimum Contribution</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    value={formik.values.minimumContribution}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="minimumContribution"
                    name="minimumContribution"
                  />
                  <InputRightElement
                    pointerEvents="none"
                    color="gray.800"
                    children={<Text color="purple.700">ETH</Text>}
                  />
                </InputGroup>

                <FormErrorMessage>{formik.errors.minimumContribution}</FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl isInvalid={formik.errors.deadline && formik.touched.deadline}>
              <FormLabel htmlFor="deadline">Campaign Deadline</FormLabel>
              <Input
                type="datetime-local"
                value={formik.values.deadline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="deadline"
                name="deadline"
              />
              <FormErrorMessage>{formik.errors.deadline}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="purple" w="md" isLoading={isLoading}>
              Create Fund
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};
export default CreateFund;
