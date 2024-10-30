"use client";
import DataTable from "@/components/Reuseable/DataTable";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserComponent = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    // Add more users as needed
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleDelete = (userToDelete: User) => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: {
    header: string;
    key: keyof User;
    align?: "left" | "center" | "right";
  }[] = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Role", key: "role" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <DataTable<User>
        data={filteredUsers}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserComponent;
