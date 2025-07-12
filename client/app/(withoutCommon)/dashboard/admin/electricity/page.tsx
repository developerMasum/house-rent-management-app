"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  useGetAllElectricityQuery,
  useUpdateElectricityMutation,
} from "@/redux/api/New/electricity";
import TopBar from "./Components/TopBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/Reuseable/CustomModal";
import { toast } from "sonner";

const ElectricityBill = () => {
  const [search, setSearch] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<any>(null);
  const [formData, setFormData] = React.useState({ payment: "" });

  const { data, refetch } = useGetAllElectricityQuery({ searchTerm: search });
  const electricity = data || [];

  const [updateElectricity] = useUpdateElectricityMutation();

  const dynamicKeys = electricity.length > 0 ? Object.keys(electricity[0]) : [];
  const staticFields = ["floorNo", "roomNo"];
  const dynamicMonthFields = dynamicKeys.filter(
    (key) => key.endsWith("Reading") && !staticFields.includes(key)
  );
  const totalField = "totalUnit";
  const columnOrder = [...staticFields, ...dynamicMonthFields, totalField];

  const formatHeader = (col: string) =>
    col
      .replace("Reading", " Reading")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();

  const handleEditClick = (item: any) => {
    setSelectedData(item);
    setFormData({ payment: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setFormData({ payment: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.payment || !selectedData) return;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get latest reading field (e.g., "JulyReading")
    const latestReadingKey = Object.keys(selectedData)
      .filter((key) => key.endsWith("Reading") && key !== "totalUnit")
      .sort((a, b) => {
        const aMonth = a.replace("Reading", "");
        const bMonth = b.replace("Reading", "");
        return months.indexOf(bMonth) - months.indexOf(aMonth);
      })[0]; // get latest

    const payload = {
      [latestReadingKey]: parseInt(formData.payment),
    };

    try {
      await updateElectricity({ id: selectedData.id, ...payload }).unwrap();
      toast.success("Electricity reading updated successfully!");
      refetch();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update reading!");
    }
  };

  const latestReadingKey = selectedData
    ? Object.keys(selectedData)
        .filter((key) => key.endsWith("Reading") && key !== "totalUnit")
        .sort((a, b) => {
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const aMonth = a.replace("Reading", "");
          const bMonth = b.replace("Reading", "");
          return months.indexOf(bMonth) - months.indexOf(aMonth);
        })[0]
    : null;

  const latestReadingValue = latestReadingKey
    ? selectedData?.[latestReadingKey]
    : "";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Electricity Bill</h2>

      <TopBar searchValue={search} onSearchChange={setSearch} />

      <Link href="/dashboard/admin/electricity/create">
        <Button className="mb-4">Click to Create</Button>
      </Link>

      <Table>
        <TableHeader>
          <TableRow>
            {columnOrder.map((col) => (
              <TableHead key={col}>{formatHeader(col)}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {electricity.length > 0 ? (
            electricity.map((item: any, idx: number) => (
              <TableRow key={idx}>
                {columnOrder.map((col) => (
                  <TableCell key={col}>{item[col] ?? "N/A"}</TableCell>
                ))}
                <TableCell>
                  <Button size="sm" onClick={() => handleEditClick(item)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnOrder.length + 1}
                className="text-center"
              >
                No electricity bill data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ✅ Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit Electricity Bill"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {latestReadingKey
                ? `${latestReadingKey.replace("Reading", "")} Reading`
                : "Reading"}
            </label>
            <input
              type="number"
              name="payment"
              value={formData.payment}
              onChange={handleInputChange}
              placeholder={
                latestReadingValue ? latestReadingValue.toString() : "0"
              }
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
              Save Changes
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default ElectricityBill;
