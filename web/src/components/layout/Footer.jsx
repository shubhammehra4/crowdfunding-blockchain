import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Heading,
  HStack,
  Button,
  SimpleGrid
} from "@chakra-ui/react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import "../../styles/footer.css";
import { Link as RouteLink, useMatch, useResolvedPath } from "react-router-dom";

const Links = [
  { label: "Funds", link: "/funds" },
  { label: "My Campaigns", link: "/my-campaigns" },
  { label: "Create Campaign", link: "create-fund" },
];

const NavLink = ({ children, to }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <RouteLink to={to}>
      <Button
        variant="link"
        px={2}
        py={1}
        textDecoration={match ? "underline" : "none"}
        color={match ? "brand.700" : "gray.500"}
        _hover={{
          textDecoration: "underline",
          color: "brand.700",
        }}
      >
        {children}
      </Button>
    </RouteLink>
  );
};

function Footer() {
  return (
    <Box
      borderBlockStart="2px"
      borderBlockStartColor="#7f00ff"
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={4} spacing={4} justify={"center"} align={"center"}>
        <Heading fontSize={["xl", "2xl", "4xl"]}>Fund Raising</Heading>
        <HStack as={"nav"} spacing={10} display={{ base: "none", md: "flex" }} pl="10px">
          {Links.map(({ label, link }) => (
            <NavLink to={link} key={link}>
              {label}
            </NavLink>
          ))}
        </HStack>
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
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }}>
            <Stack align={'flex-start'}>
              <Text fontWeight={'500'} fontSize="20px">
                Developed by :
              </Text>
              <Stack direction={"row"}>
                <Text> 1) Shubham Mehra </Text>
                <AiFillLinkedin size="21px"/>
                <AiFillInstagram size="21px" />      
              </Stack>
              <Stack direction={"row"}>
                <Text> 2) Nishit Sharma </Text>
                <AiFillLinkedin size="21px"/>
                <AiFillInstagram size="21px" />               
              </Stack>
              <Stack direction={"row"}>
                <Text> 3) Soham Chaudhuri </Text>
                <AiFillLinkedin size="21px"/> 
                <AiFillInstagram size="21px" />     
              </Stack>
              <Stack direction={"row"}>
                <Text> 4) Saksham Mahajan </Text>
                <AiFillLinkedin size="21px"/> 
                <AiFillInstagram size="21px" />      
              </Stack>
            </Stack>
          </SimpleGrid>

          <Stack direction={"row"} spacing={8}>
            <AiFillGithub size="35px"/>
            <BsGlobe size="35px"/>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
