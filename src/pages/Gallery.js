import React, { useState } from "react";
import { Box, Container, Grid, Typography, Tabs, Tab } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { motion } from "framer-motion";

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shine = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const MenuContainer = styled(Box)({
  backgroundColor: "#FFF5EE",
  padding: "4rem 0",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(139, 0, 0, 0.05) 0%, rgba(255, 245, 238, 0) 100%)",
    zIndex: 1,
  },
});

const MenuTitle = styled(Typography)({
  color: "#8B0000",
  textAlign: "center",
  marginBottom: "3rem",
  position: "relative",
  fontWeight: "bold",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -16,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "4px",
    background: "linear-gradient(90deg, transparent, #8B0000, transparent)",
  },
});

const MenuCard = styled(Box)({
  position: "relative",
  borderRadius: "15px",
  overflow: "hidden",
  height: "350px",
  boxShadow: "0 10px 20px rgba(139, 0, 0, 0.1)",
  transition: "all 0.5s ease",
  cursor: "pointer",
  backgroundColor: "#FFF",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(139, 0, 0, 0.2)",
    "& .menu-image": {
      transform: "scale(1.1)",
    },
    "&::before": {
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "200%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 245, 238, 0.2), transparent)",
    animation: `${shine} 3s linear infinite`,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 2,
  },
});

const MenuImage = styled("img")({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  transition: "transform 0.5s ease",
});

const MenuContent = styled(Box)({
  padding: "1.5rem",
  position: "relative",
  zIndex: 1,
});

const StyledTabs = styled(Tabs)({
  marginBottom: "2rem",
  "& .MuiTabs-indicator": {
    backgroundColor: "#8B0000",
  },
  "& .MuiTab-root": {
    color: "#666",
    "&.Mui-selected": {
      color: "#8B0000",
      fontWeight: "bold",
    },
  },
});

const Price = styled(Typography)({
  color: "#8B0000",
  fontWeight: "bold",
  position: "absolute",
  bottom: "1rem",
  right: "1.5rem",
});

const FloatingDecoration = styled(Box)({
  position: "absolute",
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(139, 0, 0, 0.1) 0%, rgba(139, 0, 0, 0) 70%)",
  animation: `${float} 6s ease-in-out infinite`,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Menu = () => {
  const [currentCategory, setCurrentCategory] = useState(0);

  const menuCategories = ["Main Course", "Appetizers", "Desserts", "Beverages"];

  const menuItems = {
    "Main Course": [
      {
        img: "/images/food1.jpg",
        title: "Butter Chicken",
        description: "Tender chicken in rich tomato-butter gravy",
        price: "₹350",
      },
      {
        img: "/images/food2.jpg",
        title: "Paneer Tikka Masala",
        description: "Grilled cottage cheese in spiced gravy",
        price: "₹300",
      },
      {
        img: "/images/food3.jpg",
        title: "Biryani Special",
        description: "Fragrant rice with choice of meat/vegetables",
        price: "₹400",
      },
    ],
    Appetizers: [
      {
        img: "/images/food4.jpg",
        title: "Samosa Platter",
        description: "Crispy pastry with spiced potato filling",
        price: "₹150",
      },
      {
        img: "/images/food5.jpg",
        title: "Tandoori Kebabs",
        description: "Assorted grilled kebabs from clay oven",
        price: "₹450",
      },
      {
        img: "/images/food6.jpg",
        title: "Chaat Corner",
        description: "Street food favorites with tangy chutneys",
        price: "₹200",
      },
    ],
    Desserts: [
      {
        img: "/images/food7.jpg",
        title: "Gulab Jamun",
        description: "Sweet milk dumplings in sugar syrup",
        price: "₹120",
      },
      {
        img: "/images/food8.jpg",
        title: "Rasmalai",
        description: "Soft cottage cheese in saffron milk",
        price: "₹150",
      },
      {
        img: "/images/food9.jpg",
        title: "Kulfi Falooda",
        description: "Traditional Indian ice cream with vermicelli",
        price: "₹180",
      },
    ],
    Beverages: [
      {
        img: "/images/lassi.jpg",
        title: "Lassi",
        description: "Traditional yogurt-based drink",
        price: "₹100",
      },
      {
        img: "/images/masalachai.jpg",
        title: "Masala Chai",
        description: "Spiced Indian tea with milk",
        price: "₹60",
      },
      {
        img: "/images/mocktails.jpg",
        title: "Signature Mocktails",
        description: "Refreshing non-alcoholic beverages",
        price: "₹150",
      },
    ],
  };

  const handleCategoryChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  return (
    <MenuContainer>
      <FloatingDecoration sx={{ top: "10%", left: "5%" }} />
      <FloatingDecoration sx={{ top: "60%", right: "5%" }} />
      <FloatingDecoration sx={{ bottom: "10%", left: "15%" }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <MenuTitle variant="h2">Our Menu</MenuTitle>
        </motion.div>

        <StyledTabs
          value={currentCategory}
          onChange={handleCategoryChange}
          centered
          variant="scrollable"
          scrollButtons="auto"
        >
          {menuCategories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </StyledTabs>

        <Grid container spacing={3}>
          {menuItems[menuCategories[currentCategory]].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true }}
              >
                <MenuCard>
                  <MenuImage
                    src={item.img}
                    alt={item.title}
                    className="menu-image"
                  />
                  <MenuContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#8B0000", fontWeight: "bold", mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                      {item.description}
                    </Typography>
                    <Price variant="h6">{item.price}</Price>
                  </MenuContent>
                </MenuCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MenuContainer>
  );
};

export default Menu;
