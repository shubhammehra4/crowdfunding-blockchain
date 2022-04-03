import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function FundDetails() {
  const { id } = useParams();

  return (
    <div>
      <Center py={6}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src="https://www.google.com/search?q=image&rlz=1C1CHBD_enIN900IN900&sxsrf=APq-WBt5nGpwPpdKnM56wR3BE9L7YlLFNA:1648992495350&tbm=isch&source=iu&ictx=1&vet=1&fir=nH5liarSz56duM%252C0JWe7yDOKrVFAM%252C_%253Bn5hAWsQ-sgKo_M%252C-UStXW0dQEx4SM%252C_%253BDH7p1w2o_fIU8M%252CBa_eiczVaD9-zM%252C_%253Bz4_uU0QB2pe-SM%252C7SySw5zvOgPYAM%252C_%253BxE4uU8uoFN00aM%252CpEU77tdqT8sGCM%252C_%253BMOAYgJU89sFKnM%252CygIoihldBPn-LM%252C_%253B2DNOEjVi-CBaYM%252CAOz9-XMe1ixZJM%252C_%253BqXynBYpZpHkhWM%252C4O2GvGuD-Cf09M%252C_%253B0DzWhtJoQ1KWgM%252CcIQ7wXCEtJiOWM%252C_%253BbDjlNH-20Ukm8M%252CG9GbNX6HcZ2O_M%252C_%253B0oRviLGatf-4aM%252CG9GbNX6HcZ2O_M%252C_%253BgOUAFhrbQ2nYQM%252COXvyXJop1qSGqM%252C_&usg=AI4_-kRu-tKBdePLaICaM9xhqwaqc-XzOQ&sa=X&ved=2ahUKEwjtwLDf__f2AhX673MBHTaHA8cQ9QF6BAgDEAE&cshid=1648992519592782#imgrc=nH5liarSz56duM"
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Hello
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
              bg={useColorModeValue("#151f21", "gray.900")}
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

      <div>
        <h1> Current Fund ID is: {id} </h1>
      </div>
    </div>
  );
}
