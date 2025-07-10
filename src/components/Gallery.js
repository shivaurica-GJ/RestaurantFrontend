import React, { lazy, Suspense } from 'react';

const Gallery = () => {
  const galleryItems = [
    {
      image: '/images/pizza.jpg',
      title: 'Artisan Pizza'
    },
    {
      image: '/images/noodles.jfif',
      title: 'Asian Noodles'
    },
    {
      image: '/images/burger.jfif',
      title: 'Gourmet Burger'
    },
    {
      image: '/images/sushi.jfif',
      title: 'Fresh Sushi Selection'
    },
    {
      image: '/images/fruit.jpg',
      title: 'Cheese & Fruit Platter'
    },
    {
      image: '/images/kulfi.jpg',
      title: 'Dessert Platter'
    },
    {
      image: '/images/choclate.jfif',
      title: 'Chocolate Truffles'
    },
    {
      image: '/images/Breakfast-board28.jpg',
      title: 'Breakfast Spread'
    },
    {
      image: '/images/indianthali.jpeg',
      title: 'Indian Thali'
    }
  ];

  return (
    <>
      <h2 className="section-title">Our Gallery</h2>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <a 
            key={index} 
            href={process.env.PUBLIC_URL + item.image} 
            data-lightbox="food-gallery" 
            data-title={item.title}
          >
            <div className="gallery-item">
              <img 
                src={process.env.PUBLIC_URL + item.image} 
                alt={item.title} 
                loading="lazy"
                width="300"
                height="250"
              />
              <div className="gallery-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default Gallery; 