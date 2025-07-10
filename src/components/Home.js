import React from 'react';
import Chatboticon from './Chatboticon';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <header>
        <div className="logo">
          <div className="logo-icon">
            <img src={process.env.PUBLIC_URL + '/images/4789379-removebg-preview.png'} alt="Silver Kitchen Logo" />
          </div>
          <div className="logo-text">
            <h1>DISCOVER A NEW LEVEL OF TASTE</h1>
            
          </div>
        </div>
        <div>
          <ScrollToTop />
          <Chatboticon/>
        </div>
        
        
      </header>

      <div className="divider"></div>
      <div className="food-gallery">
        <div className="gallery-item">
          <img src={process.env.PUBLIC_URL + '/images/IMG-20250528-WA0026.jpg'} alt="Delicious Dish" />
        </div>
        <div className="gallery-item">
          <img src={process.env.PUBLIC_URL + '/images/IMG-20250528-WA0028.jpg'} alt="Gourmet Meal" />
        </div>
        <div className="gallery-item">
          <img src={process.env.PUBLIC_URL + '/images/IMG-20250528-WA0030.jpg'} alt="Special Dish" />
        </div>
      </div>
      <div className="divider"></div>

      <Footer />
    </>
  );
};

export default Home; 