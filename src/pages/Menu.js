import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Menu.css";

// Animation variants
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const zoomIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Memoized MenuItem component for better performance
const MenuItem = memo(({ image, title, description, price }) => (
  <motion.div
    variants={zoomIn}
    whileHover={{
      y: -5,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    }}
    className="menu-item"
  >
    <img src={image} alt={title} loading="lazy" width="300" height="200" />
    <h4>{title}</h4>
    <p>{description}</p>
    <span className="price">{price}</span>
  </motion.div>
));

const Menu = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);

  const carouselItems = [
    {
      image: "/images/fulldish.jpg",
      title: "Popular Dishes",
      description: "Discover our most loved Indian delicacies",
    },
    {
      image: "/images/vegetarian.avif",
      title: "Vegetarian Specials",
      description: "Pure vegetarian dishes made with love",
    },
    {
      image: "/images/chef Vaibhav with dishes.JPG",
      title: "Chef's Specials",
      description: "Handcrafted dishes by our expert chefs",
    },
  ];

  const appetizers = [
    {
      image: "./images/samosa-7180078_1280.jpg",
      title: "Samosa",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: "₹80",
    },
    {
      image: "/images/paneer-7043097_1280.jpg",
      title: "Paneer Tikka",
      description: "Grilled cottage cheese with spices and vegetables",
      price: "₹250",
    },
    {
      image: "/images/Dahi-Vada-H1.webp",
      title: "Dahi Bhalla",
      description: "Lentil dumplings in spiced yogurt sauce",
      price: "₹150",
    },
  ];

  const mainCourse = [
    {
      image: "/images/Kaju-Masala.jpg",
      title: "Butter Kaju",
      description: "Tender  in rich tomato-butter gravy",
      price: "₹350",
    },
    {
      image: "/images/dal-makhani7.webp",
      title: "Dal Makhani",
      description: "Black lentils cooked overnight with cream",
      price: "₹280",
    },
    {
      image: "/images/paneer-7043097_1280.jpg",
      title: "Palak Paneer",
      description: "Cottage cheese cubes in spinach gravy",
      price: "₹300",
    },
  ];

  const breadsAndRice = [
    {
      image: "/images/naan.jpg",
      title: "Assorted Naan",
      description: "Butter, Garlic, or Plain Naan bread baked in tandoor",
      price: "₹60",
    },
    {
      image: "/images/biryani.jpg",
      title: "Hyderabadi Biryani",
      description: "Fragrant basmati rice cooked with aromatic spices",
      price: "₹380",
    },
    {
      image: "/images/amritsari-kulcha-1.jpg",
      title: "Amritsari Kulcha",
      description: "Stuffed bread with spiced potatoes or paneer",
      price: "₹90",
    },
  ];

  const desserts = [
    {
      image: "/images/gulab-jamun.jpg",
      title: "Gulab Jamun",
      description: "Soft milk dumplings in sweet rose-flavored syrup",
      price: "₹150",
    },
    {
      image: "/images/Rasmalai.jpg",
      title: "Rasmalai",
      description: "Soft cottage cheese patties in creamy saffron milk",
      price: "₹180",
    },
    {
      image: "/images/Gajar-Halwa-Indian.webp",
      title: "Gajar Ka Halwa",
      description: "Traditional carrot pudding with nuts and cardamom",
      price: "₹200",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setActiveSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="menu-container">
      <motion.h2
        className="section-title"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Our Menu
      </motion.h2>

      <motion.div
        className="menu-carousel"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="carousel-inner">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="carousel-item active"
            >
              <img
                src={carouselItems[activeSlide].image}
                alt={carouselItems[activeSlide].title}
                loading={activeSlide === 0 ? "eager" : "lazy"}
                width="800"
                height="400"
              />
              <motion.div
                className="carousel-caption"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3>{carouselItems[activeSlide].title}</h3>
                <p>{carouselItems[activeSlide].description}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.button
          className="carousel-prev"
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          &lt;
        </motion.button>
        <motion.button
          className="carousel-next"
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          &gt;
        </motion.button>
      </motion.div>

      <motion.div
        className="menu-category"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h3>Appetizers</h3>
        <motion.div
          className="menu-items"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {appetizers.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="menu-category"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h3>Main Course</h3>
        <motion.div
          className="menu-items"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {mainCourse.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="menu-category"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h3>Breads & Rice</h3>
        <motion.div
          className="menu-items"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {breadsAndRice.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="menu-category"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h3>Desserts</h3>
        <motion.div
          className="menu-items"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {desserts.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Menu;
