import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("plants");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [plants, setPlants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [payments, setPayments] = useState([]);
  const baseUrl = "http://localhost:3000/uploads/";
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    image: null,
  });

  const categories = [
    "Indoor Plants",
    "Outdoor Plants",
    "Fruits",
    "Herbs",
    "Flowers",
    "Vegetables",
  ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch Plants
  //       const plantsResponse = await axios.get("http://localhost:3000/plants");
  //       setPlants(plantsResponse.data.data);
  //       console.log("Fetched Plants:", plantsResponse.data.data); // Log fetched data directly
  //       const paymentsResponse = await axios.get(
  //         "http://localhost:3000/payments"
  //       );
  //       setPayments(paymentsResponse.data);
  //     } catch (error) {
  //       console.error("Error fetching plants:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Plants
        const plantsResponse = await axios.get("http://localhost:3000/plants");
        setPlants(plantsResponse.data.data);
        console.log("Fetched Plants:", plantsResponse.data.data); // Log fetched data directly

        // Fetch Orders
        const ordersResponse = await axios.get("http://localhost:3000/order");
        setOrders(ordersResponse.data);
        console.log("Fetched Orders:", ordersResponse.data);

        // Fetch Payments
        const paymentsResponse = await axios.get(
          "http://localhost:3000/payments"
        );
        setPayments(paymentsResponse.data);
        console.log("Fetched Payments:", paymentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const userResponse = await axios.get("http://localhost:3000/user");
      setUsers(userResponse.data.data);
    };

    fetchData();
  }, []);
  console.log("users", users);

  // Empty dependency array ensures this runs only once
  // Fetch data on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //  try {
  // Fetch Plants
  // const plantsResponse = await axios.get("http://localhost:3000/plants");
  // setPlants(plantsResponse.data);

  // Fetch Orders
  //   const ordersResponse = await axios.get("http://localhost:3000/orders");
  //   setOrders(ordersResponse.data);

  //   // Fetch Payments
  //   const paymentsResponse = await axios.get("http://localhost:3000/payments");
  //   setPayments(paymentsResponse.data);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
  //};

  //   fetchData();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setPreviewImage(URL.createObjectURL(files[0]));
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("quantity", formData.quantity);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("category", formData.category);

      if (formData.image) {
        formDataToSubmit.append("image", formData.image);
      }

      // Send POST request to add new plant
      const response = await axios.post(
        "http://localhost:3000/plants",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update local state with new plant
      setPlants([...plants, response.data]);

      // Reset form and close modal
      setFormData({
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
        image: null,
      });
      setPreviewImage(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to remove plant
      await axios.delete(`http://localhost:3000/plants/${id}`);

      // Update local state
      setPlants(plants.filter((plant) => plant.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      // Send DELETE request to remove plant
      await axios.delete(`http://localhost:3000/user/${id}`);

      // Update local state
      setPlants(users.filter((user) => user.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  // const handleDispatch = async (orderId) => {
  //   try {
  //     // Send PATCH request to update order status
  //     const response = await axios.patch(`http://localhost:3000/orders/${orderId}`, {
  //       status: "Dispatched"
  //     });

  //     // Update local state
  //     setOrders(
  //       orders.map((order) =>
  //         order.id === orderId ? response.data : order
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error dispatching order:", error);
  //   }
  // };

  // const handleDispatch = (orderId) => {
  //   setOrders(
  //     orders.map((order) =>
  //       order.id === orderId ? { ...order, status: "Dispatched" } : order
  //     )
  //   );
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed">
          <div className="p-4">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Logo"
              className="w-auto mx-auto mb-8"
            />
            <nav>
              <button
                onClick={() => setActiveTab("plants")}
                className={`flex items-center p-3 w-52 text-left mb-2 rounded ${
                  activeTab === "plants"
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FiPackage className="mr-2" /> Plants Management
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center p-3 w-48 text-left mb-2 rounded ${
                  activeTab === "orders"
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FiShoppingBag className="mr-2" /> Orders
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`flex items-center p-3 w-48 text-left mb-2 rounded ${
                  activeTab === "payments"
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FiDollarSign className="mr-2" /> Payments
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center p-3 w-48 text-left mb-2 rounded ${
                  activeTab === "users"
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FiUser className="mr-2" /> Users
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8 w-full bg-gray-200">
          {/* Plants Management */}
          {activeTab === "plants" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Plants Management</h2>
                <button
                  onClick={() => {
                    setModalType("add");
                    setShowModal(true);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <BiPlus className="mr-2" /> Add New Plant
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {plants.map((plant) => (
                      <tr key={plant.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`${baseUrl}${plant.image}`}
                            alt={plant.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {plant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${plant.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {plant.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {plant.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-700">
                              <FiEye size={18} />
                            </button>
                            <button className="text-green-500 hover:text-green-700">
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedItem(plant);
                                setModalType("delete");
                                setShowModal(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Orders</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plant Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {`${order.firstName} ${order.lastName}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Users</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-700">
                              <FiEye size={18} />
                            </button>
                            <button className="text-green-500 hover:text-green-700">
                              <FiEdit size={18} />
                            </button>
                            {/* <button
                              onClick={() => {
                                setSelectedItem();
                                setModalType("delete");
                                setShowModal(true);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 size={18} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments */}
          {activeTab === "payments" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Payments</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.paymentMethodId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(payment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-8">
            {modalType === "add" && (
              <>
                <h3 className="text-2xl font-bold mb-4">Add New Plant</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        accept="image/*"
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="mt-2 h-32 w-32 object-cover rounded-md"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Add Plant
                    </button>
                  </div>
                </form>
              </>
            )}

            {modalType === "delete" && (
              <>
                <h3 className="text-2xl font-bold mb-4">Delete Plant</h3>
                <p className="mb-6">
                  Are you sure you want to delete {selectedItem?.name}?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(selectedItem?.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

// import React, { useState } from "react";
// import {
//   FiEdit,
//   FiTrash2,
//   FiEye,
//   FiDollarSign,
//   FiPackage,
//   FiShoppingBag,
// } from "react-icons/fi";
// import { BiPlus } from "react-icons/bi";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("plants");
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   // Dummy data
//   const [plants, setPlants] = useState([
//     {
//       id: 1,
//       name: "Snake Plant",
//       price: 24.99,
//       quantity: 50,
//       category: "Indoor Plants",
//       image: "https://example.com/snake-plant.jpg",
//       description: "Low-maintenance indoor plant perfect for beginners",
//     },
//     {
//       id: 2,
//       name: "Lavender",
//       price: 19.99,
//       quantity: 30,
//       category: "Herbs",
//       image: "https://example.com/lavender.jpg",
//       description: "Fragrant herb with beautiful purple flowers",
//     },
//     {
//       id: 3,
//       name: "Tomato Plant",
//       price: 12.99,
//       quantity: 25,
//       category: "Vegetables",
//       image: "https://example.com/tomato-plant.jpg",
//       description: "Grow your own delicious tomatoes at home",
//     },
//   ]);

//   const [orders, setOrders] = useState([
//     {
//       id: "ORD-001",
//       firstName: "John",
//       lastName: "Doe",
//       createdAt: new Date("2024-01-15"),
//       total: 49.98,
//       quantity: 2,
//       name: "Snake Plant",
//       status: "Pending",
//     },
//     {
//       id: "ORD-002",
//       firstName: "Jane",
//       lastName: "Smith",
//       createdAt: new Date("2024-01-20"),
//       total: 19.99,
//       quantity: 1,
//       name: "Lavender",
//       status: "Dispatched",
//     },
//   ]);

//   const [payments, setPayments] = useState([
//     {
//       id: "PAY-001",
//       paymentMethodId: "Credit Card - *1234",
//       amount: 49.98,
//       createdAt: new Date("2024-01-15"),
//       status: "Completed",
//     },
//     {
//       id: "PAY-002",
//       paymentMethodId: "PayPal - jsmith@email.com",
//       amount: 19.99,
//       createdAt: new Date("2024-01-20"),
//       status: "Pending",
//     },
//   ]);

//   const categories = [
//     "Indoor Plants",
//     "Outdoor Plants",
//     "Fruits",
//     "Herbs",
//     "Flowers",
//     "Vegetables",
//   ];

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     description: "",
//     category: "",
//     image: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image" && files[0]) {
//       setPreviewImage(URL.createObjectURL(files[0]));
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newPlant = {
//       id: plants.length + 1,
//       ...formData,
//       price: parseFloat(formData.price),
//       quantity: parseInt(formData.quantity),
//     };

//     setPlants([...plants, newPlant]);
//     setFormData({
//       name: "",
//       price: "",
//       quantity: "",
//       description: "",
//       category: "",
//       image: null,
//     });
//     setPreviewImage(null);
//     setShowModal(false);
//   };

//   const handleDelete = (id) => {
//     setPlants(plants.filter((plant) => plant.id !== id));
//     setShowModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="flex">
//         {/* Sidebar */}
//         <div className="w-64 bg-white h-screen shadow-lg fixed">
//           <div className="p-4">
//             <img
//               src="https://via.placeholder.com/150"
//               alt="Logo"
//               className="w-32 mx-auto mb-8"
//             />
//             <nav>
//               <button
//                 onClick={() => setActiveTab("plants")}
//                 className={`flex items-center p-3 w-full text-left mb-2 rounded ${
//                   activeTab === "plants"
//                     ? "bg-green-500 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 <FiPackage className="mr-2" /> Plants Management
//               </button>
//               <button
//                 onClick={() => setActiveTab("orders")}
//                 className={`flex items-center p-3 w-full text-left mb-2 rounded ${
//                   activeTab === "orders"
//                     ? "bg-green-500 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 <FiShoppingBag className="mr-2" /> Orders
//               </button>
//               <button
//                 onClick={() => setActiveTab("payments")}
//                 className={`flex items-center p-3 w-full text-left mb-2 rounded ${
//                   activeTab === "payments"
//                     ? "bg-green-500 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 <FiDollarSign className="mr-2" /> Payments
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="ml-64 p-8 w-full">
//           {/* Plants Management */}
//           {activeTab === "plants" && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold">Plants Management</h2>
//                 <button
//                   onClick={() => {
//                     setModalType("add");
//                     setShowModal(true);
//                   }}
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   <BiPlus className="mr-2" /> Add New Plant
//                 </button>
//               </div>

//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Image
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Price
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Quantity
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Category
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {plants.map((plant) => (
//                       <tr key={plant.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <img
//                             src={
//                               plant.image || "https://via.placeholder.com/50"
//                             }
//                             alt={plant.name}
//                             className="h-12 w-12 rounded-full object-cover"
//                           />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {plant.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           ${plant.price.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {plant.quantity}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {plant.category}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex space-x-2">
//                             <button className="text-blue-500 hover:text-blue-700">
//                               <FiEye size={18} />
//                             </button>
//                             <button className="text-green-500 hover:text-green-700">
//                               <FiEdit size={18} />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setSelectedItem(plant);
//                                 setModalType("delete");
//                                 setShowModal(true);
//                               }}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               <FiTrash2 size={18} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Orders */}
//           {activeTab === "orders" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Orders</h2>
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Order Number
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Amount
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Quantity
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Plant Name
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {orders.map((order) => (
//                       <tr key={order.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {order.id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {`${order.firstName} ${order.lastName}`}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {order.createdAt.toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           })}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           ${order.total.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               order.status === "Pending"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-green-100 text-green-800"
//                             }`}
//                           >
//                             {order.quantity}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {order.name}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Payments */}
//           {activeTab === "payments" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Payments</h2>
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Payment ID
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Amount
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {payments.map((payment) => (
//                       <tr key={payment.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {payment.id}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {payment.paymentMethodId}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           ${payment.amount.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {payment.createdAt.toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           })}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               payment.status === "Pending"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-green-100 text-green-800"
//                             }`}
//                           >
//                             {payment.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-xl w-full p-8">
//             {modalType === "add" && (
//               <>
//                 <h3 className="text-2xl font-bold mb-4">Add New Plant</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="col-span-2 sm:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                         required
//                         step="0.01"
//                       />
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Category
//                       </label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                         required
//                       >
//                         <option value="">Select category</option>
//                         {categories.map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Description
//                       </label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                         rows="3"
//                         required
//                       ></textarea>
//                     </div>
//                     <div className="col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Image
//                       </label>
//                       <input
//                         type="file"
//                         name="image"
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded-md"
//                         accept="image/*"
//                       />
//                       {previewImage && (
//                         <img
//                           src={previewImage}
//                           alt="Preview"
//                           className="mt-2 h-32 w-32 object-cover rounded-md"
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <div className="mt-6 flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                       className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                     >
//                       Add Plant
//                     </button>
//                   </div>
//                 </form>
//               </>
//             )}

//             {modalType === "delete" && (
//               <>
//                 <h3 className="text-2xl font-bold mb-4">Delete Plant</h3>
//                 <p className="mb-6">
//                   Are you sure you want to delete {selectedItem?.name}?
//                 </p>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleDelete(selectedItem?.id)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
