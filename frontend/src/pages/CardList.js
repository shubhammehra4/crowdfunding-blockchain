import React from "react";
import CardDetails from "../assets/mocks/cards.json";
import Card from "../components/Card";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";

export default function CardList() {
  return (
    <div>
      {CardDetails.map((card) => (
        <div className="card" key={card.id}>
          <Center py={6}>
            <Box
              maxW={"270px"}
              w={"full"}
              //   bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={card.company_image}
                  alt={"Author"}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {card.company_name}
                  </Heading>
                  <Text color={"gray.500"}>Frontend Developer</Text>
                </Stack>

                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                </Stack>

                <Button
                  w={"full"}
                  mt={8}
                  //   bg={useColorModeValue("#151f21", "gray.900")}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Follow
                </Button>
              </Box>
            </Box>
          </Center>
        </div>
      ))}
    </div>
  );
}
