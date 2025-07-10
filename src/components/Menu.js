import React, { useState, useEffect, memo } from 'react';
import '../styles/Menu.css'; // We'll create this file next

// Memoized MenuItem component for better performance
const MenuItem = memo(({ image, title, description, price }) => (
  <div className="menu-item">
    <img 
      src={'/images/amritsari-kulcha-1.jpg'} 
      alt={title} 
      loading="lazy"
      width="300"
      height="200"
    />
    <h4>{title}</h4>
    <p>{description}</p>
    <span className="price">{price}</span>
  </div>
));

const Menu = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselItems = [
    {
      image: '/images/fulldish.jpg',
      title: 'Popular Dishes',
      description: 'Discover our most loved Indian delicacies'
    },
    {
      image: '/images/vegetarian.avif',
      title: 'Vegetarian Specials',
      description: 'Pure vegetarian dishes made with love'
    },
    {
      image: '/images/chef Vaibhav with dishes.JPG',
      title: "Chef's Specials",
      description: 'Handcrafted dishes by our expert chefs'
    }
  ];

  const appetizers = [
    {
      image: '/images/samosa-7180078_1280.jpg',
      title: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes, peas, and aromatic Indian spices',
      price: '₹120'
    },
    {
      image: '/images/paneer-7043097_1280.jpg',
      title: 'Paneer Tikka',
      description: 'Marinated cottage cheese cubes grilled with bell peppers and Indian spices',
      price: '₹250'
    },
    {
      image: '/images/Dahi-Vada-H1.webp',
      title: 'Dahi Bhalla',
      description: 'Lentil dumplings in yogurt with tangy tamarind chutney',
      price: '₹180'
    },
    {
      image: '/images/panipuri.jfif',
      title: 'Pani Puri',
      description: 'Crispy hollow puris filled with spicy mint water and potato mixture',
      price: '₹150'
    }
  ];

  const mainCourse = [
    {
      image: '/images/pannerbuttermasala.jpg',
      title: 'Paneer Butter Masala',
      description: 'Cottage cheese in rich tomato gravy',
      price: '₹380'
    },
    {
      image: '/images/malai-kofta.webp',
      title: 'Malai Kofta',
      description: 'Vegetable and cheese dumplings in creamy gravy',
      price: '₹360'
    },
    {
      image: '/images/chhole.webp',
      title: 'Chole Bhature',
      description: 'Spiced chickpeas with deep-fried bread',
      price: '₹280'
    },
    {
      image: '/images/biryani.jpg',
      title: 'Veg Biryani',
      description: 'Aromatic rice with mixed vegetables and spices',
      price: '₹320'
    }
  ];

  const breadsAndRice = [
    {
      image: '/images/naan.jpg',
      title: 'Assorted Naan',
      description: 'Butter, Garlic, or Plain Naan bread baked in tandoor',
      price: '₹60'
    },
    {
      image: '/images/biryani.jpg',
      title: 'Hyderabadi Biryani',
      description: 'Fragrant basmati rice cooked with aromatic spices',
      price: '₹380'
    },
    {
      image: '/images/amritsari-kulcha-1.jpg',
      title: 'Amritsari Kulcha',
      description: 'Stuffed bread with spiced potatoes or paneer',
      price: '₹90'
    }
  ];

  const desserts = [
    {
      image: '/images/gulab-jamun.jpg',
      title: 'Gulab Jamun',
      description: 'Soft milk dumplings in sweet rose-flavored syrup',
      price: '₹150'
    },
    {
      image: '/images/Rasmalai.jpg',
      title: 'Rasmalai',
      description: 'Soft cottage cheese patties in creamy saffron milk',
      price: '₹180'
    },
    {
      image: '/images/Gajar-Halwa-Indian.webp',
      title: 'Gajar Ka Halwa',
      description: 'Traditional carrot pudding with nuts and cardamom',
      price: '₹200'
    },
    {
      image: '/images/kulfi.jpg',
      title: 'Malai Kulfi',
      description: 'Traditional Indian ice cream with pistachios',
      price: '₹140'
    }
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
    setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <>
      <h2 className="section-title">Our Menu</h2>
      
      <div className="menu-carousel">
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div 
              key={index} 
              className={`carousel-item ${index === activeSlide ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
              style={{
                transform: `translateX(${(index - activeSlide) * 100}%)`
              }}
            >
              <img 
                src={process.env.PUBLIC_URL + item.image} 
                alt={item.title}
                loading={index === 0 ? "eager" : "lazy"}
                width="800"
                height="400"
              />
              <div className="carousel-caption">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-prev" onClick={prevSlide}>&lt;</button>
        <button className="carousel-next" onClick={nextSlide}>&gt;</button>
      </div>

      <div className="menu-container">
        <div className="menu-category">
          <h3>Appetizers</h3>
          <div className="menu-items">
            {appetizers.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="menu-category">
          <h3>Main Course</h3>
          <div className="menu-items">
            {mainCourse.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="menu-category">
          <h3>Breads & Rice</h3>
          <div className="menu-items">
            {breadsAndRice.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="menu-category">
          <h3>Desserts</h3>
          <div className="menu-items">
            {desserts.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu; 