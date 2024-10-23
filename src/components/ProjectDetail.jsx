import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
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
import throttle from "lodash.throttle";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { data } from "../data/data.js";

const ProjectDetail = () => {
  const { id } = useParams();
  const { colorMode } = useColorMode();
  const subTextColor = useMemo(
    () => ({ light: "#590d22", dark: "#8892b0" }),
    []
  );
  const lightGradient =
    "linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225))";
  const darkGradient =
    "linear-gradient(109.6deg, rgb(6, 2, 2) 32.4%, rgb(137, 30, 47) 98.8%)";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue(lightGradient, darkGradient);
  const textColor = useColorModeValue("blue.700", "white");
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(
    parseInt(id, 10) || 0
  );

  const thumbnailContainerRef = useRef(null);
  const modalThumbnailContainerRef = useRef(null);
  const navigate = useNavigate();

  // Memoized callback to update the selected image index and URL
  const updateSelectedImageIndex = useCallback(
    (index) => {
      setSelectedImageIndex(index);
      navigate(`/image/${index}`);
    },
    [navigate]
  );

  const showPreviousImage = useCallback(() => {
    const newIndex =
      selectedImageIndex === 0 ? data.length - 1 : selectedImageIndex - 1;
    updateSelectedImageIndex(newIndex);
  }, [selectedImageIndex, updateSelectedImageIndex]);

  const showNextImage = useCallback(() => {
    const newIndex =
      selectedImageIndex === data.length - 1 ? 0 : selectedImageIndex + 1;
    updateSelectedImageIndex(newIndex);
  }, [selectedImageIndex, updateSelectedImageIndex]);

  const toggleEnlargeImage = useCallback(() => {
    setIsEnlarged((prevState) => !prevState);
    onOpen();
  }, [onOpen]);

  const scrollThumbnailIntoView = useMemo(
    () =>
      throttle((index, ref) => {
        if (!ref.current) return;
        const thumbnail = ref.current.children[index];
        const containerWidth = ref.current.offsetWidth;
        const thumbnailWidth = thumbnail.offsetWidth;
        const thumbnailOffsetLeft = thumbnail.offsetLeft;

        ref.current.scrollTo({
          left: thumbnailOffsetLeft - (containerWidth - thumbnailWidth) / 2,
          behavior: "smooth",
        });
      }, 50), // Reduced delay for smoother interaction
    []
  );

  useEffect(() => {
    scrollThumbnailIntoView(selectedImageIndex, thumbnailContainerRef);
  }, [selectedImageIndex, scrollThumbnailIntoView]);

  useEffect(() => {
    if (isOpen) {
      scrollThumbnailIntoView(selectedImageIndex, modalThumbnailContainerRef);
    }
  }, [selectedImageIndex, isOpen, scrollThumbnailIntoView]);

  useEffect(() => {
    const index = parseInt(id, 10);
    if (!isNaN(index) && index >= 0 && index < data.length) {
      setSelectedImageIndex(index);
    }
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showPreviousImage, showNextImage, onClose]);

  // Memoized list of data to prevent unnecessary recalculations
  const imageData = useMemo(() => data, []);

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
            {imageData[selectedImageIndex]?.name}
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
          color={colorMode === "light" ? "blue.700" : "white"}
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
              src={imageData[selectedImageIndex]?.image}
              alt="Art"
              h="100%"
              objectFit="contain"
              loading="lazy"
            />
          </Box>

          <Box
            w={{ base: "full", md: "30%" }}
            pl={{ base: 0, md: 8 }}
            pt={{ base: 4, md: 0 }}
            overflowY="auto"
            h="400px"
            css={{
              "&::-webkit-scrollbar": { width: "10px" },
              "&::-webkit-scrollbar-track": {
                background: colorMode === "light" ? "#f1f1f1" : "#1a202c",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colorMode === "light" ? "#a0aec0" : "#4A5568",
                borderRadius: "10px",
                border: "2px solid transparent",
                backgroundClip: "content-box",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: colorMode === "light" ? "#718096" : "#2D3748",
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
              {imageData[selectedImageIndex]?.description}
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
            onClick={showPreviousImage}
            bg="none"
            _hover={{ bg: "none", color: "pink.600" }}
            _focus={{ boxShadow: "none" }}
            color={colorMode === "light" ? "blue.700" : "white"}
            size="lg"
            fontSize="38px"
          />
          <IconButton
            aria-label="Next image"
            icon={<FiChevronRight size="48px" />}
            onClick={showNextImage}
            bg="none"
            _hover={{ bg: "none", color: "pink.600" }}
            _focus={{ boxShadow: "none" }}
            color={colorMode === "light" ? "blue.700" : "white"}
            size="lg"
            fontSize="38px"
          />
        </Flex>

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
          <ModalContent bg={bgColor} color={textColor}>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />
            <ModalBody>
              <Box
                w="full"
                h="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={imageData[selectedImageIndex]?.image}
                  alt="Enlarged Image"
                  h="80vh"
                  objectFit="contain"
                  loading="lazy"
                />
              </Box>

              <Flex
                mt={4}
                overflowX="auto"
                w="full"
                py={1}
                bg={colorMode === "light" ? lightGradient : darkGradient}
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
                      updateSelectedImageIndex(index);
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
                color={colorMode === "light" ? "blue.700" : "white"}
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
                color={colorMode === "light" ? "blue.700" : "white"}
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
