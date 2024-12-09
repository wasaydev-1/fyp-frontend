// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Tooltip from "@mui/material/Tooltip";
// import Zoom from "@mui/material/Zoom";
// import { Link, useParams } from "react-router-dom";
// import { useCart } from "../../../context/CartContext";
// import "./Product.css";

// const Product = ({ selectedProductID, setSelectedProductID }) => {
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectSize, setSelectSize] = useState("S");
//   const [highlightedColor, setHighlightedColor] = useState("#C8393D");
//   const { addToCart, cart } = useCart();
//   const { id } = useParams(); // Get product ID from URL
//   const baseUrl = "http://localhost:3000/uploads/";

//   // Fetch product details from backend
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         // Use URL param or passed ID
//         const productId = id || selectedProductID;
//         if (productId) {
//           const response = await axios.get(
//             `http://localhost:3000/plants/${productId}`
//           );
//           setProduct(response.data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch product details:", error);
//       }
//     };

//     fetchProductDetails();
//   }, [id, selectedProductID]);

//   // Rest of the component remains similar to previous implementation
//   const getAddedQuantity = () => {
//     return cart.reduce((acc, item) => {
//       if (
//         item.id === product.id &&
//         item.size === selectSize &&
//         item.color === highlightedColor
//       ) {
//         acc += item.quantity;
//       }
//       return acc;
//     }, 0);
//   };

//   const increment = () => {
//     const addedQuantity = getAddedQuantity();
//     const availableQuantity = product.quantity - addedQuantity;
//     if (quantity < availableQuantity) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleInputChange = (event) => {
//     const value = parseInt(event.target.value);
//     const addedQuantity = getAddedQuantity();
//     const availableQuantity = product.quantity - addedQuantity;

//     if (!isNaN(value) && value > 0 && value <= availableQuantity) {
//       setQuantity(value);
//     }
//   };

//   const handleAddToCart = () => {
//     addToCart(product, quantity, selectSize, highlightedColor);
//   };

//   const sizes = ["XS", "S", "M", "L", "XL"];
//   const sizesFullName = [
//     "Extra Small",
//     "Small",
//     "Medium",
//     "Large",
//     "Extra Large",
//   ];

//   const colors = ["#222222", "#C8393D", "#E4E4E4"];
//   const colorsName = ["Black", "Red", "Grey"];

//   if (!product) {
//     return (
//       <div className="product">
//         <h3>Loading product...</h3>
//       </div>
//     );
//   }

//   const addedQuantity = getAddedQuantity();
//   const availableQuantity = product.quantity - addedQuantity;

//   return (
//     <div className="productSection mt-24">
//       <div className="productShowCase">
//         <div className="productGallery">
//           <div className="productFullImg">
//             <img src={`${baseUrl}${product.image}`} alt={product.name} />
//           </div>
//         </div>

//         <div className="productDetails">
//           <div className="productBreadcrumb">
//             <div className="breadcrumbLink">
//               <Link to="/">Home</Link>&nbsp;/&nbsp;
//               <Link to="/Page-Shop">The Shop</Link>
//             </div>
//           </div>
//           <div className="productName tracking-tight">
//             <h1>{product.name}</h1>
//           </div>

//           <div className="productPrice">
//             <h3>₨.{product.price}</h3>
//           </div>
//           <div className="productDescription">
//             <p>{product.description}</p>
//           </div>
//           <div className="productSizeColor">
//             <div className="productSize">
//               <p>Sizes</p>
//               <div className="sizeBtn">
//                 {sizes.map((size, index) => (
//                   <Tooltip
//                     key={size}
//                     title={sizesFullName[index]}
//                     placement="top"
//                     TransitionComponent={Zoom}
//                     enterTouchDelay={0}
//                     arrow
//                   >
//                     <button
//                       style={{
//                         borderColor: selectSize === size ? "#000" : "#e0e0e0",
//                       }}
//                       onClick={() => setSelectSize(size)}
//                     >
//                       {size}
//                     </button>
//                   </Tooltip>
//                 ))}
//               </div>
//             </div>
//             <div className="productColor">
//               <p>Color</p>
//               <div className="colorBtn">
//                 {colors.map((color, index) => (
//                   <Tooltip
//                     key={color}
//                     title={colorsName[index]}
//                     placement="top"
//                     enterTouchDelay={0}
//                     TransitionComponent={Zoom}
//                     arrow
//                   >
//                     <button
//                       className={
//                         highlightedColor === color ? "highlighted" : ""
//                       }
//                       style={{
//                         backgroundColor: color.toLowerCase(),
//                         border:
//                           highlightedColor === color
//                             ? "0px solid #000"
//                             : "0px solid white",
//                         padding: "8px",
//                         margin: "5px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setHighlightedColor(color)}
//                     />
//                   </Tooltip>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="productCartQuantity">
//             <div className="productQuantity">
//               {availableQuantity === 0 ? (
//                 <span style={{ color: "red", fontWeight: "bold" }}>
//                   No Stock Available
//                 </span>
//               ) : (
//                 <>
//                   <button onClick={decrement} disabled={quantity <= 1}>
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     value={quantity}
//                     onChange={handleInputChange}
//                     min="1"
//                     max={availableQuantity}
//                   />
//                   <button
//                     onClick={increment}
//                     disabled={quantity >= availableQuantity}
//                   >
//                     +
//                   </button>
//                 </>
//               )}
//             </div>

//             {availableQuantity > 0 && (
//               <div className="productCartBtn">
//                 <button onClick={handleAddToCart}>Add to Cart</button>
//               </div>
//             )}
//           </div>

//           <div className="productTags">
//             <p>
//               <span>SKU: </span>
//               {product.quantity && product.quantity > 0 ? "In Stock" : "N/A"}
//             </p>
//             <div className="productCategory">
//               <p>
//                 <strong>CATEGORIES:</strong> {product.category}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Product.css";

const Product = ({ selectedProductID, setSelectedProductID }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectSize, setSelectSize] = useState("S");
  const [highlightedColor, setHighlightedColor] = useState("#C8393D");
  const { addToCart, cart } = useCart();
  const { id } = useParams();
  const baseUrl = "http://localhost:3000/uploads/";

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productId = id || selectedProductID;
        if (productId) {
          const response = await axios.get(
            `http://localhost:3000/plants/${productId}`
          );
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [id, selectedProductID]);

  const getAddedQuantity = () => {
    return cart.reduce((acc, item) => {
      if (
        item.id === product.id &&
        item.size === selectSize &&
        item.color === highlightedColor
      ) {
        acc += item.quantity;
      }
      return acc;
    }, 0);
  };

  const increment = () => {
    const addedQuantity = getAddedQuantity();
    const availableQuantity = product.quantity - addedQuantity;
    if (quantity < availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    const addedQuantity = getAddedQuantity();
    const availableQuantity = product.quantity - addedQuantity;

    if (!isNaN(value) && value > 0 && value <= availableQuantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const addedQuantity = getAddedQuantity();
    const availableQuantity = product.quantity - addedQuantity;

    if (quantity <= availableQuantity) {
      addToCart(product, quantity, selectSize, highlightedColor);
    } else {
      alert(`Only ${availableQuantity} items available in stock`);
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL"];
  const sizesFullName = [
    "Extra Small",
    "Small",
    "Medium",
    "Large",
    "Extra Large",
  ];

  const colors = ["#222222", "#C8393D", "#E4E4E4"];
  const colorsName = ["Black", "Red", "Grey"];

  if (!product) {
    return (
      <div className="product">
        <h3>Loading product...</h3>
      </div>
    );
  }

  const addedQuantity = getAddedQuantity();
  const availableQuantity = product.quantity - addedQuantity;
  const isOutOfStock = availableQuantity <= 0;

  return (
    <div className="productSection mt-24">
      <div className="productShowCase">
        <div className="productGallery">
          <div className="productFullImg">
            <img src={`${baseUrl}${product.image}`} alt={product.name} />
          </div>
        </div>

        <div className="productDetails">
          <div className="productBreadcrumb">
            <div className="breadcrumbLink">
              <Link to="/">Home</Link>&nbsp;/&nbsp;
              <Link to="/Page-Shop">The Shop</Link>
            </div>
          </div>
          <div className="productName tracking-tight">
            <h1>{product.name}</h1>
          </div>

          <div className="productPrice">
            <h3>₨.{product.price}</h3>
          </div>
          <div className="productDescription">
            <p>{product.description}</p>
          </div>
          <div className="productSizeColor">
            <div className="productSize">
              <p>Sizes</p>
              <div className="sizeBtn">
                {sizes.map((size, index) => (
                  <Tooltip
                    key={size}
                    title={sizesFullName[index]}
                    placement="top"
                    TransitionComponent={Zoom}
                    enterTouchDelay={0}
                    arrow
                  >
                    <button
                      style={{
                        borderColor: selectSize === size ? "#000" : "#e0e0e0",
                        opacity: isOutOfStock ? 0.5 : 1,
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                      }}
                      onClick={() => !isOutOfStock && setSelectSize(size)}
                      disabled={isOutOfStock}
                    >
                      {size}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div className="productColor">
              <p>Color</p>
              <div className="colorBtn">
                {colors.map((color, index) => (
                  <Tooltip
                    key={color}
                    title={colorsName[index]}
                    placement="top"
                    enterTouchDelay={0}
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <button
                      className={
                        highlightedColor === color ? "highlighted" : ""
                      }
                      style={{
                        backgroundColor: color.toLowerCase(),
                        border:
                          highlightedColor === color
                            ? "0px solid #000"
                            : "0px solid white",
                        padding: "8px",
                        margin: "5px",
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                        opacity: isOutOfStock ? 0.5 : 1,
                      }}
                      onClick={() =>
                        !isOutOfStock && setHighlightedColor(color)
                      }
                      disabled={isOutOfStock}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          <div className="productCartQuantity">
            <div className="productQuantity">
              {isOutOfStock ? (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Out of Stock
                </span>
              ) : (
                <>
                  <button onClick={decrement} disabled={quantity <= 1}>
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    min="1"
                    max={availableQuantity}
                  />
                  <button
                    onClick={increment}
                    disabled={quantity >= availableQuantity}
                  >
                    +
                  </button>
                </>
              )}
            </div>

            {!isOutOfStock && (
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            )}
          </div>

          <div className="productTags">
            <p>
              <span>SKU: </span>
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </p>
            <div className="productCategory">
              <p>
                <strong>CATEGORIES:</strong> {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
