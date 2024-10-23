import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  IconButton,
  useColorMode,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import throttle from "lodash.throttle"; // Ensure you have lodash.throttle installed
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { data } from "../data/data.js"; // Assuming your data is imported from this file

const ProjectDetail = () => {
  const { id } = useParams(); // Get the image ID from the route parameters
  const { colorMode } = useColorMode();
  const subTextColor = { light: "gray.500", dark: "#8892b0" };

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hooks
  const bgColor = useColorModeValue("white", "#0a192f");
  const textColor = useColorModeValue("blue.600", "white");
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(
    parseInt(id, 10) || 0 // Set to 0 if id is not a valid number
  );

  // Separate refs for the main and modal thumbnails
  const thumbnailContainerRef = useRef(null);
  const modalThumbnailContainerRef = useRef(null);

  const navigate = useNavigate();

  // Update the image index and URL
  const updateSelectedImageIndex = (index) => {
    setSelectedImageIndex(index);
    navigate(`/image/${index}`); // Update the URL with the new image index
  };

  // Navigate to the previous image
  const showPreviousImage = useCallback(() => {
    const newIndex =
      selectedImageIndex === 0 ? data.length - 1 : selectedImageIndex - 1;
    updateSelectedImageIndex(newIndex);
  }, [selectedImageIndex]);

  // Navigate to the next image
  const showNextImage = useCallback(() => {
    const newIndex =
      selectedImageIndex === data.length - 1 ? 0 : selectedImageIndex + 1;
    updateSelectedImageIndex(newIndex);
  }, [selectedImageIndex]);

  const toggleEnlargeImage = useCallback(() => {
    setIsEnlarged(!isEnlarged);
    onOpen(); // Open modal when enlarging
  }, [isEnlarged, onOpen]);

  const scrollThumbnailIntoView = useCallback(
    throttle((index, ref) => {
      if (!ref.current) return;
      const thumbnail = ref.current.children[index];
      const containerWidth = ref.current.offsetWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const thumbnailOffsetLeft = thumbnail.offsetLeft;

      // Scroll so the selected thumbnail starts near the beginning of the strip
      ref.current.scrollTo({
        left: thumbnailOffsetLeft - (containerWidth - thumbnailWidth) / 2,
        behavior: "smooth",
      });
    }, 100),
    []
  );

  // Scroll thumbnail into view when the selected image changes in the main view
  useEffect(() => {
    scrollThumbnailIntoView(selectedImageIndex, thumbnailContainerRef);
  }, [selectedImageIndex, scrollThumbnailIntoView]);

  // Scroll thumbnail into view when the selected image changes in the modal view
  useEffect(() => {
    if (isOpen) {
      scrollThumbnailIntoView(selectedImageIndex, modalThumbnailContainerRef);
    }
  }, [selectedImageIndex, isOpen, scrollThumbnailIntoView]);

  // Update the selected image index based on URL parameter
  useEffect(() => {
    const index = parseInt(id, 10);
    if (!isNaN(index) && index >= 0 && index < data.length) {
      setSelectedImageIndex(index);
    }
  }, [id]); // Run this effect when the id from the URL changes

  // Add keyboard navigation for left and right arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      //if (!isOpen) return; // Only handle keyboard events if modal is open

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener when the modal is open
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when the modal is closed
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showPreviousImage, showNextImage, onClose]);

  return (
    <Box
      w="full"
      minH="100vh"
      bg={bgColor}
      color={textColor}
      py={8}
      position="relative"
    >
      <Container maxW="1000px" centerContent>
        <Box
          mb={4}
          w="full"
          textAlign="left"
          display="flex"
          alignItems="center"
        >
          <Heading size="lg" fontWeight="bold" color={textColor}>
            {data[selectedImageIndex]?.name}
          </Heading>
        </Box>

        <IconButton
          aria-label="Enlarge image"
          icon={<FiMaximize2 />}
          onClick={toggleEnlargeImage}
          mb={4}
          alignSelf="flex-start"
          bg="none"
          _hover={{ bg: "none", color: "pink.600" }}
          _focus={{ boxShadow: "none" }}
          color={colorMode === "light" ? "blue.600" : "white"}
          size="lg"
          fontSize="38px"
        />

        <Flex direction={{ base: "column", md: "row" }} align="center" w="full">
          <Box
            w="60%"
            h="400px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Image
              src={data[selectedImageIndex]?.image} // Safely access the image
              alt="Art"
              h="100%"
              objectFit="contain"
            />
          </Box>

          <Box
            w={{ base: "full", md: "30%" }}
            pl={{ base: 0, md: 8 }}
            pt={{ base: 4, md: 0 }}
            overflowY="auto" // Enable vertical scrolling
            h="400px" // Set a fixed height for the description area
            css={{
              /* Custom scrollbar styles */
              "&::-webkit-scrollbar": {
                width: "10px", // Width of the scrollbar
              },
              "&::-webkit-scrollbar-track": {
                background: colorMode === "light" ? "#f1f1f1" : "#1a202c", // Track color
                borderRadius: "10px", // Rounded scrollbar track
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colorMode === "light" ? "#a0aec0" : "#4A5568", // Thumb color
                borderRadius: "10px", // Rounded scrollbar thumb
                border: "2px solid transparent", // Border around the thumb
                backgroundClip: "content-box", // Clip the background to show the border
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: colorMode === "light" ? "#718096" : "#2D3748", // Thumb hover color
              },
            }}
          >
            <Text
              fontSize={{ base: "lg", sm: "lg" }}
              color={subTextColor[colorMode]}
              maxW="800px"
              mb={6}
              mt={4}
            >
              {data[selectedImageIndex]?.description}
            </Text>
          </Box>
        </Flex>

        <Flex
          justify="space-between"
          w="full"
          mb={4}
          position="relative"
          top="50%"
          transform={{ base: "translateY(-1300%)", md: "translateY(-550%)" }}
        >
          <IconButton
            aria-label="Previous image"
            icon={<FiChevronLeft size="48px" />}
            onClick={showPreviousImage} // Only navigate
            bg="none"
            _hover={{ bg: "none", color: "pink.600" }}
            _focus={{ boxShadow: "none" }}
            color={colorMode === "light" ? "blue.600" : "white"}
            size="lg"
            fontSize="38px"
          />
          <IconButton
            aria-label="Next image"
            icon={<FiChevronRight size="48px" />}
            onClick={showNextImage} // Only navigate
            bg="none"
            _hover={{ bg: "none", color: "pink.600" }}
            _focus={{ boxShadow: "none" }}
            color={colorMode === "light" ? "blue.600" : "white"}
            size="lg"
            fontSize="38px"
          />
        </Flex>

        {/* Thumbnail section added here */}
        <Flex
          mt={4}
          overflowX="auto"
          w="full"
          py={4}
          ref={thumbnailContainerRef}
          css={{
            /* Custom scrollbar styles */
            "&::-webkit-scrollbar": {
              height: "10px", // Adjust height for horizontal scrollbar
            },
            "&::-webkit-scrollbar-track": {
              background: colorMode === "light" ? "#f1f1f1" : "#1a202c", // Track color
              borderRadius: "10px", // Rounded scrollbar track
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colorMode === "light" ? "#a0aec0" : "#4A5568", // Thumb color
              borderRadius: "10px", // Rounded scrollbar thumb
              border: "2px solid transparent", // Border around the thumb
              backgroundClip: "content-box", // Clip the background to show the border
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: colorMode === "light" ? "#718096" : "#2D3748", // Thumb hover color
            },
          }}
        >
          {data.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={item.name}
              boxSize="120px"
              loading="lazy"
              objectFit="cover"
              borderRadius="8px"
              boxShadow={
                selectedImageIndex === index
                  ? "0 0 15px rgba(255, 105, 180, 0.7)"
                  : "0 2px 5px rgba(0, 0, 0, 0.2)"
              }
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{
                boxShadow: "0 4px 15px rgba(255, 105, 180, 0.7)",
                transform: "scale(1.1)",
              }}
              mx={2}
              border={selectedImageIndex === index ? "2px solid pink" : "none"}
              cursor="pointer"
              onClick={() => updateSelectedImageIndex(index)}
            />
          ))}
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent bg={colorMode === "light" ? "white" : "#0a192f"}>
            <ModalCloseButton
              size="lg"
              color={colorMode === "light" ? "gray.800" : "white"}
            />
            <ModalBody p={1}>
              <Image
                src={data[selectedImageIndex]?.image}
                alt="Enlarged art"
                w="full"
                h="80vh"
                objectFit="contain"
              />
              <Flex
                mt={4}
                overflowX="auto"
                w="full"
                py={1}
                bg={colorMode === "light" ? "white" : "#0a192f"}
                ref={modalThumbnailContainerRef}
                css={{
                  /* Custom scrollbar styles */
                  "&::-webkit-scrollbar": {
                    height: "10px", // Adjust height for horizontal scrollbar
                  },
                  "&::-webkit-scrollbar-track": {
                    background: colorMode === "light" ? "#f1f1f1" : "#1a202c", // Track color
                    borderRadius: "10px", // Rounded scrollbar track
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor:
                      colorMode === "light" ? "#a0aec0" : "#4A5568", // Thumb color
                    borderRadius: "10px", // Rounded scrollbar thumb
                    border: "2px solid transparent", // Border around the thumb
                    backgroundClip: "content-box", // Clip the background to show the border
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor:
                      colorMode === "light" ? "#718096" : "#2D3748", // Thumb hover color
                  },
                }}
              >
                {data.map((item, index) => (
                  <Image
                    key={index}
                    src={item.image}
                    alt={item.name}
                    boxSize="105px"
                    loading="lazy"
                    objectFit="cover"
                    borderRadius="8px"
                    boxShadow={
                      selectedImageIndex === index
                        ? "0 0 15px rgba(255, 105, 180, 0.7)"
                        : "0 2px 5px rgba(0, 0, 0, 0.2)"
                    }
                    transition="transform 0.3s, box-shadow 0.3s"
                    _hover={{
                      boxShadow: "0 4px 15px rgba(255, 105, 180, 0.7)",
                      transform: "scale(1.1)",
                    }}
                    mx={2}
                    border={
                      selectedImageIndex === index ? "2px solid pink" : "none"
                    }
                    cursor="pointer"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      scrollThumbnailIntoView(
                        index,
                        modalThumbnailContainerRef
                      );
                    }}
                  />
                ))}
              </Flex>

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
                color={colorMode === "light" ? "blue.600" : "white"}
                size="lg"
              />
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
                color={colorMode === "light" ? "blue.600" : "white"}
                size="lg"
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default ProjectDetail;
