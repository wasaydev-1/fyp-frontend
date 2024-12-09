import React, { useState } from "react";
import boxImage1 from "../modules/Icons/donate-icon.png";
import boxImage2 from "../modules/Icons/join-hands.png";
import boxImage3 from "../modules/Icons/plant-trees.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";
import "./donation.css";

const stripePromise = loadStripe(
  "pk_test_51QSf3dGUTm1vPJ2W4Uu12jvAdeFeas7P2XodI9pnknOOb8twSbw2t8j7LxY49ja4yLyYWZiucy2lsgSF3UZERUq1006adhqCdr"
);
const Donation = () => {
  const [trees, setTrees] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const maxTrees = 100;
  const costPerTree = 5;

  const handleTreeChange = (event) => {
    setTrees(Number(event.target.value));
  };

  const handleDonateClick = () => {
    setShowPaymentForm(true);
  };

  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
  };

  const totalPrice = trees * costPerTree;

  return (
    <div>
      <div className="donation-container relative">
        <div className="text-center text-white relative">
          <h1
            className="Donate-Now text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight -mt-36"
            style={{ lineHeight: "1.2" }}
          >
            <span>Donate</span>
            <span className="ml-4">Now</span>
          </h1>
          <p className="impact-env mt-4 text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl">
            Help us plant trees and make a positive impact on the environment!
          </p>
        </div>

        <div className="absolute bottom-8 w-full flex justify-center space-x-4 p-4">
          <div className="first-box box flex items-center justify-start w-full sm:w-80 md:w-96 lg:w-1/4 h-32 sm:h-40 md:h-48 lg:h-52 p-4 overflow-hidden">
            <img src={boxImage1} alt="First Box" className="box-img ml-4" />
            <span
              className="box-text ml-4"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Donate Now
            </span>
          </div>

          <div className="second-box box flex items-center justify-start w-full sm:w-80 md:w-96 lg:w-1/4 h-32 sm:h-40 md:h-48 lg:h-52 p-4 overflow-hidden">
            <img src={boxImage2} alt="Second Box" className="box-img ml-4" />
            <span
              className="box-text ml-4"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Join us now
            </span>
          </div>

          <div className="third-box box flex items-center justify-start w-full sm:w-80 md:w-96 lg:w-1/4 h-32 sm:h-40 md:h-48 lg:h-52 p-4 overflow-hidden">
            <img src={boxImage3} alt="Third Box" className="box-img ml-4" />
            <span
              className="box-text ml-4"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Get involved
            </span>
          </div>
        </div>
      </div>

      <div className="new-container w-full p-8 flex flex-col items-center justify-center mt-12">
        <h2
          className="donate-plant text-center text-3xl sm:text-4xl md:text-5xl tracking-tight"
          style={{ wordSpacing: "0.5rem" }}
        >
          Donate & Plant a Tree
        </h2>

        <div className="w-full max-w-lg mt-8">
          <div className="flex items-center justify-between">
            <label className="no-oftrees mt-14 block text-2xl">
              No. of trees to plant
            </label>
            <span className="mt-14 text-2xl font-medium">{trees}</span>
          </div>

          <input
            type="range"
            min="0"
            max={maxTrees}
            value={trees}
            onChange={handleTreeChange}
            className="slider mt-14 w-full"
          />

          <div className="flex justify-between text-sm mt-2">
            <span>0</span>
            <span>{maxTrees}</span>
          </div>
        </div>

        <div className="mt-16 w-full max-w-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <p className="donation-text block">Your Donation</p>
              <p className="cost-text text-3xl">${totalPrice}.00</p>
            </div>

            <div className="donate-button-container">
              <button
                className="donate-button text-white -600 py-2 px-6 hover:bg-black transition"
                onClick={handleDonateClick}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={handleClosePaymentForm}
            >
              ✕
            </button>
            <Elements stripe={stripePromise}>
              <PaymentForm
                onClose={handleClosePaymentForm}
                totalPrice={totalPrice}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
