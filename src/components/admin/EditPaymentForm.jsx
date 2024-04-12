import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Popup from "reactjs-popup";

const EditPaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    user_id: "",
    appointment_id: "",
    amount: "",
    details: "",
  });
  const [open, setOpen] = useState(false);
  const { paymentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/payment/get/{payment_id}"
        );
        setPaymentData(response.data); // Set the fetched data as initial state
      } catch (error) {
        console.error("Error fetching payment data: ", error);
      }
    };

    fetchData();
  }, [paymentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/payment/edit/${paymentId}`,
        paymentData
      );
      console.log("Update Response:", response.data);
      toast.success("Payment updated successfully");
      navigate("/payment");
    } catch (error) {
      console.error("Error updating payment data: ", error);
      toast.error("Failed to update payment");
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        nested
        className=""
      >
        <div className="modal bg-blue-200 rounded shadow-lg p-5 max-w-sm w-full">
          <a
            className="close cursor-pointer float-right top-0 right-0 mt-2 mr-2 text-lg"
            onClick={closeModal}
          >
            &times;
          </a>
          <div className="text-center">
            <p className="text-base font-semibold mb-4">
              Are you sure you want to update this payment?
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700 mr-20"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 ml-20"
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </div>
      </Popup>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md">
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User ID:
              </label>
              <input
                type="text"
                id="userId"
                value={paymentData.user_id}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, user_id: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="appointmentId"
                className="block text-sm font-medium text-gray-700"
              >
                Appointment ID:
              </label>
              <input
                type="text"
                id="appointmentId"
                value={paymentData.appointment_id}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    appointment_id: e.target.value,
                  })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount:
              </label>
              <input
                type="text"
                id="amount"
                value={paymentData.amount}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, amount: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Details:
              </label>
              <input
                type="text"
                id="details"
                value={paymentData.details}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, details: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4"
            >
              Update Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPaymentForm;
