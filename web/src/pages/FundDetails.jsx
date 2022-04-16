import React, { useMemo } from "react";
import {
  Box,
  Spacer,
  Flex,
  Button,
  SimpleGrid,
  Text,
  Progress,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "../styles/FundDetails.css";
import ul_image from "../assets/bulletins.png";
import requests from "../assets/mocks/requests.json";
import { useGlobalContext } from "../contexts/global";
import { useQuery } from "react-query";
import getFundDeatils from "../contract/fundDetails";
import ContributionModal from "../components/ContributeModal";
import { IoReload } from "react-icons/io5";

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
  const fund = useMemo(() => getFund(contract_address), []);

  const {
    data: fundDetails,
    isLoading,
    refetch,
  } = useQuery(["contract", contract_address], () => getFundDeatils(contract_address));

  if (isLoading) return "Loading...";

  return (
    <div>
      <IconButton isLoading={isLoading} onClick={refetch} icon={<IoReload />} />
      <div className="fundDetails">
        <div className="leftContainer"></div>

        <div className="rightContainer">
          <Box px={5} maxW={"700px"} rounded={"lg"} pos={"relative"} zIndex={1}>
            <Box mb="3" fontWeight="semibold" as="h4" fontSize="4xl" isTruncated>
              Company Name
            </Box>

            <Box mb="3" color="gray.600">
              by{" "}
              <Box as="span" color="gray.800" fontSize="lg">
                <b> Company CEO </b>
              </Box>
            </Box>

            <Box color="gray.500" mb="3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae
              quas vel sint commodi repudiandae consequuntur voluptatum
            </Box>

            <Flex>
              <img src={ul_image}></img>
              <Box mb="2">
                Company Website: <a href="https://www.google.com/"> www.google.com </a>
              </Box>
            </Flex>

            <Flex>
              <Text mb="2"> Goal of X ETH </Text>
              <Spacer />
              <Text> Target of Y ETH </Text>
            </Flex>

            <Progress
              borderRadius="5"
              colorScheme="brand"
              size="sm"
              value={300}
              max={1000}
              mb="4"
            />

            <Flex>
              <img src={ul_image}></img>
              <Box alignContent="center" fontSize="lg" mb="3">
                Minimum contribution of:{" "}
                <span style={{ color: "black" }}>
                  {" "}
                  <b> minimum_contribution </b>{" "}
                </span>{" "}
                ETH
              </Box>
            </Flex>

            <Flex mb="3">
              <img src={ul_image}></img>
              <Box alignContent="center" fontSize="lg">
                Number of Contributors:{" "}
                <span style={{ color: "black" }}>
                  {" "}
                  <b> Z </b>{" "}
                </span>
              </Box>
            </Flex>

            <Flex>
              <img src={ul_image}></img>
              <Box alignContent="center" fontSize="lg">
                Deadline:{" "}
                <span style={{ color: "black" }}>
                  {" "}
                  <b> deadline </b>{" "}
                </span>{" "}
                days
              </Box>
            </Flex>
          </Box>
        </div>
      </div>

      {JSON.stringify(fundDetails, null, 2)}

      {defaultAccount && defaultAccount[0].toLowerCase() !== fundDetails.owner.toLowerCase() && (
        <ContributionModal
          contract_address={contract_address}
          contributor_address={defaultAccount[0]}
          refetch={refetch}
        />
      )}

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
    </div>
  );
}
