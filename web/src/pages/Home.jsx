import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "7xl" }}>
            <Text
              bgGradient="linear(to-br, #7928CA, #FF0080)"
              bgClip="text"
              as={"span"}
            >
              Fund Raising
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "xl" }} color={"gray.700"}>
            The project board is an exclusive resource for contract work. It's
            perfect for freelancers, agencies, and moonlighters.
          </Text>

          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <RouterLink to="/funds">
              <Button
                bg="purple.600"
                color="white"
                _hover={{
                  bg: "purple.700",
                  textDecoration: "underline",
                }}
              >
                View Opportunities
              </Button>
            </RouterLink>
            <RouterLink to="create-fund">
              <Button _hover={{ textDecoration: "underline" }}>
                Create a Fund
              </Button>
            </RouterLink>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1.5}>
        <Image alt="Hero Image" objectFit="cover" src="/homepage.jpg" />
      </Flex>
    </Stack>
  );
}
