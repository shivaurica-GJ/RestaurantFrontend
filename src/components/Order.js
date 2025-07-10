import React, { useState, useCallback } from "react";
import "../styles/Order.css";
import confetti from "canvas-confetti";

const DELIVERY_CHARGE = 50;
const TAX_RATE = 0.05;

const menuItems = {
  appetizers: [
    {
      id: 1,
      name: "Samosa",
      price: 120,
      image: "/images/samosa-7180078_1280.jpg",
      description:
        "Crispy pastry filled with spiced potatoes, peas, and aromatic Indian spices",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: 250,
      image: "/images/paneer-7043097_1280.jpg",
      description:
        "Marinated cottage cheese cubes grilled with bell peppers and Indian spices",
    },
    {
      id: 3,
      name: "Dahi Bhalla",
      price: 180,
      image: "/images/Dahi-Vada-H1.webp",
      description: "Lentil dumplings in yogurt with tangy tamarind chutney",
    },
    {
      id: 4,
      name: "Pani Puri",
      price: 150,
      image: "/images/panipuri.jfif",
      description:
        "Crispy hollow puris filled with spicy mint water and potato mixture",
    },
  ],
  main: [
    {
      id: 5,
      name: "Paneer Butter Masala",
      price: 380,
      image: "/images/pannerbuttermasala.jpg",
      description: "Cottage cheese in rich tomato gravy",
    },
    {
      id: 6,
      name: "Malai Kofta",
      price: 360,
      image: "/images/malai-kofta.webp",
      description: "Vegetable and cheese dumplings in creamy gravy",
    },
    {
      id: 7,
      name: "Chole Bhature",
      price: 280,
      image: "/images/chhole.webp",
      description: "Spiced chickpeas with deep-fried bread",
    },
    {
      id: 8,
      name: "Veg Biryani",
      price: 320,
      image: "/images/biryani.jpg",
      description: "Aromatic rice with mixed vegetables and spices",
    },
  ],
  breads: [
    {
      id: 11,
      name: "Assorted Naan",
      price: 60,
      image: "/images/naan.jpg",
      description: "Butter, Garlic, or Plain Naan bread baked in tandoor",
    },
    {
      id: 12,
      name: "Hyderabadi Biryani",
      price: 380,
      image: "/images/biryani.jpg",
      description: "Fragrant basmati rice cooked with aromatic spices",
    },
  ],
  desserts: [
    {
      id: 15,
      name: "Gulab Jamun",
      price: 150,
      image: "/images/gulab-jamun.jpg",
      description: "Soft milk dumplings in sweet rose-flavored syrup",
    },
    {
      id: 16,
      name: "Rasmalai",
      price: 180,
      image: "/images/Rasmalai.jpg",
      description: "Soft cottage cheese patties in creamy saffron milk",
    },
  ],
};

const categories = ["all", "appetizers", "main", "breads", "desserts"];

const Order = () => {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addToCart = useCallback((itemId) => {
    const item = Object.values(menuItems)
      .flat()
      .find((item) => item.id === itemId);
    if (!item) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const calculateSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateTax = () => calculateSubtotal() * TAX_RATE;

  const calculateTotal = () =>
    cart.length > 0
      ? calculateSubtotal() + calculateTax() + DELIVERY_CHARGE
      : 0;

  const currentItems =
    activeCategory === "all"
      ? Object.values(menuItems).flat()
      : menuItems[activeCategory] || [];

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;

    // 🎉 Confetti animation
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setShowModal(true);
        setCart([]);
        return;
      }

      confetti({
        ...defaults,
        particleCount: 50,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);
  }, [cart]);

  return (
    <div className="order-container">
      <div className="menu-section">
        <h2 className="section-title">Order Online</h2>

        <div
          className="category-filter"
          role="tablist"
          aria-label="Menu Categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              role="tab"
              tabIndex={activeCategory === category ? 0 : -1}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {currentItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img
                src={process.env.PUBLIC_URL + item.image}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
              <div className="menu-item-content">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <p className="menu-item-price">₹{item.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <div className="cart-container">
          <h3>
            Your Cart <i className="fas fa-shopping-cart"></i> (
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h3>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart-message">Your cart is empty</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={process.env.PUBLIC_URL + item.image}
                    alt={item.name}
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <p className="cart-item-price">₹{item.price}</p>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <button
              className="clear-cart-btn"
              onClick={clearCart}
              style={{
                marginBottom: "10px",
                backgroundColor: "#c0392b",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>
          )}

          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">
                ₹{calculateSubtotal().toFixed(2)}
              </span>
            </div>
            <div className="tax">
              <span>Tax (5%):</span>
              <span className="tax-amount">₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="delivery">
              <span>Delivery:</span>
              <span className="delivery-amount">
                {cart.length > 0 ? `₹${DELIVERY_CHARGE.toFixed(2)}` : "₹0.00"}
              </span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span className="total-amount">
                ₹{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Modal confirmation */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px 30px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2 id="modal-title">🎉 Thank you for your order!</h2>
            <p>Your delicious meal will be delivered soon.</p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
