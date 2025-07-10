import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Throttle scroll event handler
  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Check scroll position and update visibility
  const toggleVisibility = useCallback(() => {
    try {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrolled > 300);
    } catch (error) {
      console.error('Error checking scroll position:', error);
    }
  }, []);

  // Smooth scroll to top function with error handling
  const scrollToTop = (e) => {
    e.preventDefault();
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
      console.error('Smooth scroll not supported:', error);
    }
  };

  // Add scroll event listener with throttling
  useEffect(() => {
    const throttledToggleVisibility = throttle(toggleVisibility, 200);

    window.addEventListener('scroll', throttledToggleVisibility);

    // Initial check
    toggleVisibility();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop; 