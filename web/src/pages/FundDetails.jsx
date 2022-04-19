import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
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
  UnorderedList,
} from "@chakra-ui/react";
import { format, formatDistance, isAfter } from "date-fns";
import React from "react";
import { AiFillCheckCircle, AiFillRightCircle } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ContributionModal from "../components/ContributeModal";
import ShareProfitModal from "../components/ShareProfitModal";
import ShareReport from "../components/ShareReport";
import SpendingRequestModal from "../components/SpendingRequestModal";
import { useGlobalContext } from "../contexts/global";
import getFundDeatils from "../contract/fundDetails";
import voteForRequest from "../contract/vote";
import withdraw from "../contract/withdraw";

function RequestCard({
  idx,
  contract_address,
  description,
  value,
  recipient,
  isOwner,
  minimumVotePercent,
  voters,
  completed,
  defaultAccount,
  progress,
}) {
  async function handleVote() {
    await voteForRequest(contract_address, idx);
  }

  async function handleWithdraw() {
    await withdraw(contract_address, idx);
  }

  const hasVoted = voters.includes(defaultAccount);
  const canWithDraw = Math.floor(progress * 100) > minimumVotePercent;

  return (
    <Box
      py="5"
      px="3"
      backgroundColor="white"
      boxShadow="2xl"
      bg="gray.50"
      rounded="lg"
      fontSize="lg"
      maxW="xl"
    >
      <Flex justifyContent="space-between">
        <Text fontWeight="semibold" fontSize="xl">
          Description
        </Text>
        <Tag variant="solid" colorScheme={completed ? "green" : "orange"}>
          {completed ? "Complete" : "Pending"}
        </Tag>
      </Flex>

      <Text mt="2">{description}</Text>

      <Text as="span" fontWeight="semibold" display="inline-flex" gap="1" alignItems="center">
        Amount Requested: {value}
        <Icon as={FaEthereum} color="purple.700" />
      </Text>
      <Text fontWeight="semibold" mt="2">
        Recipient Account:{" "}
        <Tag as="span" colorScheme="green" fontWeight="semibold">
          {recipient}
        </Tag>
      </Text>

      {!completed &&
        (isOwner ? (
          <Box mt="5">
            {!completed && (
              <>
                <Flex justifyContent="space-between" fontWeight="semibold" fontSize="lg" my="2">
                  <Text>Vote: {(progress * 100).toFixed(2)}%</Text>
                  <Text>Required atleast {minimumVotePercent}%</Text>
                </Flex>
                <Progress
                  borderRadius="5"
                  colorScheme="brand"
                  size="sm"
                  value={(progress * 100).toFixed(2)}
                  max={100}
                  mb="4"
                />
                <Button
                  isDisabled={!canWithDraw}
                  onClick={handleWithdraw}
                  colorScheme="green"
                  rounded="lg"
                >
                  Withdaw
                </Button>
              </>
            )}
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap="3" mt="5">
            <Button
              colorScheme="brand"
              rounded="lg"
              onClick={handleVote}
              leftIcon={<AiFillCheckCircle />}
              isDisabled={Boolean(hasVoted)}
            >
              {hasVoted ? "Voted!" : "Vote Yes"}
            </Button>
          </Box>
        ))}
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
      {/* {JSON.stringify(fundDetails, null, 2)} */}
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

                <ContributionModal contract_address={contract_address} refetch={refetch} />
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
                    refetch={refetch}
                    label="Contribute More"
                  />
                </Stack>

                <Box mt="5">
                  <Text fontSize="lg" fontWeight="semibold">
                    Shared Reports
                  </Text>
                  {fundDetails.sharedReports.length === 0 ? (
                    <Text>No reports Shared</Text>
                  ) : (
                    <UnorderedList mt="3">
                      {fundDetails.sharedReports.map((report) => (
                        <ListItem>
                          <Flex justifyContent="space-between">
                            <Link color="purple.800" href={report.link} isExternal>
                              {report.link}
                            </Link>
                            <Text>{report.date}</Text>
                          </Flex>
                        </ListItem>
                      ))}
                    </UnorderedList>
                  )}
                </Box>
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
                  <ShareProfitModal contract_address={contract_address} refetch={refetch} />
                  <ShareReport contract_address={contract_address} refetch={refetch} />
                </Stack>
              </Box>
            )}
          </Box>
        </HStack>
      </Box>

      {(isContributor || isOwner) && (
        <Box px="32" my="10" mb="20">
          <Heading textAlign="center" my="5">
            Spending Request
          </Heading>
          {fundDetails.spendingRequests.length > 0 ? (
            <SimpleGrid columns={2} spacing={10}>
              {fundDetails.spendingRequests.map((request, idx) => (
                <RequestCard
                  key={idx}
                  idx={idx}
                  contract_address={contract_address}
                  {...request}
                  progress={request.voteAmount / fundDetails.raisedAmount}
                  isOwner={isOwner}
                  defaultAccount={defaultAccount}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Center my="20">
              <Heading fontSize="lg">No Spending Requests</Heading>
            </Center>
          )}
        </Box>
      )}
    </>
  );
}
