import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Image,
  useColorMode,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { data } from "../data/data.js"; // Your data
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Work = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "#ffccd5", dark: "#0a192f" };
  const textColor = { light: "#590d22", dark: "gray.300" };
  const headingColor = { light: "blue.600", dark: "white" };
  const subTextColor = { light: "#590d22", dark: "#8892b0" };

  const navigate = useNavigate(); // Hook for navigation

  // Optimized click handler with useCallback to avoid re-creation
  const onImageClick = useCallback(
    (index) => {
      // Navigate to the new page for detailed view
      navigate(`/image/${index}`);
    },
    [navigate]
  );

  return (
    <Box
      name="work"
      w="full"
      minH="100vh"
      bg={bgColor[colorMode]}
      color={colorMode === "light" ? "blue.500" : "white"}
      py={8}
    >
      <Container maxW="1000px" centerContent>
        {/* Heading */}
        <Text
          color="#590d22"
          fontWeight="bold"
          fontSize={{ base: "lg", sm: "xl" }}
        >
          Hi, my name is
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
          fontWeight="bold"
          color={headingColor[colorMode]}
          mb={2}
        >
          Emmy
        </Heading>
        <Text
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight="bold"
          color={subTextColor[colorMode]}
          maxW="700px"
          mb={4}
        >
          I'm an Artist and I’m thrilled to share my creative journey with you.
        </Text>

        {/* Grid for Art Projects */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={6}
          w="full"
        >
          {data.map((item, index) => (
            <MemoizedThumbnail
              key={index}
              item={item}
              onClick={() => onImageClick(index)}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Memoized component for thumbnails
const MemoizedThumbnail = React.memo(({ item, onClick }) => (
  <Flex
    bgImage={`url(${item.image})`}
    bgSize="cover"
    bgPos="center"
    shadow="lg"
    borderRadius="md"
    w="full"
    h="300px"
    align="center"
    justify="center"
    boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
    _hover={{
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
      transform: "scale(1.05)",
    }}
    transition="all 0.3s ease"
    cursor="pointer"
    onClick={onClick}
  >
    <Flex
      w="full"
      h="full"
      bg="rgba(0, 0, 0, 0.7)"
      align="center"
      justify="center"
      direction="column"
      opacity={0}
      _hover={{ opacity: 1 }}
      transition="opacity 0.3s ease-in-out"
    >
      <Heading
        fontSize="2xl"
        color="white"
        textAlign="center"
        textShadow="0 2px 4px rgba(0, 0, 0, 0.8)"
      >
        {item.name}
      </Heading>
    </Flex>
  </Flex>
));

export default Work;
