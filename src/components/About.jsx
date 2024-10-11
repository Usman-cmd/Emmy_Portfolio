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
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

import { HiArrowNarrowRight } from "react-icons/hi";

import profile from "../assets/profile/profile.jpg";

const About = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "#fafafa", dark: "#0a192f" }; // Softer background for contrast
  const headingColor = { light: "blue.600", dark: "white" }; // Highlighted headings
  const textColor = { light: "gray.800", dark: "gray.300" };
  const subTextColor = { light: "gray.500", dark: "#8892b0" };
  const buttonBgColor = { light: "gray.800", dark: "whiteAlpha.200" };
  const buttonTextColor = { light: "white", dark: "white" };
  const buttonBorderColor = { light: "gray.800", dark: "white" };

  return (
    <Box
      name="about"
      w="full"
      minH="100vh"
      bg={bgColor[colorMode]}
      pt={{ base: "24px", sm: "48px" }} // Top padding
      pb={{ base: "40px", sm: "60px" }} // Bottom padding for spacing
    >
      <Container maxW="container.xl" mx="auto" px={8}>
        {/* Profile Picture */}
        <Flex justifyContent="center" mb={8}>
          <Box
            position="relative"
            borderRadius="full"
            boxSize={{ base: "150px", sm: "200px", md: "250px" }} // Responsive sizing
            overflow="hidden"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)" // Soft shadow for depth
          >
            <Image
              src={profile}
              alt="Emmy's profile"
              w="100%"
              h="100%"
              objectFit="cover"
            />
            {/* Adding a decorative border using a pseudo element */}
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              borderRadius="full"
              border="4px solid"
              borderColor={colorMode === "light" ? "blue.600" : "pink.600"} // Gradient based on color mode
              boxShadow="0 0 20px rgba(255, 105, 135, 0.3)" // Subtle glow effect
              zIndex={1}
            />
          </Box>
        </Flex>

        <Flex flexDir="column" alignItems="center" textAlign="center">
          {/* Introduction Section */}
          <Text color="pink.600" fontSize={{ base: "lg", sm: "xl" }}>
            Welcome, I'm Emmy!
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
            fontWeight="bold"
            color={headingColor[colorMode]}
            mb={4}
          >
            Artist and Creative Storyteller
          </Heading>

          {/* Personal Story */}
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={subTextColor[colorMode]}
            maxW="800px"
            mb={6}
          >
            During my childhood on a military base, I was exposed to a dynamic
            environment that profoundly shaped my identity over the years.
            Initially, I dreamed of becoming an artist, but my passion soon
            shifted toward animals. This enduring interest led me to eagerly
            sign up for a veterinary boot camp in ninth grade, where I first
            encountered agriculture through my school’s FFA chapter.
          </Text>

          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={subTextColor[colorMode]}
            maxW="800px"
            mb={6}
          >
            Competing in Veterinary Science competitions sparked a deeper
            enthusiasm for the field. In my sophomore year, I joined the Science
            Olympiad team, diving into events like herpetology, ornithology, and
            water quality, which further fueled my love for ecology. My journey
            continued with an internship at the Utah Veterinary Diagnostics Lab,
            where I learned the immense potential of scientific tools and took a
            proactive approach to my education.
          </Text>

          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={subTextColor[colorMode]}
            maxW="800px"
            mb={6}
          >
            As I pursued my passion for science, I also grappled with the biases
            surrounding my identity as a queer woman. I often felt out of place
            in a field dominated by heterosexual males, but my connection to
            biology transcends any such challenges. My love for science and my
            commitment to inclusivity drive me to carve out my space in this
            field.
          </Text>

          {/* Call to Action Button */}
          <Box mt={6}>
            <Button
              as={RouterLink} // Use RouterLink from react-router-dom
              to="/work" // Link to the /work route
              //bg={buttonBgColor[colorMode]}
              //color={buttonTextColor[colorMode]}
              //border="2px"
              variant="outline"
              //borderColor={buttonBorderColor[colorMode]}
              colorScheme="pink"
              _hover={{
                bg: "pink.600",
                color: "white",
                borderColor: "pink.600",
              }}
              fontSize={{ base: "sm", md: "md" }} // Responsive font size
              px={6} // Adjust horizontal padding
              py={3} // Adjust vertical padding
              my={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              View Work
              <span className="ml-3">
                <HiArrowNarrowRight />
              </span>
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default About;
