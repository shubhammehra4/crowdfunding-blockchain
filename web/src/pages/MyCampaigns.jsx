import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useGlobalContext } from "../contexts/global";
import { EmptyFundList, FundCard, FundCardSkeleton } from "./Funds";

export default function MyCampaigns() {
  const { myFunds, isLoading } = useGlobalContext();
  const funds = myFunds();

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
