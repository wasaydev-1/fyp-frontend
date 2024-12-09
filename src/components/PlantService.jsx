// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import PaymentForm from "./PaymentForm";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PlantService = ({ products }) => {
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [location, setLocation] = useState([24.8607, 67.0011]);
//   const [marker, setMarker] = useState(null);
//   const [locationDetails, setLocationDetails] = useState({
//     name: "",
//     address: "",
//     coordinates: null,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [plants, setPlants] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllPlants = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/plants");
//         setPlants(response.data.data); // Adjust based on your API's response structure
//       } catch (error) {
//         console.error("Failed to fetch plants:", error);
//       }
//     };

//     fetchAllPlants();
//   }, []);

//   const total = selectedProducts.reduce(
//     (acc, product) => acc + product.price * product.quantity,
//     0
//   );

//   const formatLocationString = (data, lat, lon) => {
//     let details = [];

//     if (
//       data.address?.amenity ||
//       data.address?.leisure ||
//       data.address?.tourism ||
//       data.address?.shop
//     ) {
//       details.push(data.name);
//     }

//     if (data.address?.building) {
//       details.push(data.address.building);
//     }

//     if (data.address?.house_number && data.address?.road) {
//       details.push(`${data.address.house_number} ${data.address.road}`);
//     } else if (data.address?.road) {
//       details.push(data.address.road);
//     }

//     if (data.address?.suburb || data.address?.neighbourhood) {
//       details.push(data.address.suburb || data.address.neighbourhood);
//     }

//     if (data.address?.city || data.address?.town) {
//       details.push(data.address.city || data.address.town);
//     }

//     return {
//       name: data.name || "",
//       address: details.filter(Boolean).join(", "),
//       coordinates: {
//         lat: lat.toFixed(6),
//         lon: lon.toFixed(6),
//       },
//     };
//   };

//   const fetchDetailedLocation = async (lat, lon) => {
//     setIsLoading(true);
//     try {
//       const poiResponse = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&namedetails=1&extratags=1`,
//         {
//           headers: {
//             "Accept-Language": "en-US,en;q=0.9",
//             "User-Agent": "PlantService-App",
//           },
//         }
//       );
//       const data = await poiResponse.json();
//       const details = formatLocationString(data, lat, lon);
//       setLocationDetails(details);
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails({
//         name: "",
//         address: "Unable to fetch location details",
//         coordinates: {
//           lat: lat.toFixed(6),
//           lon: lon.toFixed(6),
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         const { lat, lng } = e.latlng;
//         setLocation([lat, lng]);
//         setMarker(e.latlng);
//         fetchDetailedLocation(lat, lng);
//       },
//     });
//     return null;
//   };

//   const handleWithoutSubscriptionClick = () => {
//     if (selectedProducts.length > 0 && marker) {
//       const { lat, lon } = locationDetails.coordinates || {};
//       const locationString = locationDetails.name
//         ? `${locationDetails.name}, ${locationDetails.address}, Lat: ${lat}, Long: ${lon}`
//         : `${locationDetails.address}, Lat: ${lat}, Long: ${lon}`;

//       toast.success(
//         `Added products to cart. Total: $${total}. Location: ${locationString}`,
//         {
//           position: "top-center",
//           autoClose: 3000,
//         }
//       );

//       setShowPaymentForm(true);
//     } else {
//       if (selectedProducts.length === 0) {
//         toast.error("Please select at least one product.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//       if (!marker) {
//         toast.error("Please select a location on the map.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     }
//   };

//   const handleWithSubscriptionClick = () => {
//     if (selectedProducts.length > 0 && marker) {
//       const locationData = {
//         name: locationDetails.name,
//         address: locationDetails.address,
//         coordinates: locationDetails.coordinates,
//         selectedProducts: selectedProducts,
//         formattedLocation: locationDetails.name
//           ? `${locationDetails.name}, ${locationDetails.address}`
//           : locationDetails.address,
//       };

//       navigate("/subscription", {
//         state: {
//           totalPrice: total,
//           locationDetails: locationData,
//           selectedProducts: selectedProducts,
//         },
//       });
//     } else {
//       if (selectedProducts.length === 0) {
//         toast.error("Please select at least one product.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//       if (!marker) {
//         toast.error("Please select a location on the map.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     }
//   };

//   const handleProductChange = (e) => {
//     const productId = parseInt(e.target.value);
//     const product = plants.find((p) => p.id === productId);

//     const existingProductIndex = selectedProducts.findIndex(
//       (p) => p.id === productId
//     );

//     if (existingProductIndex > -1) {
//       const updatedProducts = [...selectedProducts];
//       updatedProducts[existingProductIndex].quantity += quantity;
//       setSelectedProducts(updatedProducts);
//     } else {
//       setSelectedProducts([...selectedProducts, { ...product, quantity }]);
//     }

//     setQuantity(1);
//   };

//   const handleRemoveProduct = (productId) => {
//     const updatedProducts = selectedProducts.filter(
//       (product) => product.id !== productId
//     );
//     setSelectedProducts(updatedProducts);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Select Your Product</h2>
//       <div className="space-y-4">
//         <select
//           onChange={handleProductChange}
//           className="w-full border rounded px-4 py-2"
//         >
//           <option value="" disabled>
//             Select a product
//           </option>
//           {plants.map((product) => (
//             <option key={product.id} value={product.id}>
//               {product.name} - ${product.price}
//             </option>
//           ))}
//         </select>

//         <div className="flex items-center space-x-4">
//           <input
//             type="number"
//             value={quantity}
//             min="1"
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-20 border rounded px-2 py-1"
//           />
//           <span>Total: ${total.toFixed(2)}</span>
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">Selected Products</h2>
//       {selectedProducts.length > 0 ? (
//         <ul className="space-y-2">
//           {selectedProducts.map((product) => (
//             <li
//               key={product.id}
//               className="flex justify-between items-center border p-2 rounded"
//             >
//               <span>
//                 {product.name} (x{product.quantity})
//               </span>
//               <span>${(product.price * product.quantity).toFixed(2)}</span>
//               <button
//                 onClick={() => handleRemoveProduct(product.id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No products selected.</p>
//       )}

//       <h2 className="text-2xl font-bold mb-4">Select Location on Map</h2>
//       <div className="h-96 w-full rounded-lg overflow-hidden border">
//         <MapContainer
//           center={location}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {marker && (
//             <Marker
//               position={marker}
//               icon={L.divIcon({
//                 className: "custom-marker",
//                 html: '<div style="color: red;">📍</div>',
//               })}
//             />
//           )}
//           <MapClickHandler />
//         </MapContainer>
//       </div>

//       {marker && (
//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold">Selected Location:</h3>
//           <div className="space-y-2">
//             {isLoading ? (
//               <input
//                 type="text"
//                 value="Loading location details..."
//                 readOnly
//                 className="w-full px-4 py-2 border rounded bg-gray-50"
//               />
//             ) : (
//               <>
//                 {locationDetails.name && (
//                   <input
//                     type="text"
//                     value={locationDetails.name}
//                     readOnly
//                     className="w-full px-4 py-2 border rounded bg-gray-50 font-semibold"
//                   />
//                 )}
//                 <input
//                   type="text"
//                   value={locationDetails.address}
//                   readOnly
//                   className="w-full px-4 py-2 border rounded bg-gray-50"
//                 />
//                 <input
//                   type="text"
//                   value={`Lat: ${locationDetails.coordinates?.lat}, Long: ${locationDetails.coordinates?.lon}`}
//                   readOnly
//                   className="w-full px-4 py-2 border rounded bg-gray-50 font-mono text-sm"
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="flex space-x-4">
//         <button
//           onClick={handleWithSubscriptionClick}
//           className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
//         >
//           With Subscription
//         </button>
//         <button
//           onClick={handleWithoutSubscriptionClick}
//           className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Without Subscription
//         </button>
//       </div>
//       {showPaymentForm && (
//         <PaymentForm
//           onClose={() => setShowPaymentForm(false)}
//           totalPrice={`$${total.toFixed(2)}`}
//         />
//       )}
//     </div>
//   );
// };

// export default PlantService;
