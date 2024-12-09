// import React, { useState, useEffect } from "react";
// import "./AdditionalInfo.css";
// import StoreData from "../../../Data/StoreData";

// const AdditionalInfo = ({ selectedProductID }) => {
//   const [product, setProduct] = useState(null);
//   const [activeTab, setActiveTab] = useState("description");

//   useEffect(() => {
//     // Find the product by selectedProductID from StoreData
//     const selectedProduct = StoreData.find(
//       (product) => product.productID === parseInt(selectedProductID)
//     );
//     setProduct(selectedProduct);
//   }, [selectedProductID]);

//   if (!product) {
//     return <div>Loading product info...</div>; // Loading state while product details are being fetched
//   }

//   const handleTabClick = (tab) => {
//     setActiveTab(tab); // Switch between tabs (Description / Additional Information)
//   };

//   return (
//     <>
//       <div className="productAdditionalInfo">
//         <div className="productAdditonalInfoContainer">
//           <div className="productAdditionalInfoTabs">
//             <div className="aiTabs">
//               {/* Description Tab */}
//               <p
//                 onClick={() => handleTabClick("description")}
//                 className={activeTab === "description" ? "aiActive" : ""}
//               >
//                 Description
//               </p>

//               {/* Additional Information Tab */}
//               <p
//                 onClick={() => handleTabClick("additionalInfo")}
//                 className={activeTab === "additionalInfo" ? "aiActive" : ""}
//               >
//                 Additional Information
//               </p>
//             </div>
//           </div>

//           <div className="productAdditionalInfoContent">
//             {/* Tab1: Description */}
//             {activeTab === "description" && (
//               <div className="aiTabDescription">
//                 <div className="descriptionPara">
//                   <h3>{product.productName}</h3>
//                   <p>{product.longDescription}</p> {/* Fetch long description */}
//                 </div>
//               </div>
//             )}

//             {/* Tab2: Additional Info */}
//             {activeTab === "additionalInfo" && (
//               <div className="aiTabAdditionalInfo">
//                 <div className="additionalInfoContainer">
//                   <h6>Weight</h6>
//                   <p>{product.weight || "1.25 kg"}</p> {/* Fetch weight or default */}
//                 </div>
//                 <div className="additionalInfoContainer">
//                   <h6>Dimensions</h6>
//                   <p>{product.dimensions || "90 x 60 x 90 cm"}</p> {/* Fetch dimensions or default */}
//                 </div>
//                 <div className="additionalInfoContainer">
//                   <h6>Size</h6>
//                   <p> XS, S, M, L, XL</p> {/* Hardcoded size */}
//                 </div>
//                 <div className="additionalInfoContainer">
//                   <h6>Color</h6>
//                   <p> Black, Orange, White</p> {/* Hardcoded color */}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdditionalInfo;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdditionalInfo.css";

const AdditionalInfo = ({ selectedProductID }) => {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (selectedProductID) {
          const response = await axios.get(
            `http://localhost:3000/plants/${selectedProductID}`
          );
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [selectedProductID]);

  if (!product) {
    return <div>Loading product info...</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="productAdditionalInfo">
      <div className="productAdditonalInfoContainer">
        <div className="productAdditionalInfoTabs">
          <div className="aiTabs">
            <p
              onClick={() => handleTabClick("description")}
              className={activeTab === "description" ? "aiActive" : ""}
            >
              Description
            </p>
            <p
              onClick={() => handleTabClick("additionalInfo")}
              className={activeTab === "additionalInfo" ? "aiActive" : ""}
            >
              Additional Information
            </p>
          </div>
        </div>

        <div className="productAdditionalInfoContent">
          {activeTab === "description" && (
            <div className="aiTabDescription">
              <div className="descriptionPara">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          )}

          {activeTab === "additionalInfo" && (
            <div className="aiTabAdditionalInfo">
              <div className="additionalInfoContainer">
                <h6>Category</h6>
                <p>{product.category}</p>
              </div>
              <div className="additionalInfoContainer">
                <h6>Price</h6>
                <p>₨.{product.price}</p>
              </div>
              <div className="additionalInfoContainer">
                <h6>Quantity</h6>
                <p>{product.quantity} in stock</p>
              </div>
              <div className="additionalInfoContainer">
                <h6>Size</h6>
                <p>XS, S, M, L, XL</p>
              </div>
              <div className="additionalInfoContainer">
                <h6>Color</h6>
                <p>Black, Red, Grey</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
