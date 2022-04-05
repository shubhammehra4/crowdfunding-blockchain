import React from "react";
import {
  Box,
  Spacer,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "../styles/FundDetails.css";
import ul_image from '../assets/bulletins.png'; 

export default function FundDetails() {
  const { id } = useParams();

  return (
    <div>
    <div className="fundDetails">

      <div className="leftContainer">
        
      </div>

      <div className="rightContainer">
        <Box
          px={5}
          maxW={"700px"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box mb='3' fontWeight="semibold" as="h4" fontSize="4xl" isTruncated>
            Company Name
          </Box>

          <Box mb='3' color="gray.600">
            by{" "}
            <Box as="span" color="gray.800" fontSize="lg">
              <b> Company CEO </b>
            </Box>
          </Box> 

          <Box color="gray.500" mb='3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum 
          </Box>

          <Flex>
            <img src={ul_image}></img>
            <Box mb='2'>
              Company Website: <a href='https://www.google.com/'> www.google.com </a> 
            </Box>
          </Flex>

          <Flex>
            <Text mb='2'> Goal of X ETH </Text>
            <Spacer />
            <Text> Target of Y ETH </Text>
          </Flex>

          <Progress
            borderRadius="5"
            colorScheme='brand'
            size="sm"
            value={300}
            max={1000}
            mb="4"
          />
          
          <Flex>
            <img src={ul_image}></img>
            <Box alignContent="center" fontSize="lg" mb='3'>
              Minimum contribution of: <span style={{ color: "black" }}> <b> minimum_contribution </b> </span> ETH
            </Box>
          </Flex>
          
          <Flex mb='3'>
            <img src={ul_image}></img>
            <Box alignContent="center" fontSize="lg">
              Number of Contributors: <span style={{ color: "black" }}> <b> Z </b> </span> 
            </Box>
          </Flex>

          <Flex>
            <img src={ul_image}></img>
            <Box alignContent="center" fontSize="lg">
              Deadline: <span style={{ color: "black" }}> <b> deadline </b> </span> days
            </Box>
          </Flex>
        
        </Box>
      </div>
    </div>
    </div>
  );
}
