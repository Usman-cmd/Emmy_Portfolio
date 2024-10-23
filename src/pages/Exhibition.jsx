import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

import { HiArrowNarrowRight } from "react-icons/hi";

import exhibitionImage from "../assets/exhibition/Exhibition.png"; // Replace with your actual exhibition image

const Exhibition = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "#ffccd5", dark: "#0a192f" }; // Softer background for contrast
  const headingColor = { light: "blue.600", dark: "white" }; // Highlighted headings
  const textColor = { light: "gray.800", dark: "gray.300" };
  const subTextColor = { light: "#590d22", dark: "#8892b0" };
  const buttonBgColor = { light: "gray.800", dark: "whiteAlpha.200" };
  const buttonTextColor = { light: "white", dark: "white" };
  const buttonBorderColor = { light: "gray.800", dark: "white" };

  return (
    <Box
      name="exhibition"
      w="full"
      minH="100vh"
      bg={bgColor[colorMode]}
      pt={{ base: "24px", sm: "48px" }} // Top padding
      pb={{ base: "40px", sm: "60px" }} // Bottom padding for spacing
    >
      <Container maxW="container.xl" mx="auto" px={8}>
        {/* Exhibition Picture */}

        <Flex flexDir="column" alignItems="center" textAlign="center">
          {/* Exhibition Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
            fontWeight="bold"
            color={headingColor[colorMode]}
            mb={4}
          >
            Utah Queer Spectra Art Festival{" "}
          </Heading>

          {/* Exhibition Description */}
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={subTextColor[colorMode]}
            maxW="800px"
            mb={6}
          >
            The Utah Queer Spectra Art Festival is an annual event celebrating
            LGBTQ+ art and culture in Utah. It typically features a diverse
            array of artistic expressions, including visual art, performance,
            music, and workshops. The festival aims to create a space for queer
            artists to showcase their work, foster community, and promote
            dialogue around LGBTQ+ issues. It often includes collaborations with
            local organizations and offers opportunities for networking and
            engagement among artists and attendees. If you're interested in the
            arts or queer culture, it's a vibrant event worth checking out!
          </Text>

          <Flex justifyContent="center" mb={8}>
            <Image
              borderRadius="lg"
              boxSize={{ base: "full", md: "700px" }}
              src={exhibitionImage} // Replace with your actual exhibition image URL
              alt="Exhibition display"
              border="4px solid"
              borderColor={{ light: "blue.600", dark: "pink.600" }[colorMode]}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Exhibition;
