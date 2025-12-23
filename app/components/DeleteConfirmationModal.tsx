"use client";

import React from "react";


interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you really want to delete this task? This process cannot be undone.",
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-[#113F67]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#58A0C8] rounded-[20px] sm:rounded-[30px] p-5 sm:p-6 md:p-8 max-w-[90vw] sm:max-w-[500px] w-full shadow-2xl mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="sm:w-[22px] sm:h-[22px] md:w-6 md:h-6"
          >
            <path d="M6 6 L18 18 M18 6 L6 18" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-white font-[family-name:var(--font-comfortaa)] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-3 sm:mb-4 text-center pr-8 sm:pr-10">
          {title}
        </h2>

        {/* Message */}
        <p className="text-white font-[family-name:var(--font-comfortaa)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-light text-center mb-5 sm:mb-6 md:mb-8 leading-relaxed px-1 sm:px-2">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#34699A] hover:bg-[#2A5580] text-white font-[family-name:var(--font-quicksand)] text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold py-2.5 sm:py-3 rounded-[20px] transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick= {() => {
              console.log("Tombol delete ditekan!");
              onConfirm();
            }}
            className="flex-1 bg-white hover:bg-gray-100 text-[#34699A] font-[family-name:var(--font-quicksand)] text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold py-2.5 sm:py-3 rounded-[20px] transition-colors order-1 sm:order-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
