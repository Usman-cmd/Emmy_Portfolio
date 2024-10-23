import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Exhibition from "./pages/Exhibition";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/" element={<About />} />
        <Route path="/image/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exhibition" element={<Exhibition />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
