import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import axios from "axios"; // Added axios for API calls
import "./register.css";

// Import images
import image1 from "../Modules/background2.jpg";
import image2 from "../Modules/background3.jpg";
import image3 from "../Modules/background4.png";
import image4 from "../Modules/background5.jpg";
import backArrow from "../Modules/Logo/left-arrow.png";
import googleLogo from "../Modules/Logo/google-icon.png";
import showPasswordIcon from "../Modules/Logo/show-password.png";
import hidePasswordIcon from "../Modules/Logo/hide-password.png";

const Register = () => {
  const images = [image1, image2, image3, image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("signUp");
  const [password, setPassword] = useState("");
  const [rePasswordVisible, setRePasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Added username state
  const [emailError, setEmailError] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const [selectedAuthOption, setSelectedAuthOption] = useState("signup");
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [role, setRole] = useState("Customer");
  const [rePassword, setRePassword] = useState("");
  const [registrationError, setRegistrationError] = useState(""); // Added for API error handling

  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setAnimationClass("slide-in");
    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const validatePasswords = useCallback(
    debounce((pass, rePass) => {
      if (!pass || !rePass) {
        setPasswordError("");
      } else if (pass !== rePass) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }, 500),
    []
  );

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log("Selected Role:", event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePasswords(newPassword, rePassword);
  };

  const preventSpaces = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleRePasswordChange = (event) => {
    const newRePassword = event.target.value;
    setRePassword(newRePassword);
    validatePasswords(password, newRePassword);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const validateEmail = useCallback(
    debounce((email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        setEmailError("");
      } else if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }, 500),
    []
  );

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailError("");
    validateEmail(newEmail);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFocus = (event) => {
    event.target.classList.add("focused");
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      event.target.classList.remove("focused");
    }
  };

  const handleAuthOptionClick = (option) => {
    if (option === "signin") {
      setIsSignInClicked(true);
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      setSelectedAuthOption(option);
      setIsSignInClicked(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setRegistrationError("");

    if (emailError || passwordError) {
      setRegistrationError("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user", {
        email,
        username,
        password,
        rePassword,
        role,
      });
      console.log("res", response);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setRegistrationError(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
        // const errorMessage = error.response.data.message;
        // if (role === "admin" && errorMessage.includes("Only one admin")) {
        //   alert(
        //     "An admin is already registered. Please choose a different role."
        //   );
        // } else {
        //   setError(errorMessage); // Display other backend validation errors
        // }
      } else if (error.request) {
        setRegistrationError(
          "No response from server. Please check your connection."
        );
      } else {
        setRegistrationError("An error occurred during registration.");
      }
      console.error("Registration error:", error);
    }
  };

  useEffect(() => {
    if (email !== "") {
      emailInputRef.current.classList.add("focused");
    } else {
      emailInputRef.current.classList.remove("focused");
    }
  }, [email]);

  return (
    <div className="register-container">
      <div className="flex h-screen">
        <div
          className="image-section"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        ></div>

        <div className="signup-section relative flex flex-col justify-start">
          <form
            className={`group flex flex-col gap-20 absolute top-4 left-20 w-full ${
              isSignInClicked ? "slide-out" : ""
            }`}
            onSubmit={handleSubmit}
          >
            <img
              src={backArrow}
              alt="Back"
              className="back-arrow mt-8"
              onClick={handleBackClick}
            />

            <div className="flex items-center mt-4">
              <h1
                className={`sign-uptext tracking-tight cursor-pointer ${
                  selectedTab === "signUp" ? "text-black" : "text-gray-400"
                }`}
                onClick={() => setSelectedTab("signUp")}
              >
                Sign Up
              </h1>
              <div style={{ width: "50px" }} />
              <h1
                className={`sign-intext tracking-tight cursor-pointer ${
                  selectedTab === "signIn" ? "text-black" : "text-gray-400"
                }`}
                onClick={() => handleAuthOptionClick("signin")}
              >
                Sign In
              </h1>
            </div>

            <div className="level-bar-container">
              <div className="level-bar-filled"></div>
            </div>

            <div className="google-signup-container">
              <img src={googleLogo} alt="Google" className="google-logo" />
              <span className="google-signup-text">Sign Up with Google</span>
            </div>

            <div className="or-divider">
              <span className="line"></span>
              <span className="or-text">Or</span>
              <span className="line"></span>
            </div>

            <div className="inputBox">
              <input
                type="email"
                id="email"
                name="email"
                className="email-input"
                required
                placeholder=" "
                value={email}
                onChange={handleEmailChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={emailInputRef}
              />
              <span className="floating-label">Enter your Email</span>
              {emailError && <div className="email-error">{emailError}</div>}
            </div>

            <div className="inputBox">
              <input
                type="text"
                id="username"
                name="username"
                className="username-input"
                required
                placeholder=" "
                value={username}
                onChange={handleUsernameChange}
              />
              <span className="floating-label">Enter your Username</span>
            </div>

            <div className="inputBox">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="password-input"
                required
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={preventSpaces}
              />

              <span
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <img
                  src={passwordVisible ? hidePasswordIcon : showPasswordIcon}
                  alt={passwordVisible ? "Hide Password" : "Show Password"}
                />
              </span>
            </div>

            <div className="inputBox">
              <input
                type={rePasswordVisible ? "text" : "password"}
                id="repassword"
                name="repassword"
                className="reenter-password-input"
                required
                placeholder=" "
                value={rePassword}
                onChange={handleRePasswordChange}
                onKeyDown={preventSpaces}
              />
              <span className="floating-label">Re-enter your Password</span>
              <span
                className="eye-icon"
                onClick={() => setRePasswordVisible(!rePasswordVisible)}
              >
                <img
                  src={rePasswordVisible ? hidePasswordIcon : showPasswordIcon}
                  alt={rePasswordVisible ? "Hide Password" : "Show Password"}
                />
              </span>
              {passwordError && (
                <div className="error-text">{passwordError}</div>
              )}
            </div>
            <div className="inputBox ">
              <select
                id="role"
                name="role"
                className="role-select"
                required
                value={role}
                onChange={handleRoleChange}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="gardener">Gardener</option>
              </select>
            </div>

            {/* Added error message display */}
            {registrationError && (
              <div className="error-text text-red-500 mb-4">
                {registrationError}
              </div>
            )}

            <div className="sign-up-button-container">
              <button type="submit" className="sign-up-button">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
