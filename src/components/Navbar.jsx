import React, { useState, useContext } from "react";
import { Heart, Bell, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = ({ favoriteCount }) => {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const closeServicesDropdown = () => {
    setServicesDropdownOpen(false);
  };

  return (
    <header className="p-3 bg-gray-700">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center lg:justify-start">
          <a
            href="/"
            className="flex items-center mb-2 text-white text-decoration-none mr-24"
          >
            <img src={logo} alt="Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold">Grow Green</span>
          </a>

          <ul className="nav flex flex-wrap col-12 col-lg-auto me-lg-auto mb-2 justify-center mb-md-0">
            <li>
              <a href="/" className="nav-link px-2 text-white hover:text-white">
                Home
              </a>
            </li>
            <li className="relative">
              <button
                onClick={toggleServicesDropdown}
                className="nav-link px-2 text-white hover:text-gray-300"
              >
                Services
              </button>
              <div
                className={`absolute left-0 mt-1 w-48 bg-gray-700 text-white rounded-md shadow-lg z-10 transition-transform duration-300 ease-in-out transform ${
                  isServicesDropdownOpen
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0"
                }`}
                style={{ transformOrigin: "top" }}
              >
                {isServicesDropdownOpen && (
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/plants");
                          closeServicesDropdown(); // Close dropdown on option click
                        }}
                        className="block px-4 py-2 hover:bg-gray-900 w-full text-left"
                      >
                        Buy Plants
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/donation");
                          closeServicesDropdown();
                        }}
                        className="block px-4 py-2 hover:bg-gray-900 w-full text-left"
                      >
                        Donate Anywhere
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/plant-services");
                          closeServicesDropdown();
                        }}
                        className="block px-4 py-2 hover:bg-gray-900 w-full text-left"
                      >
                        Plant Services
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/home-services");
                          closeServicesDropdown();
                        }}
                        className="block px-4 py-2 hover:bg-gray-900 w-full text-left"
                      >
                        Home Services
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <a
                href="/contact"
                className="nav-link px-2 text-white hover:text-white"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/about-us"
                className="nav-link px-2 text-white hover:text-white"
              >
                About Us
              </a>
            </li>
          </ul>

          <div className="ml-auto flex items-center">
            <button
              type="button"
              className="btn border bg-yellow-500 border-white text-white text-sm mr-2"
            >
              Login
            </button>
            <button
              type="button"
              className="btn bg-yellow-500 text-white text-sm"
            >
              Sign-up
            </button>
          </div>

          <div className="flex items-center ml-3 relative">
            <button
              type="button"
              className="relative text-white hover:text-gray-300 mr-2"
            >
              <Heart />
              {favoriteCount > 0 && (
                <span className="absolute -top-4 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="relative text-white hover:text-gray-300 mr-2"
            >
            <Bell />
            </button>
            <button
              type="button"
              className="relative text-white hover:text-gray-300"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-4 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
