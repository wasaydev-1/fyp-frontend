import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios if not already installed
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { decodeJwt } from "jose"; // Correct way to import
const stripePromise = loadStripe(
  "pk_test_51QSf3dGUTm1vPJ2W4Uu12jvAdeFeas7P2XodI9pnknOOb8twSbw2t8j7LxY49ja4yLyYWZiucy2lsgSF3UZERUq1006adhqCdr"
);
const DeliveryForm = () => {
  // State for user information
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState();

  // Access location, locationName, city, and selectedProducts from the state passed through React Router
  const locationState = useLocation();
  const { location, locationName, city, selectedProducts } =
    locationState.state || {}; // Destructure passed state

  // State to track the selected delivery fee and tip
  const [deliveryFee] = useState(500); // Fixed delivery fee
  const [tip, setTip] = useState(0); // New state for tip
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTokens = {
      authToken: localStorage.getItem("authToken"),
      token: localStorage.getItem("token"),
      userToken: localStorage.getItem("userToken"),
    };

    const authToken =
      storedTokens.authToken || storedTokens.token || storedTokens.userToken;

    if (!authToken) {
      console.error("No authentication token found in any storage key");
      navigate("/login");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Full User Details Response:", response.data);

        if (response.data && response.data.data) {
          // Decode the authToken to get the user ID
          const decodedToken = decodeJwt(authToken);
          console.log("Decoded Token:", decodedToken);

          // `sub` represents the user ID in the token
          const userId = decodedToken.sub;

          // Find the user matching the decoded user ID
          const userDetails = response.data.data.find(
            (user) => user.id === userId
          );

          if (userDetails) {
            setUserInfo(userDetails);
          } else {
            console.warn("No matching user found for the given token.");
            setError("No user details found.");
          }
        }
      } catch (err) {
        console.error("Detailed Error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });

        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to fetch user details");
        }
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Function to format the address with special handling for parts to be grouped together
  const formatAddress = (address) => {
    if (!address) return [];
    const parts = address.split(",");

    // Handle specific grouping for address parts
    let groupedAddress = [];
    if (parts.length > 0) {
      // Combine "North Nazimabad Town" and "Nazimabad District" on the same line
      groupedAddress.push(
        <p key="line-1" className="text-sm text-gray-800">
          {`${parts[0]}, ${parts[1]}`}
        </p>
      );

      // Handle Karachi Division and Sindh, Pakistan in groups
      if (parts.length > 2) {
        groupedAddress.push(
          <p key="line-2" className="text-sm text-gray-800">
            {parts[2].trim()}
          </p>
        );
      }
      if (parts.length > 3) {
        groupedAddress.push(
          <p key="line-3" className="text-sm text-gray-800">
            {`${parts[3]}, ${parts[4]}`.trim()}
          </p>
        );
      }
    }

    return groupedAddress;
  };

  // Calculate the total cost dynamically based on selected products
  const subtotal = selectedProducts
    ? selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      )
    : 0;
  const serviceFee = 100;
  const total = subtotal + deliveryFee + serviceFee + tip;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center gap-6 p-4 mt-24">
      {/* Left Box: Delivery Details */}
      <div className="bg-white shadow-md rounded-md p-6 w-full lg:w-2/5">
        <div className="space-y-6">
          {/* Delivery Address */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Delivery address
            </h2>
            <div className="mt-2">
              {/* Display formatted address */}
              {locationName && formatAddress(locationName)}
              {city && formatAddress(city)}
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gardener Fees</h2>
            <div className="mt-2 flex gap-2">
              <div className="px-4 py-2 bg-gray-200 text-black rounded text-sm">
                Rs. {deliveryFee.toFixed(2)} (Fixed)
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Personal details
            </h2>
            <p className="mt-2 text-sm">{userInfo.username || "User"}</p>
            <p className="text-sm">{userInfo.email}</p>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Payment Method
            </h2>
            <div className="mt-2 space-y-14">
              <label className="block">
                <span className="text-sm">Stripe **** 4242</span>
              </label>
            </div>
          </div>

          {/* Tip Section */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Tip your rider
            </h2>
            <div className="mt-2 flex gap-2">
              <button
                className={`px-4 py-2 rounded text-sm ${
                  tip === 0
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTip(0)}
              >
                Not now
              </button>
              <button
                className={`px-4 py-2 rounded text-sm ${
                  tip === 50
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTip(50)}
              >
                Rs. 50.00
              </button>
              <button
                className={`px-4 py-2 rounded text-sm ${
                  tip === 100
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTip(100)}
              >
                Rs. 100.00
              </button>
              <button
                className={`px-4 py-2 rounded text-sm ${
                  tip === 200
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setTip(200)}
              >
                Rs. 200.00
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Box: Order Summary */}
      <div className="bg-white shadow-md rounded-md p-6 w-full lg:w-1/4">
        <h2 className="text-2xl font-bold tracking-tight">Your order</h2>
        <div className="mt-4 space-y-2">
          {selectedProducts &&
            selectedProducts.map((product, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {product.quantity} x {product.name}
                </span>
                <span>Rs. {(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Gardener fees</span>
            <span>Rs. {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service fee</span>
            <span>Rs. {serviceFee}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tip</span>
            <span>Rs. {tip.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>Rs. {total.toFixed(2)}</span>
        </div>
        {/* <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md">
          Place order
        </button> */}
        {!showPaymentForm ? (
          <button
            onClick={() => setShowPaymentForm(true)}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
          >
            Proceed to Payment
          </button>
        ) : null}
      </div>

      {showPaymentForm && (
        <Elements stripe={stripePromise}>
          <PaymentForm
            totalPrice={total}
            onClose={() => setShowPaymentForm(false)}
            onPaymentSuccess={() => {
              setShowPaymentForm(false);
              navigate("/plant-services"); // Navigate to a success page after payment
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default DeliveryForm;
