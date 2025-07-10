import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import "../styles/About.css";

const About = () => {
  const chefs = [
    {
      name: "Chef Rajesh Kumar",
      title: "Executive Chef",
      image: "./images/rajeshkumar.jfif",
      description:
        "With over 20 years of experience in traditional Indian cuisine, Chef Rajesh brings authentic flavors from various regions of India.",
      social: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "Chef Priya Sharma",
      title: "Dessert Specialist",
      image: "./images/priyaSharma.jfif",
      description:
        "A master of Indian sweets and desserts, Chef Priya combines traditional recipes with modern presentations.",
      social: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "Chef Amit Patel",
      title: "Sous Chef",
      image: "./images/amitpatel.jfif",
      description:
        "Specializing in regional Indian cuisines, Chef Amit brings diverse flavors from across India.",
      social: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const zoomIn = (delay = 0) => ({
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay },
    },
  });

  return (
    <div className="about-section" id="about">
      <Container>
        <motion.h2
          className="about-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Story
        </motion.h2>

        <div className="story-section">
          <div className="circle-decoration top-left"></div>
          <div className="circle-decoration bottom-right"></div>

          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <motion.img
                src="/images/res.webp"
                alt="Restaurant Ambiance"
                className="story-image"
                loading="lazy"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </Col>
            <Col xs={12} md={6}>
              <motion.div
                className="story-content"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="story-text">
                  Founded in 2020, Shiv Aurica emerged from a passion for
                  authentic Indian cuisine. Our journey began with age-old
                  family recipes passed down through generations, combining
                  traditional flavors with modern culinary techniques.
                </p>
                <p className="story-text">
                  We take pride in serving dishes that not only tantalize your
                  taste buds but also tell a story of our rich culinary
                  heritage. Every meal at Shiv Aurica is crafted with love,
                  using the finest ingredients and time-honored cooking methods.
                </p>
              </motion.div>
            </Col>
          </Row>
        </div>

        <div className="values-section">
          <motion.h3
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Values
          </motion.h3>

          <Row className="g-4">
            <Col xs={12} md={4}>
              <motion.div
                className="value-card"
                variants={zoomIn(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h4>Authenticity</h4>
                <p>
                  We stay true to traditional recipes while adding our unique
                  modern touch.
                </p>
              </motion.div>
            </Col>
            <Col xs={12} md={4}>
              <motion.div
                className="value-card"
                variants={zoomIn(0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h4>Quality</h4>
                <p>
                  We use only the finest ingredients to ensure exceptional taste
                  and quality.
                </p>
              </motion.div>
            </Col>
            <Col xs={12} md={4}>
              <motion.div
                className="value-card"
                variants={zoomIn(0.4)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h4>Service</h4>
                <p>
                  We believe in creating memorable dining experiences for our
                  guests.
                </p>
              </motion.div>
            </Col>
          </Row>
        </div>

        <div className="chefs-section">
          <div className="spice-decoration spice-1"></div>
          <div className="spice-decoration spice-2"></div>
          <div className="spice-decoration spice-3"></div>
          <div className="spice-decoration spice-4"></div>

          <motion.h3
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Meet Our Chefs
          </motion.h3>

          <Row className="g-4">
            {chefs.map((chef, index) => (
              <Col key={index} xs={12} md={4}>
                <motion.div
                  className="chef-card"
                  variants={zoomIn(index * 0.2)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="experience-badge">{chef.experience}</div>
                  <div className="chef-image-container">
                    <img
                      src={chef.image}
                      alt={`${chef.name} - ${chef.title}`}
                      className="chef-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="chef-content">
                    <h4 className="chef-name">{chef.name}</h4>
                    <h5 className="chef-title">{chef.title}</h5>
                    <p className="chef-description">{chef.description}</p>
                    <div className="chef-social">
                      <a
                        href={chef.social.facebook}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        href={chef.social.instagram}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href={chef.social.twitter}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={chef.social.linkedin}
                        className="social-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default About;
