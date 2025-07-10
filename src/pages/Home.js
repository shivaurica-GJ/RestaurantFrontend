import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Chatboticon from "../components/Chatboticon";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/Home.css";

const galleryItems = [
  {
    image: "/images/IMG-20250528-WA0026.jpg",
    title: "Exquisite Cuisine",
    description: "Experience our carefully crafted dishes",
  },
  {
    image: "/images/IMG-20250528-WA0028.jpg",
    title: "Perfect Ambiance",
    description: "Dine in our elegant atmosphere",
  },
  {
    image: "/images/IMG-20250528-WA0030.jpg",
    title: "Memorable Experience",
    description: "Create lasting memories with us",
  },
];

// Animation variants
const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const zoomInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="logo-section">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <div className="logo-container">
            <div className="logo-aura" />
            <img
              src="/images/4789379-removebg-preview.png"
              alt="Restaurant Logo"
              className="logo-image"
            />
          </div>
          <div className="title-container">
            <h1 className="restaurant-title">Discover A New</h1>
            <h1 className="restaurant-title">Level of Taste</h1>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <Container fluid="xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <Row className="g-4">
              {galleryItems.map((item, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <motion.div
                    variants={zoomInVariants}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    className="image-card"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-overlay" />
                    <div className="card-content">
                      <h4 className="card-title">{item.title}</h4>
                      <p className="card-description">{item.description}</p>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Utilities */}
      <ScrollToTop />
      <Chatboticon />
    </div>
  );
};

export default Home;
