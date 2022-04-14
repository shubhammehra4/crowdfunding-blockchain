import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouteLink } from "react-router-dom";

const Links = [
  { label: "Funds", link: "/funds" },
  { label: "My Investments", link: "my-investments" },
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    _hover={{
      textDecoration: "none",
      color: "rgb(127, 0, 255)",
    }}
  >
    {children}
  </Link>
);

function Navbar() {
  // const [isConnected, setIsConnected] = useState(false);

  // const onLogin = () => {
  //   setIsConnected(true);
  // };

  // const onLogout = () => {
  //   setIsConnected(false);
  // };

  // const detectProvider = () => {
  //   let provider;
  //   if (window.ethereum) {
  //     provider = window.ethereum;
  //   } else if (window.web3) {
  //     provider = window.web3.currentProvider;
  //   } else {
  //     window.alert("No Ethereum browser detected!");
  //   }
  //   return provider;
  // };

  // const onLoginHandler = async () => {
  //   const provider = detectProvider();
  //   if (provider) {
  //     if (provider !== window.ethereum) {
  //       console.error("Not window.ethereum provider.");
  //     }
  //     await provider.request({
  //       method: "eth_requestAccounts",
  //     });
  //     onLogin();
  //   }
  // };

  const [defaultAccount, setDefaultAccount] = useState(undefined);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        getUserBalance(balance);
      });
  };

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

          <HStack as={"nav"} pl="300px" spacing={4} display={{ base: "none", md: "flex"}} fontSize="20px">
            {Links.map(({ label, link }) => (
              <RouteLink to={link}>
                <NavLink key={link}>{label}</NavLink>
              </RouteLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {defaultAccount ? (
            <Tag colorScheme="green" size="lg" borderRadius="full">
              <CheckCircleIcon w={5} h={5} />{" "}
              <Text fontWeight="semibold" px="2">
                Wallet Connected{" "}
              </Text>
            </Tag>
          ) : (
            <Button
              onClick={connectWalletHandler}
              color="white"
              fontSize={["sm", "md", "md"]}
              bgGradient="linear(to-br, #7f00ff, #bf40bf)"
              _hover={{
                bgGradient: "linear(to-br, #8000ffd7, #bf40bfd7)",
              }}
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
