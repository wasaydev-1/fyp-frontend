// import React, { useState, useEffect } from "react";
// import AdditionalInfo from "./Product/AdditonInfo/AdditionalInfo";
// import Product from "./Product/ProductMain/Product";
// import RelatedProducts from "./Product/RelatedProducts/RelatedProducts";

// const DetailsProduct = () => {
//   const [selectedProductID, setSelectedProductID] = useState(
//     localStorage.getItem("selectedProductID")
//   );

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setSelectedProductID(localStorage.getItem("selectedProductID"));
//     };

//     // Listen for changes in localStorage
//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <>
//       {/* Pass selectedProductID to AdditionalInfo */}
//       <Product key={selectedProductID} />
//       <AdditionalInfo selectedProductID={selectedProductID} />
//       {/* Pass the setter function to RelatedProducts */}
//       <RelatedProducts setSelectedProductID={setSelectedProductID} />
//     </>
//   );
// };

// export default DetailsProduct;

// import React, { useState, useEffect } from "react";
// import AdditionalInfo from "./Product/AdditonInfo/AdditionalInfo";
// import Product from "./Product/ProductMain/Product";
// import RelatedProducts from "./Product/RelatedProducts/RelatedProducts";

// const DetailsProduct = () => {
//   const [selectedProductID, setSelectedProductID] = useState(null);

//   return (
//     <>
//       <Product
//         selectedProductID={selectedProductID}
//         setSelectedProductID={setSelectedProductID}
//       />
//       <AdditionalInfo selectedProductID={selectedProductID} />
//       <RelatedProducts setSelectedProductID={setSelectedProductID} />
//     </>
//   );
// };

// export default DetailsProduct;

import React from "react";
import { useParams } from "react-router-dom";
import AdditionalInfo from "./Product/AdditonInfo/AdditionalInfo";
import Product from "./Product/ProductMain/Product";
import RelatedProducts from "./Product/RelatedProducts/RelatedProducts";

const DetailsProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL

  return (
    <>
      <Product
        selectedProductID={id}
        setSelectedProductID={() => {}} // No-op function as routing handles selection
      />
      <AdditionalInfo selectedProductID={id} />
      <RelatedProducts
        selectedProductID={id}
        setSelectedProductID={() => {}} // No-op function as routing handles selection
      />
    </>
  );
};

export default DetailsProduct;
