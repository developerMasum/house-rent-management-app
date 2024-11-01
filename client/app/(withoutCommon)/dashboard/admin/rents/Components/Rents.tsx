"use client";

import Loading from "@/components/Common/Loading";
import { useGetAllRentsQuery } from "@/redux/api/New/rentApi";
import { useState } from "react";

const Rents = () => {
  const { data, isLoading } = useGetAllRentsQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    payment: "",
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdate = (rent) => {
    setIsModalOpen(true);
    setFormData({
      payment: rent.name || "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data: ", formData);
    // API call to update details here
    handleCloseModal();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data?.map((rent) => (
        <div
          key={rent.roomId}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Room No: {rent.roomNo}</h2>
          <p className="text-gray-600">Floor No: {rent.floorNo}</p>
          <p className="text-gray-600">Room Rent: ${rent.roomRent}</p>
          <p className="text-gray-600">Due Amount: ${rent.dueAmount}</p>
          <p className="text-gray-600">
            Electricity Unit: {rent.electricityUnit} units
          </p>
          <p className="text-gray-600">
            Electricity Bill: ${rent.electricityBill}
          </p>
          <p className="text-gray-600">Total Rent: ${rent.totalRent}</p>
          <p className="text-gray-600">Paid: {rent.isPaid ? "Yes" : "No"}</p>
          <button
            onClick={() => handleUpdate(rent)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Update
          </button>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#7a9bbd] p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">PAYMENT FORM</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  PAYMENT
                </label>
                <input
                  type="number"
                  name="payment"
                  value={formData.payment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent"
                  required
                />
              </div>

              {/* Other input fields here */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-800 text-white rounded-lg hover:bg-cyan-900"
                >
                  Submit & Print
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rents;
