import React from "react";
import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import "../../styles/footer.css";

function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={4} spacing={4} justify={"center"} align={"center"}>
        <h1> LOGO </h1>
        <Stack direction={"row"} spacing={6}>
          <Link href={"#"}> Home </Link>
          <Link href={"#"}> Contact </Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text> Team-Mates </Text>
          <Stack direction={"row"} spacing={6}>
            <AiFillGithub />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
