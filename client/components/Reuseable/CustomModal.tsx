"use client";

import { ReactNode } from "react";
import { XCircle } from "lucide-react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
}: CustomModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XCircle size={22} />
        </button>
        {title && (
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
