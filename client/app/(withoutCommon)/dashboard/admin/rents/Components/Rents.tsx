"use client";

import { useState } from "react";
import {
  useGetAllRentsQuery,
  useUpdateRentMutation,
} from "@/redux/api/New/rentApi";
import Loading from "@/components/Common/Loading";
import { BadgeCheck, XCircle, Home, FileEdit } from "lucide-react";
import CustomModal from "@/components/Reuseable/CustomModal";

const Rents = () => {
  const [selectedRent, setSelectedRent] = useState<any>();
  const { data, isLoading } = useGetAllRentsQuery({});
  const [updateRent] = useUpdateRentMutation({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ payment: "", id: "" });

  if (isLoading) return <Loading />;

  const handleUpdate = (rent: any) => {
    console.log("Selected rent object:", rent);
    setSelectedRent(rent);
    setFormData({
      payment: rent.payment || "",
      id: rent.RoomId || "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateRent({
        id: formData.id,
        body: { payment: Number(formData.payment) },
      }).unwrap();

      console.log("Payment updated successfully!");
      handleCloseModal();
    } catch (err) {
      console.error("Error updating payment:", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Room Rent Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((rent: any) => (
          <div
            key={rent.roomId}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Home size={20} /> Room No: {rent.roomNo}
            </h2>
            <ul className="text-gray-700 space-y-1">
              <li>Floor No: {rent.floorNo}</li>
              <li className="flex items-center gap-2">
                Room Rent: <span className="font-medium">{rent.roomRent}</span>
              </li>
              <li className="flex items-center gap-2">
                Electricity Unit: {rent.electricityUnit} units
              </li>
              <li>Electricity Bill: {rent.electricityBill}</li>
              <li className="text-red-600">Due Amount: {rent.dueAmount}</li>
              <li>
                Total Rent:{" "}
                <span className="font-semibold text-lg">{rent.totalRent}</span>
              </li>
              <li className="flex items-center gap-2">
                {rent.isPaid ? (
                  <>
                    <BadgeCheck size={16} className="text-green-600" /> Paid
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-red-600" /> Not Paid
                  </>
                )}
              </li>
            </ul>
            <button
              onClick={() => handleUpdate(rent)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <FileEdit size={18} /> Update Payment
            </button>
          </div>
        ))}
      </div>

      {/* Reusable Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Payment Form"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Payment Amount ($)
            </label>
            <input
              type="number"
              name="payment"
              value={formData.payment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
            >
              Submit & Print
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default Rents;
