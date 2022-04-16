import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { format, isAfter } from "date-fns";
import { FaEthereum } from "react-icons/fa";
import { useQuery } from "react-query";
import getFunds from "../data/getFunds";
import { useGlobalContext } from "../contexts/global";
import { useEffect } from "react";

function FundCard({ fund }) {
  const { id, company_name, image_url, description, ceo, goal, minimum_contribution, deadline } =
    fund;
  const isOngoing = isAfter(new Date(deadline), Date.now());

  return (
    <Box
      bg="white"
      boxShadow="xl"
      rounded="lg"
      transition={"transform 0.3s ease"}
      _hover={{ transform: "translateY(-5px)" }}
    >
      <Image
        height="72"
        roundedTop="lg"
        w="full"
        objectFit="cover"
        src={image_url}
        alt={company_name}
      />

      <Box p="4">
        <Flex justifyContent="space-between">
          <RouterLink to={`/fund/${id}`}>
            <Heading fontSize="3xl" _hover={{ textDecoration: "underline" }}>
              {company_name}
            </Heading>
          </RouterLink>
          <Tag colorScheme={isOngoing ? "green" : "orange"} fontWeight="semibold">
            {isOngoing ? "Ongoing" : "Ended"}
          </Tag>
          {/* <Text>{formatDistance(new Date(deadline), new Date(), { addSuffix: true })}</Text> */}
        </Flex>

        <Box color="gray.600">
          by{" "}
          <Text as="span" color="gray.800" fontSize="lg" fontWeight="semibold">
            {ceo}
          </Text>
        </Box>

        <Text mt="3" noOfLines={2} fontSize="lg">
          {description}
        </Text>

        <Stack spacing={4} mt="4" fontSize="lg">
          <Flex justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Text>
                Goal:{" "}
                <Text as="span" fontWeight="semibold">
                  {goal}
                </Text>
              </Text>
              <Icon as={FaEthereum} color="purple.700" />{" "}
            </Box>

            <Box display="flex" alignItems="center">
              <Text>
                Minimum Contribution:{" "}
                <Text as="span" fontWeight="semibold">
                  {minimum_contribution}
                </Text>
              </Text>
              <Icon as={FaEthereum} color="purple.700" />{" "}
            </Box>
          </Flex>

          <Text>
            Deadline:{" "}
            <Text as="span" fontWeight="semibold">
              {format(new Date(deadline), "do MMMM, yyy  - hh:mm aaa")}
            </Text>{" "}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

function FundCardSkeleton() {
  return (
    <Box boxShadow="lg" bg="white" rounded="lg">
      <Skeleton height="72" roundedTop="lg" />
      <Box p="4">
        <Skeleton height="8" mt="4" />
        <SkeletonText mt="6" noOfLines={5} spacing="4" />
      </Box>
    </Box>
  );
}

function EmptyFundList() {
  return (
    <Box my="20">
      <Heading textAlign="center">No Funds found!!</Heading>
    </Box>
  );
}

export default function Funds() {
  const { setFunds } = useGlobalContext();
  const { data: funds, isLoading } = useQuery("funds", getFunds);

  useEffect(() => {
    if (funds) {
      setFunds(funds);
    }
  }, [funds]);

  return (
    <Box my="10" display="flex" justifyContent="center" w="full">
      <Box w="full" maxW="7xl">
        <Heading fontSize="6xl" textAlign="center">
          All Funds
        </Heading>

        {!isLoading && funds.length === 0 && <EmptyFundList />}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} my={10}>
          {isLoading
            ? [...Array(6).keys()].map((idx) => <FundCardSkeleton key={idx} />)
            : funds.map((fund) => <FundCard key={fund.id} fund={fund} />)}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
