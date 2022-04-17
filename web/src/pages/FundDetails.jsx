import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Progress,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { format, formatDistance, isAfter } from "date-fns";
import React from "react";
import { AiFillRightCircle } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import requests from "../assets/mocks/requests.json";
import ContributionModal from "../components/ContributeModal";
import SpendingRequestModal from "../components/SpendingRequestModal";
import { useGlobalContext } from "../contexts/global";
import getFundDeatils from "../contract/fundDetails";
import "../styles/FundDetails.css";

function RequestCard({ id, description, amount }) {
  return (
    <Box
      role={"group"}
      p={6}
      maxW={"550px"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Box mt="5" fontSize="xl">
        <b>Description:</b> {description}
      </Box>

      <Box mt="3" mb="3" fontSize="xl">
        <b> Amount Requested: </b> {amount} ETH
      </Box>

      <Button colorScheme="brand" borderRadius={20} mt="2" maxH={7} justifySelf="end">
        Yes
      </Button>
    </Box>
  );
}

export default function FundDetails() {
  const { contract_address } = useParams();
  const { getFund, defaultAccount } = useGlobalContext();

  const {
    data: fundDetails,
    isLoading,
    refetch,
  } = useQuery(["contract", contract_address], () => getFundDeatils(contract_address));

  const isOwner =
    !isLoading &&
    defaultAccount &&
    defaultAccount.toLowerCase() === fundDetails.owner.toLowerCase();

  const isContributor =
    !isLoading &&
    defaultAccount &&
    fundDetails.contributors?.includes(defaultAccount.toLowerCase());

  if (isLoading) return "Loading...";

  const fund = getFund(contract_address);
  const isOngoing = isAfter(new Date(fund.deadline), Date.now());

  return (
    <>
      {JSON.stringify(fundDetails, null, 2)}
      <Box my="20" display="flex" justifyContent="center">
        <HStack p="5" px="32" spacing="16" alignItems="flex-start">
          <Image
            src={fund.image_url}
            alt={fund.company_name}
            w="450px"
            h="450px"
            objectFit="cover"
            rounded="lg"
            shadow="2xl"
          />

          <Box maxW="xl">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading>{fund.company_name}</Heading>
              <Box>
                <Tag colorScheme={isOngoing ? "green" : "orange"} fontWeight="semibold">
                  {isOngoing ? "Ongoing" : "Ended"}
                </Tag>
              </Box>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Text my="1">
                by{" "}
                <Text as="span" fontWeight="semibold" fontSize="lg">
                  {fund.ceo}
                </Text>
              </Text>
              {isOngoing && (
                <Text>
                  ends {formatDistance(new Date(fund.deadline), new Date(), { addSuffix: true })}
                </Text>
              )}
            </Flex>

            <Flex fontSize="lg" my="3" justifyContent="space-between">
              <Text>
                Raised{" "}
                <Text
                  as="span"
                  fontWeight="semibold"
                  display="inline-flex"
                  gap="1"
                  alignItems="center"
                >
                  {fundDetails.raisedAmount}
                  <Icon as={FaEthereum} color="purple.700" />
                </Text>
              </Text>

              <Text>
                Target is{" "}
                <Text
                  as="span"
                  fontWeight="semibold"
                  display="inline-flex"
                  gap="1"
                  alignItems="center"
                >
                  {fund.goal}
                  <Icon as={FaEthereum} color="purple.700" />
                </Text>
              </Text>
            </Flex>

            <Progress
              borderRadius="5"
              colorScheme="brand"
              size="sm"
              value={fundDetails.raisedAmount}
              max={fund.goal}
              mb="4"
            />

            <Text mt="5" color="gray.700" whiteSpace="pre-wrap">
              {fund.description}
            </Text>

            <List fontSize="lg" mt="3" spacing="2">
              <ListItem>
                <ListIcon as={AiFillRightCircle} color="purple.500" />
                <Link color="brand.700" href={fund.website} isExternal>
                  Company Website <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={AiFillRightCircle} color="purple.500" />
                Minimum Contribution:{" "}
                <Text
                  as="span"
                  fontWeight="semibold"
                  display="inline-flex"
                  gap="1"
                  alignItems="center"
                >
                  {fund.minimum_contribution}
                  <Icon as={FaEthereum} color="purple.700" />
                </Text>
              </ListItem>
              <ListItem>
                <ListIcon as={AiFillRightCircle} color="purple.500" />
                Total Contributors:{" "}
                <Text as="span" fontWeight="semibold">
                  {fundDetails.totalContributors}
                </Text>
              </ListItem>
              <ListItem>
                <ListIcon as={AiFillRightCircle} color="purple.500" />
                Deadline:{" "}
                <Text as="span" fontWeight="semibold">
                  {format(new Date(fund.deadline), "do MMMM, yyy  - hh:mm aaa")}
                </Text>
              </ListItem>
            </List>
          </Box>

          <Box w="lg" maxW="xs">
            {!isOwner && !isContributor && (
              <Box>
                <Flex justifyContent="space-between">
                  <Text fontSize="lg" my="3">
                    Contribute to this Fund
                  </Text>
                  <Tooltip label={"Refresh"}>
                    <IconButton isLoading={isLoading} onClick={refetch} icon={<IoReload />} />
                  </Tooltip>
                </Flex>

                <ContributionModal
                  contract_address={contract_address}
                  contributor_address={defaultAccount}
                  refetch={refetch}
                />
              </Box>
            )}

            {isContributor && (
              <Box>
                <Flex justifyContent="space-between">
                  <Tag textAlign="center" size="lg" colorScheme="green" fontWeight="semibold">
                    You are a Contributor
                  </Tag>
                  <Tooltip label={"Refresh"}>
                    <IconButton isLoading={isLoading} onClick={refetch} icon={<IoReload />} />
                  </Tooltip>
                </Flex>
                <Stack>
                  <Text mt="3" fontSize="lg">
                    You can view Spending Request and Fund reports.
                  </Text>

                  <ContributionModal
                    contract_address={contract_address}
                    contributor_address={defaultAccount}
                    refetch={refetch}
                    label="Contribute More"
                  />
                </Stack>
              </Box>
            )}
            {isOwner && (
              <Box>
                <Flex justifyContent="space-between">
                  <Tag textAlign="center" size="lg" colorScheme="green" fontWeight="semibold">
                    Fund Owner
                  </Tag>
                  <Tooltip label={"Refresh"}>
                    <IconButton isLoading={isLoading} onClick={refetch} icon={<IoReload />} />
                  </Tooltip>
                </Flex>
                <Stack mt="5" spacing="5">
                  <Text fontWeight="semibold" fontSize="lg">
                    Fund Balance:{" "}
                    <Text
                      as="span"
                      fontWeight="semibold"
                      display="inline-flex"
                      gap="1"
                      alignItems="center"
                    >
                      {fundDetails.balance}
                      <Icon as={FaEthereum} color="purple.700" />
                    </Text>
                  </Text>
                  <SpendingRequestModal
                    contract_address={contract_address}
                    owner_address={defaultAccount}
                    balance={fundDetails.balance}
                    refetch={refetch}
                  />
                  <Button colorScheme="twitter">Share Profit</Button>
                  <Button colorScheme="facebook">Share Report</Button>
                </Stack>
              </Box>
            )}
          </Box>
        </HStack>
      </Box>

      <div className="bottomHalf">
        <h1 className="bottomTitle"> Spending Requests </h1>
        <SimpleGrid columns={2} spacing={20}>
          {requests.map((request) => (
            <div key={request.id}>
              <RequestCard
                id={request.id}
                description={request.description}
                amount={request.amount}
              />
            </div>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}
