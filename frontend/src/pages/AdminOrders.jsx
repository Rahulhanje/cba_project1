import React, { useEffect, useState } from "react";
import API from "../../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await API.put(`/orders/status`, { orderId: id, status });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Products</th>
              <th className="py-2 px-4">Total Price</th>
              <th className="py-2 px-4">Order Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b">
                <td className="py-2 px-4">{o._id}</td>
                <td className="py-2 px-4">{o.userId}</td>
                <td className="py-2 px-4">
                  {o.orderItems?.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <span className="font-medium">Product:</span>{" "}
                      {item.product} <br />
                      <span className="font-medium">Qty:</span> {item.qty}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">${o.totalPrice}</td>
                <td className="py-2 px-4">
                  {new Date(o.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="py-2 px-4">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
