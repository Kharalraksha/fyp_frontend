import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Popup from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/payment/get");
      console.log("API Response:", response.data);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payment data: ", error);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/payment/delete/${paymentId}`
      );
      setPayments(
        payments.filter((payment) => payment.payment_Id !== paymentId)
      );
      closeModal();
      toast.success("Payment deleted successfully");
    } catch (error) {
      console.error("Error deleting the payment: ", error);
      closeModal();
      toast.error("Failed to delete the payment");
    }
  };

  const handleEditPayment = (paymentId) => {
    navigate(`/editpayment/${paymentId}`);
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <Navbar />
      </div>
      <div className="overflow-x-auto ml-60 mr-0">
        {payments.length > 0 && (
          <div className="overflow-x-auto mt-12">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 border-r">Payment ID</th>
                  <th className="py-2 px-4 border-r">User ID</th>
                  <th className="py-2 px-4 border-r">Appointment ID</th>
                  <th className="py-2 px-4 border-r">Amount</th>
                  <th className="py-2 px-4 border-r">Details</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-2 px-4 border-r">{payment.payment_Id}</td>
                    <td className="py-2 px-4 border-r">{payment.user_Id}</td>
                    <td className="py-2 px-4 border-r">
                      {payment.appointment_Id}
                    </td>
                    <td className="py-2 px-4 border-r">{payment.amount}</td>
                    <td className="py-2 px-4 border-r">{payment.details}</td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                        onClick={() => handleEditPayment(payment.payment_Id)}
                      >
                        <Link to={`/EditPaymentForm/${payment.payment_Id}`}>
                          Edit
                        </Link>
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => setOpen(true)}
                      >
                        Delete
                      </button>
                      <Popup
                        open={open}
                        closeOnDocumentClick
                        onClose={closeModal}
                        modal
                        nested
                        className=""
                      >
                        <div className="modal bg-rose-200 rounded shadow-lg p-5 max-w-sm w-full">
                          <a
                            className="close cursor-pointer float-right top-0 right-0 mt-2 mr-2 text-lg"
                            onClick={closeModal}
                          >
                            &times;
                          </a>
                          <div className="text-center">
                            <p className="text-base font-semibold mb-4">
                              Are you sure you want to delete this payment?
                            </p>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-700 mr-20"
                              onClick={() =>
                                handleDeletePayment(payment.payment_Id)
                              }
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
