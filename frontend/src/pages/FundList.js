import React from "react";
import FundDetails from "../assets/mocks/cards.json";
import "../styles/FundList.css";
import { Link } from "react-router-dom";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Box,
  Divider,
  Skeleton,
  Img,
  Icon,
  chakra,
  Tooltip,
  SkeletonCircle,
  HStack,
  Stack,
  Progress,
} from "@chakra-ui/react";

function FundCard({
  id,
  company_name,
  company_image,
  description,
  website,
  ceo,
  goal,
  minimum_contribution,
  deadline,
  owner_address,
  contract_adress,
}) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      maxW={{ md: "sm" }}
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      transition={"transform 0.3s ease"}
      _hover={{
        transform: "translateY(-8px)",
      }}
    >
      <Box height="18em">
        <Img
          src={company_image}
          alt={`Picture of ${company_name}`}
          roundedTop="lg"
          objectFit="cover"
          w="full"
          h="full"
          display="block"
        />
      </Box>
      <Box p="6">
        <Flex justifyContent="space-between" alignContent="center" py={2}>
          <Box
            fontSize="3xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {company_name}
          </Box>

          {/* <Tooltip
            label="Contribute"
            bg={useColorModeValue("white", "gray.700")}
            placement={"top"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"1.2em"}
          >
            <chakra.a display={"flex"}>
              <Icon h={7} w={7} alignSelf={"center"} color={"teal.400"} />{" "}
            </chakra.a>
          </Tooltip> */}
        </Flex>
        <Text fontSize="xl" color={"gray.500"} pr={2}>
          by <b>{ceo}</b>
        </Text>
        <Flex alignContent="center" py={2}>
          <Text color={"gray.500"} pr={2}>
            Goal of
          </Text>
          <Heading size="base" isTruncated>
            {goal} ETH
          </Heading>
        </Flex>
      </Box>
    </Box>
  );
}

export default function CardList() {
  return (
    <div className="allFunds">
      <h1 className="fundTitle"> All Funds </h1>
      <div className="cardList">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
          {FundDetails.map((card) => (
            <div key={card.id}>
              <Link to={`/fund/${card.id}`}>
                <FundCard
                  id={card.id}
                  company_name={card.company_name}
                  company_image={card.company_image}
                  description={card.description}
                  website={card.website}
                  ceo={card.ceo}
                  goal={card.goal}
                  minimum_contribution={card.minimum_contribution}
                  deadline={card.deadline}
                  owner_address={card.owner_address}
                  contract_adress={card.contract_adress}
                />
              </Link>
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
