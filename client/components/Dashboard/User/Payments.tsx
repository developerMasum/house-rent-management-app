"use client";
import DataTable from "@/components/Reuseable/DataTable";
import SearchInput from "@/components/Reuseable/SearchInput";
import React, { useState } from "react";

interface Invoice {
  id: string;
  status: string;
  method: string;
  amount: string;
}

const Payments: React.FC = () => {
  const invoices: Invoice[] = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    {
      id: "INV003",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$350.00",
    },
    {
      id: "INV004",
      status: "Failed",
      method: "Credit Card",
      amount: "$200.00",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hoveredInvoice, setHoveredInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: {
    header: string;
    key: keyof Invoice;
    align?: "left" | "center" | "right";
  }[] = [
    { header: "Invoice", key: "id" },
    { header: "Status", key: "status" },
    { header: "Method", key: "method" },
    { header: "Amount", key: "amount", align: "right" },
  ];

  return (
    <div className="relative">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <DataTable<Invoice>
        data={filteredInvoices}
        columns={columns}
        caption="A list of your recent invoices."
        onRowHover={setHoveredInvoice}
      />

      {hoveredInvoice && (
        <div className="absolute p-2 bg-gray-700 text-white rounded shadow-lg">
          <p>
            <strong>Invoice ID:</strong> {hoveredInvoice.id}
          </p>
          <p>
            <strong>Status:</strong> {hoveredInvoice.status}
          </p>
          <p>
            <strong>Method:</strong> {hoveredInvoice.method}
          </p>
          <p>
            <strong>Amount:</strong> {hoveredInvoice.amount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Payments;
