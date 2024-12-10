// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { useNavigate } from "react-router-dom";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { X } from "lucide-react";

// const PaymentForm = ({ totalPrice, onClose }) => {
//   const [paymentMethod, setPaymentMethod] = useState("stripe");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handlePayment = async (event) => {
//     event.preventDefault();
//     setError("");
//     setSuccess("");

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError("Card element not found");
//       return;
//     }

//     const { error: stripeError, token } = await stripe.createToken(cardElement);

//     if (stripeError) {
//       setError(stripeError.message);
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:3000/payments", {
//         amount: totalPrice,
//         paymentMethod,
//         phone,
//         cardToken: token.id,
//       });

//       if (data.status === "success") {
//         setSuccess("Payment successful!");
//         setTimeout(() => {
//           navigate("/");
//           onClose();
//         }, 2000);
//       } else {
//         setError(data.message || "Payment failed");
//       }
//     } catch (error) {
//       setError("Payment processing error: " + error.message);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-fade-in-up">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Complete Your Payment
//         </h2>

//         <form onSubmit={handlePayment} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Amount to Pay
//             </label>
//             <input
//               type="number"
//               value={totalPrice}
//               readOnly
//               className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Payment Method
//             </label>
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="stripe">Stripe</option>
//               <option value="jazzcash">JazzCash</option>
//               <option value="easypaisa">EasyPaisa</option>
//               <option value="sadapay">SadaPay</option>
//               <option value="bank">Bank Transfer</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone (Optional)
//             </label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Card Details
//             </label>
//             <CardElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#32325d",
//                     "::placeholder": { color: "#aab7c4" },
//                     border: "1px solid #d1d5db",
//                     padding: "10px",
//                     borderRadius: "0.375rem",
//                   },
//                 },
//               }}
//               className="border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Pay ${totalPrice}
//           </button>
//         </form>

//         {error && (
//           <p className="mt-4 text-red-600 text-center bg-red-50 p-2 rounded">
//             {error}
//           </p>
//         )}
//         {success && (
//           <p className="mt-4 text-green-600 text-center bg-green-50 p-2 rounded">
//             {success}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default PaymentForm;

import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ totalPrice, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      return;
    }

    try {
      const { error: stripeError, token } = await stripe.createToken(
        cardElement
      );

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      const { data } = await axios.post("http://localhost:3000/payments", {
        amount: totalPrice,
        paymentMethod,
        phone,
        cardToken: token.id,
      });

      if (data.status === "success") {
        setSuccess("Payment successful!");
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 2000);
      } else {
        setError(data.message || "Payment failed");
      }
    } catch (error) {
      setError("Payment processing error: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md bg-gradient-to-tr from-[#fcdfeb] to-[#8df19c] rounded-2xl shadow-2xl p-6 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Complete Your Payment
        </h2>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Pay
            </label>
            <input
              type="number"
              value={totalPrice}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="stripe">Stripe</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">EasyPaisa</option>
              <option value="sadapay">SadaPay</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone (Optional)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#aab7c4" },
                    border: "1px solid #d1d5db",
                    padding: "10px",
                    borderRadius: "0.375rem",
                  },
                },
              }}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Pay Rs.{totalPrice}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-4 text-green-600 text-center bg-green-50 p-2 rounded">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
