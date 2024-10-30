import React from "react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 p-2 border rounded w-full"
    />
  );
};

export default SearchInput;
