import React from 'react';
import { useLocation } from 'react-router-dom';

const DeliveryForm = () => {
  // Access location, locationName, city, and selectedProducts from the state passed through React Router
  const locationState = useLocation();
  const { location, locationName, city, selectedProducts } = locationState.state || {}; // Destructure passed state

  // Function to format the address with special handling for parts to be grouped together
  const formatAddress = (address) => {
    if (!address) return [];
    const parts = address.split(',');

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
    ? selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
    : 0;
  const deliveryFee = 100; // Fixed delivery fee
  const serviceFee = 2;
  const vat = 0; // Adjust VAT if applicable
  const total = subtotal + deliveryFee + serviceFee + vat;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-start justify-center gap-6 p-4 mt-24">
      {/* Left Box: Delivery Details */}
      <div className="bg-white shadow-md rounded-md p-6 w-full lg:w-2/5">
        <div className="space-y-6">
          {/* Delivery Address */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Delivery address</h2>
            <div className="mt-2">
              {/* Display formatted address */}
              {locationName && formatAddress(locationName)}
              {city && formatAddress(city)}
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Delivery options</h2>
            <div className="mt-2 space-y-2">
              <label className="block">
                <input type="radio" name="delivery" className="mr-2" defaultChecked />
                <span className="text-sm">Standard 10 - 25 mins</span>
              </label>
              <label className="block">
                <input type="radio" name="delivery" className="mr-2" />
                <span className="text-sm">Priority 5 - 20 mins (+ Rs. 50)</span>
              </label>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Personal details</h2>
            <p className="mt-2 text-sm">Shozab Husain</p>
            <p className="text-sm">shozab@gmail.com</p>
            <p className="text-sm">+92 337824209</p>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Payment</h2>
            <div className="mt-2 space-y-2">
              <label className="block">
                <input type="radio" name="payment" className="mr-2" />
                <span className="text-sm">Mastercard **** 6538</span>
              </label>
              <label className="block">
                <input type="radio" name="payment" className="mr-2" defaultChecked />
                <span className="text-sm">Visa **** 9819 (Primary)</span>
              </label>
            </div>
          </div>

          {/* Tip Section */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tip your rider</h2>
            <div className="mt-2 flex gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded text-sm">Not now</button>
              <button className="px-4 py-2 bg-gray-200 rounded text-sm">Rs. 50.00</button>
              <button className="px-4 py-2 bg-gray-200 rounded text-sm">Rs. 100.00</button>
              <button className="px-4 py-2 bg-gray-200 rounded text-sm">Rs. 200.00</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Box: Order Summary */}
      <div className="bg-white shadow-md rounded-md p-6 w-full lg:w-1/4">
        <h2 className="text-2xl font-bold tracking-tight">Your order</h2>
        <div className="mt-4 space-y-2">
          {selectedProducts && selectedProducts.map((product, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{product.quantity} x {product.name}</span>
              <span>Rs. {(product.price * product.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Standard delivery</span>
            <span>Rs. {deliveryFee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service fee</span>
            <span>Rs. {serviceFee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VAT</span>
            <span>Rs. {vat}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>Rs. {total.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md">Place order</button>
      </div>
    </div>
  );
};

export default DeliveryForm;
