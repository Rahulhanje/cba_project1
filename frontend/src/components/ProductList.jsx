// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../../api";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await API.get("/products");
//         setProducts(response.data);
//       } catch (err) {
//         setError("Failed to fetch products. Please try again later.");
//         console.error("Error fetching products: ", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);
//   return (
//     <div>
//       {/* Error Message */}
//       {error && <div className="text-red-500 text-center mt-4">{error}</div>}

//       {/* Loading State */}
//       {loading ? (
//         <div className="text-center mt-4">Loading products...</div>
//       ) : (
//         <div>
//           {/* Section Title */}
//           <h2 className="text-2xl font-bold text-center my-4">Our Products</h2>

//           {/* Product List */}
//           <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{product.name}</h3>
//                   <p className="text-gray-600">${product.price}</p>
//                   <Link
//                     to={`/product/${product._id}`} // Adjust the path as needed
//                     className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching from backend with dummy data
    const fetchProducts = () => {
      try {
        // Dummy product data
        const dummyProducts = [
          {
            _id: "1",
            name: "Wireless Headphones",
            price: 59.99,
            image: "https://via.placeholder.com/300x200?text=Headphones",
          },
          {
            _id: "2",
            name: "Smart Watch",
            price: 129.99,
            image: "https://via.placeholder.com/300x200?text=Smart+Watch",
          },
          {
            _id: "3",
            name: "Gaming Mouse",
            price: 29.99,
            image: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
          },
          {
            _id: "4",
            name: "Mechanical Keyboard",
            price: 89.99,
            image: "https://via.placeholder.com/300x200?text=Keyboard",
          },
        ];

        setProducts(dummyProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products: ", err);
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay
    setTimeout(fetchProducts, 1000);
  }, []);

  return (
    <div>
      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Loading State */}
      {loading ? (
        <div className="text-center mt-4">Loading products...</div>
      ) : (
        <div>
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-center my-4">Our Products</h2>

          {/* Product List */}
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
