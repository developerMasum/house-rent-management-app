"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";

interface TopBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ searchValue, onSearchChange }) => {
  return (
    <div className="flex gap-4 items-center p-4 bg-gray-900">
      {/* Search input */}
      <Input
        type="search"
        placeholder="Search by floor or room no."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default TopBar;
