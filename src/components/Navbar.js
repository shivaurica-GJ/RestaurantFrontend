import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  // Handle scroll for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);

      // Handle active section
      if (location.pathname === '/') {
        const sections = ['menu', 'about'];
        let currentSection = '';

        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = section;
            }
          }
        });

        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [location.pathname]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  // Define scrollToSection function
  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Helper function to determine if a link is active
  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !activeSection;
    }
    if (path.startsWith('#')) {
      return activeSection === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">Shiv Aurica</div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={isLinkActive('/') ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Home
          </Link>
          <a 
            href="#menu" 
            className={isLinkActive('#menu') ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('menu');
            }}
          >
            Menu
          </a>
          <a 
            href="#about" 
            className={isLinkActive('#about') ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            About
          </a>
          <Link 
            to="/contact" 
            className={isLinkActive('/contact') ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link 
            to="/order" 
            className={isLinkActive('/order') ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Order
          </Link>
          <Link 
            to="/login" 
            className={isLinkActive('/login') ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      {/* Overlay for mobile menu */}
      <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
    </nav>
  );
};

export default Navbar;
