// src/App.js
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Loading component
const Loading = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Main content component for the home page
const MainContent = () => (
  <main>
    <section id="home">
      <Home />
    </section>

    <section id="menu">
      <Menu />
    </section>

    <section id="about">
      <About />
    </section>

    <section id="contact">
      <Contact />
    </section>
  </main>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="main-content">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </div>
          <ScrollToTop />
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
