import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { data } from "../data/data.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Icons for next/prev buttons
import throttle from "lodash.throttle"; // Add this if not already installed: npm install lodash.throttle

const Work = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#0a192f" };
  const textColor = { light: "gray.800", dark: "gray.300" };
  const shadowColor = { light: "gray.300", dark: "#040c16" };
  const subTextColor = { light: "gray.500", dark: "#8892b0" };
  const headingColor = { light: "blue.600", dark: "white" }; // Highlighted headings

  // State to manage the selected image and modal visibility
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Reference for the thumbnail container
  const thumbnailContainerRef = useRef(null);

  // Optimized click handler with useCallback to avoid re-creation
  const onImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);

    // Scroll to the selected image's thumbnail when opening the modal
    setTimeout(() => {
      scrollThumbnailIntoView(index);
    }, 100); // Add a slight delay to ensure the modal is rendered before scrolling
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedImageIndex(null);
  }, []);

  // Navigate to the previous image
  const showPreviousImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  }, []);

  // Navigate to the next image
  const showNextImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  // Throttled function to scroll the selected thumbnail into view
  const scrollThumbnailIntoView = useCallback(
    throttle((index) => {
      if (!thumbnailContainerRef.current) return;
      const thumbnail = thumbnailContainerRef.current.children[index];
      const containerWidth = thumbnailContainerRef.current.offsetWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const thumbnailOffsetLeft = thumbnail.offsetLeft;

      // Scroll so the selected thumbnail starts near the beginning of the strip
      thumbnailContainerRef.current.scrollTo({
        left: thumbnailOffsetLeft - (containerWidth - thumbnailWidth) / 2,
        behavior: "smooth",
      });
    }, 100),
    []
  );

  // Add keyboard navigation for left and right arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return; // Only handle keyboard events if modal is open

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "Escape") {
        closeModal();
      }
    };

    // Add event listener when the modal is open
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when the modal is closed
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showPreviousImage, showNextImage, closeModal]);

  // Scroll thumbnail into view when the selected image changes
  useEffect(() => {
    if (selectedImageIndex !== null) {
      scrollThumbnailIntoView(selectedImageIndex);
    }
  }, [selectedImageIndex, scrollThumbnailIntoView]);

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
        <Text color="pink.600" fontSize={{ base: "lg", sm: "xl" }}>
          Hi, my name is
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }} // Responsive font sizes
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

        <Text py={11}></Text>

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

        {/* Modal for Enlarged Image */}
        <Modal isOpen={isOpen} onClose={closeModal} size="full">
          <ModalOverlay />
          <ModalContent bg={colorMode === "light" ? "white" : "#0a192f"}>
            <ModalCloseButton
              size="lg"
              color={colorMode === "light" ? "gray.800" : "white"}
            />
            <ModalBody p={0}>
              <Box mt={1} />
              {/* Enlarged Image */}
              <Image
                src={data[selectedImageIndex]?.image}
                alt="Enlarged art"
                w="full"
                h="80vh" // Reduce height to make space for thumbnails
                objectFit="contain"
              />

              {/* Thumbnail strip */}
              <Flex
                mt={1}
                overflowX="auto"
                w="full"
                py={4}
                bg={colorMode === "light" ? "gray.100" : "#0a192f"}
                ref={thumbnailContainerRef} // Assign the ref here
              >
                {data.map((item, index) => (
                  <Image
                    key={index}
                    src={item.image}
                    alt={item.name}
                    boxSize="100px"
                    loading="lazy" // Lazy load thumbnails
                    objectFit="cover"
                    mx={2}
                    border={
                      selectedImageIndex === index ? "2px solid pink" : "none"
                    }
                    cursor="pointer"
                    onClick={() => setSelectedImageIndex(index)}
                    _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
                  />
                ))}
              </Flex>

              {/* Previous Button */}
              <IconButton
                aria-label="Previous image"
                icon={<FiChevronLeft size="48px" />}
                onClick={showPreviousImage}
                position="absolute"
                top="40%"
                left="15px"
                transform="translateY(-50%)"
                bg="none"
                _hover={{ bg: "none", color: "pink.600" }}
                _focus={{ boxShadow: "none" }}
                color={colorMode === "light" ? "gray.800" : "white"}
                size="lg"
                fontSize="48px"
              />

              {/* Next Button */}
              <IconButton
                aria-label="Next image"
                icon={<FiChevronRight size="48px" />}
                onClick={showNextImage}
                position="absolute"
                top="40%"
                right="15px"
                transform="translateY(-50%)"
                bg="none"
                _hover={{ bg: "none", color: "pink.600" }}
                _focus={{ boxShadow: "none" }}
                color={colorMode === "light" ? "gray.800" : "white"}
                size="lg"
                fontSize="48px"
              />
            </ModalBody>
          </ModalContent>
        </Modal>
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
