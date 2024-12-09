import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import icon from "../modules/Icons/cart.png";
import userIcon from "../modules/Icons/notification.png";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const servicesLinkRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Define routes with white backgrounds
  const pagesWithWhiteBackground = [
    "/Page-Shop",
    "/cart",
    "/DetailsProduct",
    "/plant-services",
  ];

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !servicesLinkRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleScroll = () => {
    // Only toggle `isScrolled` for pages NOT in `pagesWithWhiteBackground`
    if (!pagesWithWhiteBackground.includes(location.pathname)) {
      setScrolled(window.scrollY > 10);
    }
  };

  useEffect(() => {
    // Ensure `isScrolled` is true for white background pages
    if (pagesWithWhiteBackground.includes(location.pathname)) {
      setScrolled(true);
      setHovered(true); // Force hover effect to persist
    } else {
      setScrolled(false); // Reset for other pages
      setHovered(false); // Allow hover behavior based on mouse events
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]); // Re-run whenever the route changes

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleDropdownLinkClick = (route) => {
    setDropdownOpen(false);
    navigate(route);
    window.scrollTo(0, 0);
  };

  const handleNavLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <header
      className="header"
      // Mouse hover effects only for non-white-background pages
      onMouseEnter={() => {
        if (!pagesWithWhiteBackground.includes(location.pathname))
          setHovered(true);
      }}
      onMouseLeave={() => {
        if (!pagesWithWhiteBackground.includes(location.pathname))
          setHovered(false);
      }}
    >
      {/* Top Header Box */}
      <div className={`top-box ${isHovered || isScrolled ? "hovered" : ""}`}>
        <span className="delivery-text">
          Free Delivery on orders above Rs. 5000
        </span>
        <div className="auth-links flex">
          <div className="login-text" onClick={handleLogout}>
            Logout
          </div>
          <div className="vertical-line"></div>
          <div className="login-text" onClick={() => navigate("/login")}>
            Login
          </div>
          <div className="vertical-line"></div>
          <div className="register-text" onClick={() => navigate("/register")}>
            Sign Up
          </div>
        </div>
      </div>

      {/* Main Header Box */}
      <div className={`bottom-box ${isHovered || isScrolled ? "hovered" : ""}`}>
        <div className="logo-text text-2xl font-bold" onClick={handleLogoClick}>
          GO GREEN
        </div>
        <ul className="nav-links flex space-x-8">
          <li>
            <div
              className="text-sm hover:text-green-500"
              onClick={() => handleNavLinkClick("/")}
            >
              Home
            </div>
          </li>
          <li>
            <div
              className="text-sm hover:text-green-500"
              onClick={() => handleNavLinkClick("/about-us")}
            >
              About
            </div>
          </li>
          <li className="services-link-container relative">
            <div
              ref={servicesLinkRef}
              className={`text-sm hover:text-green-500 ${
                isDropdownOpen ? "open" : ""
              }`}
              onClick={toggleDropdown}
            >
              Services
            </div>
            <ul
              ref={dropdownRef}
              className="dropdown-menu absolute left-0 bg-white shadow-lg p-2 mt-2 w-40"
              style={{ display: isDropdownOpen ? "block" : "none" }}
            >
              <li>
                <div
                  className="dropdown-item hover:text-green-500"
                  onClick={() => handleDropdownLinkClick("/Page-Shop")}
                >
                  Buy Plants
                </div>
              </li>
              <li>
                <div
                  className="dropdown-item hover:text-green-500"
                  onClick={() => handleDropdownLinkClick("/donation")}
                >
                  Donate Anywhere
                </div>
              </li>
              <li>
                <div
                  className="dropdown-item hover:text-green-500"
                  onClick={() => handleDropdownLinkClick("/plant-services")}
                >
                  Plant Services
                </div>
              </li>
              <li>
                <div
                  className="dropdown-item hover:text-green-500"
                  onClick={() => handleDropdownLinkClick("/home-services")}
                >
                  Home Services
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div
              className="text-sm hover:text-green-500"
              onClick={() => handleNavLinkClick("/contact")}
            >
              Contact
            </div>
          </li>
        </ul>

        {/* Icons in the bottom-right corner */}
        <div className="icon-container relative">
          <img
            src={icon}
            alt="Cart Icon"
            className="cart-icon icon"
            onClick={() => navigate("/cart")}
          />
          {cartCount > 0 && (
            <div className="cart-badge absolute top-0 right-0 text-xs rounded-full h-5 w-5 flex justify-center items-center">
              {cartCount}
            </div>
          )}
          <img
            src={userIcon}
            alt="Notification Icon"
            className="notification-icon icon"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
