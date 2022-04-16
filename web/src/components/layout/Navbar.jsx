import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouteLink } from "react-router-dom";

const Links = [
  { label: "Funds", link: "/funds" },
  { label: "My Campaigns", link: "my-campaigns" },
];

const NavLink = ({ children }) => (
  <Button
    variant="link"
    px={2}
    py={1}
    _hover={{
      textDecoration: "underline",
      color: "rgb(127, 0, 255)",
    }}
  >
    {children}
  </Button>
);

function Navbar() {
  const toast = useToast();
  const [defaultAccount, setDefaultAccount] = useState(undefined);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      toast({
        title: "Install MetaMask",
        description: "Metamask required to conenct to wallet",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        getUserBalance(balance);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  }

  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <Box
      bg="gray.100"
      px="4"
      py="2"
      borderBlockEnd="2px"
      borderBlockEndColor="#7f00ff"
      height="11vh"
    >
      <Flex
        h={16}
        px="6"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack spacing={16} alignItems="center">
          <RouteLink to={"/"}>
            <Heading fontSize={["xl", "2xl", "4xl"]}>Fund Raising</Heading>
          </RouteLink>

          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map(({ label, link }) => (
              <RouteLink to={link} key={link}>
                <NavLink>{label}</NavLink>
              </RouteLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {defaultAccount ? (
            <Tag colorScheme="green" size="lg" borderRadius="full">
              <CheckCircleIcon w={5} h={5} />{" "}
              <Text fontWeight="semibold" px="2">
                Wallet Connected 
              </Text>
            </Tag>
          ) : (
            <Button
              onClick={connectWalletHandler}
              color="white"
              colorScheme="purple"
              fontSize={["sm", "md", "md"]}
              bgGradient="linear(to-br, #7f00ff, #bf40bf)"
              // _hover={{ bgColor: "linear(to-u, #8000ffd7, #bf40bfd7)" }}
              // _focus={{ bgGradient: "linear(to-br, #8000ffd7, #bf40bfd7)" }}
            >
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
