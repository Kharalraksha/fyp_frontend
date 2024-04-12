import myKey from "./khaltiKey";

const config = {
  publicKey: myKey.publicTestKey, // Replace with your Khalti public key
  productIdentity: "123766", // Unique identifier for your product or service
  productName: "My Ecommerce Store", // Name of your product or service
  productUrl: "http://localhost:3000", // URL of your website or application
  eventHandler: {
    onSuccess: async (payload) => {
      try {
        const data = {
          token: payload.token,
          amount: payload.amount,
        };

        // Send a request to your server for payment verification
        const response = await axios.post(
          "http://localhost:3000/api/payment/add",
          {
            token: data.token,
            amount: data.amount,
            // Add any additional data you need for payment verification
          },
          {
            headers: {
              Authorization: `Bearer ${myKey.secretKey}`, // Add your Khalti secret key for authorization
            },
          }
        );

        console.log("Payment Info:", response.data);
        alert("Payment successful. Thank you for your generosity.");
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Payment failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    },
    onClose: () => {
      console.log("Widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
