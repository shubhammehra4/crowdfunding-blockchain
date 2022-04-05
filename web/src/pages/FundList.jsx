import {
  Box,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import FundDetails from "../assets/mocks/cards.json";
import "../styles/FundList.css";

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
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      transition={"transform 0.3s ease"}
      _hover={{
        transform: "translateY(-5px)",
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

      <Box mt="5" fontWeight="semibold" as="h4" fontSize="3xl" isTruncated>
        {company_name}
      </Box>

      <Box color="gray.600">
        by{" "}
        <Box as="span" color="gray.800" fontSize="lg">
          <b> {ceo} </b>
        </Box>
      </Box>
      
       <Box>
          Goal of: <span style={{ color: "black" }}> <b> {goal} </b> </span> ETH
      </Box>

      <Box alignContent="center" fontSize="lg">
          Minimum contribution of: <span style={{ color: "black" }}> <b> {minimum_contribution} </b> </span> ETH
      </Box>

      <Box alignContent="center" fontSize="lg">
          Deadline: <span style={{ color: "black" }}> <b> {deadline} </b> </span> days
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

// import {
//   Box,
//   Center,
//   useColorModeValue,
//   Heading,
//   Text,
//   Stack,
//   Image,
// } from '@chakra-ui/react';

// const IMAGE =
//   'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

// export default function ProductSimple() {
//   return (
//     <Center py={12}>
//       <Box
//         role={'group'}
//         p={6}
//         maxW={'330px'}
//         w={'full'}
//         bg={useColorModeValue('white', 'gray.800')}
//         boxShadow={'2xl'}
//         rounded={'lg'}
//         pos={'relative'}
//         zIndex={1}>
//         <Box
//           rounded={'lg'}
//           mt={-12}
//           pos={'relative'}
//           height={'230px'}
//           _after={{
//             transition: 'all .3s ease',
//             content: '""',
//             w: 'full',
//             h: 'full',
//             pos: 'absolute',
//             top: 5,
//             left: 0,
//             backgroundImage: `url(${IMAGE})`,
//             filter: 'blur(15px)',
//             zIndex: -1,
//           }}
//           _groupHover={{
//             _after: {
//               filter: 'blur(20px)',
//             },
//           }}>
//           <Image
//             rounded={'lg'}
//             height={230}
//             width={282}
//             objectFit={'cover'}
//             src={IMAGE}
//           />
//         </Box>
//         <Stack pt={10} align={'center'}>
//           <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
//             Brand
//           </Text>
//           <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
//             Nice Chair, pink
//           </Heading>
//           <Stack direction={'row'} align={'center'}>
//             <Text fontWeight={800} fontSize={'xl'}>
//               $57
//             </Text>
//             <Text textDecoration={'line-through'} color={'gray.600'}>
//               $199
//             </Text>
//           </Stack>
//         </Stack>
//       </Box>
//     </Center>
//   );
// }
