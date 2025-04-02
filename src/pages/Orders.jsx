import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return;
      }

      setIsLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders", 
        {},
        { headers: { token } }
      );
      
      setTimeout(() => {
        setIsLoading(false);
        if (response.data.success) {
          let allOrdersItem = [];
          response.data.orders.forEach((order) => {
            order.items.forEach((item) => {
              allOrdersItem.push({
                ...item,
                status: order.status,
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                date: order.date,
              });
            });
          });
          setOrderData(allOrdersItem.reverse());
        }
      }, 400);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl flex justify-between p-2 text-center">
        <Title text1={"MY"} text2={"ORDERS"} />
        <button
          onClick={loadOrderData}
          className="border px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Track Order"}
          {isLoading && <CircularProgress size={20} />}
        </button>
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image?.[0] || "/placeholder.jpg"}
                  alt={item.name || "Product Image"}
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name || "Unknown Product"}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{currency}{item.price || "0.00"}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
