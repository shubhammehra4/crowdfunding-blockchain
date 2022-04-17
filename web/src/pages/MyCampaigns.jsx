import {
    Box,
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
  import { format, isAfter } from "date-fns";
  import { useEffect } from "react";
  import { FaEthereum } from "react-icons/fa";
  import { useQuery } from "react-query";
  import { Link as RouterLink } from "react-router-dom";
  import { useGlobalContext } from "../contexts/global";
  import myFund from "../data/myFund";
  import { FundCard } from "./Funds";
  import { FundCardSkeleton } from "./Funds";
  import { EmptyFundList } from "./Funds";
  
  export default function MyCampaigns() {
    const { setFunds, defaultAccount, myFunds } = useGlobalContext();
    const { data: funds, isLoading } = useQuery("myFunds", myFund);

    useEffect(() => {
      if (funds) {
        setFunds(funds);
      }
    }, [funds]);
  
    return (
      <Box my="10" display="flex" justifyContent="center" w="full">
        <Box w="full" maxW="7xl">
          <Heading fontSize="6xl" textAlign="center">
            My Campaigns
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
  