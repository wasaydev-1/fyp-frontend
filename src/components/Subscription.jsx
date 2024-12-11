import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { decodeJwt } from "jose";
const stripePromise = loadStripe(
  "pk_test_51QSf3dGUTm1vPJ2W4Uu12jvAdeFeas7P2XodI9pnknOOb8twSbw2t8j7LxY49ja4yLyYWZiucy2lsgSF3UZERUq1006adhqCdr"
);
const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$29",
    description:
      "The perfect plan for maintaining your plants with essential care.",
    features: ["Watering", "Pruning", "24-hour support response time"],
    featured: false,
  },
  {
    name: "Advanced",
    id: "tier-advanced",
    href: "#",
    priceMonthly: "$99",
    description:
      "Comprehensive plant care with dedicated support and advanced features.",
    features: [
      "Watering",
      "Pruning",
      "Fertilizing",
      "Pest control",
      "24-hour support response time",
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Subscription = () => {
  const locationState = useLocation();
  const { locationDetails, selectedProducts, locationName, location } =
    locationState.state || {};

  const [selectedTier, setSelectedTier] = useState(null);
  const [months, setMonths] = useState(1);
  const [showMonthInput, setShowMonthInput] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
  });
  const handleOrderPlacement = async () => {
    // Map selected products to include their IDs and quantities
    const products = selectedProducts.map((product) => ({
      plantId: product.id,
      quantity: product.quantity,
      name: product.name,
    }));
    const total = calculateTotalCost();

    // Extract latitude and longitude from the location array
    const latitude = location[0];
    const longitude = location[1];

    console.log("12", userInfo.id);
    // Prepare order data payload
    const orderData = {
      userId: userInfo.id, // User ID
      plants: products, // Array of plantId and quantity

      latitude, // Extracted latitude
      longitude, // Extracted longitude
      locationName,
      total, // Total amount
      isSubscription: false, // No subscription
      subscriptionMonths: months,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/services",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Auth token
          },
        }
      );

      if (response.status === 201) {
        console.log("Order saved successfully:", response.data);
        setShowPaymentForm(true); // Proceed to payment after saving
      } else {
        console.error("Failed to save order:", response.data);
      }
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

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

  const total = selectedProducts
    ? selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      )
    : 0;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStartedClick = (tier) => {
    setSelectedTier(tier);
    setShowMonthInput(true);
  };

  const handleMonthChange = (event) => {
    setMonths(event.target.value);
  };

  const calculateTotalCost = () => {
    if (!selectedTier) return total;
    const tierPrice = parseFloat(selectedTier.priceMonthly.replace("$", ""));
    const subscriptionCost = tierPrice * months;
    return total + subscriptionCost;
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Background gradient div remains the same */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#73f286] opacity-30"
        />
      </div>

      <div className="mx-auto max-w-2xl mb-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Selected Products</h3>
          <div className="space-y-2">
            {selectedProducts?.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {product.name} (x{product.quantity})
                </span>
                <span>${(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right font-semibold">
            Initial Total: ${total?.toFixed(2)}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Delivery Location</h3>
          <div className="space-y-2 bg-gray-50 p-4 rounded-md">
            <p className="font-medium">{locationName}</p>

            <p className="text-sm text-gray-600">
              Coordinates: {location[0]} , {location[1]}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-bold leading-7 text-green-600">
          Add Subscription Plan
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Choose your Subscription plan
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-green-400" : "text-green-600",
                "text-base font-semibold leading-7"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-bold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base leading-7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className={classNames(
                      tier.featured ? "text-green-400" : "text-green-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleGetStartedClick(tier)}
              className={classNames(
                tier.featured
                  ? "bg-green-500 text-white shadow-sm hover:bg-green-400 focus-visible:outline-green-500"
                  : "text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300 focus-visible:outline-green-600",
                "mt-8 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              Get started today
            </button>
          </div>
        ))}
      </div>

      {showMonthInput && (
        <div className="mt-8 mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Subscription Details - {selectedTier.name}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Months
              </label>
              <input
                type="number"
                value={months}
                onChange={handleMonthChange}
                min="1"
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Initial Products Total:</span>
                <span>${total?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subscription Cost:</span>
                <span>
                  $
                  {(
                    parseFloat(selectedTier.priceMonthly.replace("$", "")) *
                    months
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Final Total:</span>
                <span>${calculateTotalCost().toFixed(2)}</span>
              </div>
            </div>

            {!showPaymentForm ? (
              <button
                onClick={() => {
                  setShowPaymentForm(true);
                }}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
              >
                Proceed to Payment
              </button>
            ) : null}
          </div>

          {showPaymentForm && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                totalPrice={calculateTotalCost().toFixed(2)}
                onClose={() => setShowPaymentForm(false)}
                onPaymentSuccess={() => {
                  setShowPaymentForm(false);
                  handleOrderPlacement();
                  navigate("/plant-services"); // Navigate to a success page after payment
                }}
              />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};
export default Subscription;
