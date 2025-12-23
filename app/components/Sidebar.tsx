"use client";

import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    profile_pic: string;
  } | null;
}

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-[#113F67] transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-8 py-12 pb-0">
          {/* Profile Section */}
          <div className="flex flex-col items-start mb-auto">
            {/* Profile Picture - 115 x 115 */}
            <div className="w-[115px] h-[115px] rounded-full bg-gray-300 mb-6 overflow-hidden relative border-4 border-white">
              {user?.profile_pic ? (
                <Image 
                  src={user.profile_pic} 
                  alt="Profile Picture" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-400" /> 
              )}
            </div>
            {/* Greeting Text - Baloo Da Bold size 36 */}
            <h2 className="text-white font-[family-name:var(--font-baloo-da)] text-[36px] font-bold mb-1 leading-tight">
              Hello, {user?.name || "[Name]"}
            </h2>
            {/* Subtext - Baloo Da Bold size 20 */}
            <p className="text-white font-[family-name:var(--font-baloo-da)] text-[20px] font-bold">
              Ready for a productive day?
            </p>
          </div>

          {/* Bottom Section with Background Card - Full width, extends to bottom */}
          <div className="w-[320px] h-[212px] bg-[#58A0C8] rounded-t-[20px] -mx-8 px-8 py-6 flex flex-col justify-center gap-4 mt-auto">
            {/* Help Button */}
            <button
              onClick={() => (window.location.href = "/help")}
              className="flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              {/* Help Icon - 40 x 40 */}
              <div className="w-[40px] h-[40px] rounded-full border-3 border-white flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[24px] font-bold">?</span>
              </div>
              {/* Help Text - Quicksand Bold size 24 */}
              <span className="text-white font-[family-name:var(--font-quicksand)] text-[24px] font-bold">
                Help
              </span>
            </button>

            {/* Log Out Button */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              {/* Logout Icon - 40 x 40 */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M13 10 L27 10 M27 10 L27 24 M27 10 L13 24"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <rect
                  x="8"
                  y="17"
                  width="10"
                  height="13"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  rx="1.5"
                />
              </svg>
              {/* Log Out Text - Quicksand Bold size 24 */}
              <span className="text-white font-[family-name:var(--font-quicksand)] text-[24px] font-bold">
                Log Out
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#58A0C8] rounded-[20px] sm:rounded-[30px] p-6 sm:p-8 max-w-[500px] w-full">
            <h2 className="text-white font-[family-name:var(--font-baloo-da)] text-[24px] sm:text-[32px] font-bold mb-3 sm:mb-4 text-center">
              Logout?
            </h2>
            <p className="text-white font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] text-center mb-4 sm:mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem('poro_user');
                  window.location.href = "/";
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] font-semibold py-2.5 sm:py-3 rounded-[20px] transition-colors"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] font-semibold py-2.5 sm:py-3 rounded-[20px] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
