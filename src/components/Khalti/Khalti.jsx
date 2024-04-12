import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import config from "./khaltiConfig"; // Ensure this is correctly imported

const Khalti = ({ user_Id, appointment_Id, amount, authToken = "" }) => {
  console.log(user_Id, appointment_Id);
  // Assuming amount is already in Rupees and needs to be converted to Paisa for Khalti
  const validAmount = Number(200) * 100; // Convert Rupees to Paisa

  const handleSuccess = async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/add",
        {
          user_Id: user_Id,
          token: payload.token, // This is the Khalti payment token, not to be confused with the auth token
          amount: validAmount,
          appointment_Id: appointment_Id,
          details: "Payment through Khalti",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // authToken is your user's auth token
          },
        }
      );

      console.log("Payment Info:", response.data);
      alert("Payment successful. Thank you for your generosity.");
    } catch (error) {
      console.error(
        "Payment Error:",
        error.response ? error.response.data : error
      );
      alert("Payment failed. Please try again.");
    }
  };

  // Adjusted config to use amount in Paisa
  const checkoutConfig = {
    ...config,
    amount: validAmount,
    eventHandler: {
      ...config.eventHandler,
      onSuccess: handleSuccess,
      // onError and onClose can remain as they are or be adjusted as needed
    },
  };

  // Initialize KhaltiCheckout with the adjusted config
  const checkout = new KhaltiCheckout(checkoutConfig);

  const handlePayment = () => {
    // Show Khalti widget
    checkout.show({ amount: validAmount });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "55px", // Adjust this margin as needed
      }}
    >
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "purple",
          color: "white",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Pay Via Khalti
      </button>
    </div>
  );
};

export default Khalti;
