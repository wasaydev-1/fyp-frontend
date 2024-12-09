import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import PaymentForm from "./PaymentForm";

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
  const location = useLocation();
  const { totalPrice, locationDetails, selectedProducts } =
    location.state || {};

  const [selectedTier, setSelectedTier] = useState(null);
  const [months, setMonths] = useState(1);
  const [showMonthInput, setShowMonthInput] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
    if (!selectedTier) return totalPrice;
    const tierPrice = parseFloat(selectedTier.priceMonthly.replace("$", ""));
    const subscriptionCost = tierPrice * months;
    return totalPrice + subscriptionCost;
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
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
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
            Initial Total: ${totalPrice?.toFixed(2)}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Delivery Location</h3>
          <div className="space-y-2 bg-gray-50 p-4 rounded-md">
            {locationDetails?.name && (
              <p className="font-medium">{locationDetails.name}</p>
            )}
            <p>{locationDetails?.address}</p>
            <p className="text-sm text-gray-600">
              Coordinates: {locationDetails?.coordinates?.lat},{" "}
              {locationDetails?.coordinates?.lon}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
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
                tier.featured ? "text-indigo-400" : "text-indigo-600",
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
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
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
                  ? "bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
                  : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600",
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
                <span>${totalPrice?.toFixed(2)}</span>
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

            <button
              onClick={() => setShowPaymentForm(true)} // Show the PaymentForm when clicked
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
      {showPaymentForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <PaymentForm
            onClose={() => setShowPaymentForm(false)}
            totalPrice={calculateTotalCost()}
          />
        </div>
      )}
    </div>
  );
};

export default Subscription;
