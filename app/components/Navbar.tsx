"use client";

import Image from "next/image";

interface NavbarProps {
  activeTab: "pomodoro" | "todo";
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onTabChange: (tab: "pomodoro" | "todo") => void;
  isTimerRunning?: boolean;
  onPauseTimer?: () => void;
}

export default function Navbar({
  activeTab,
  isSidebarOpen,
  onToggleSidebar,
  onTabChange,
  isTimerRunning = false,
  onPauseTimer,
}: NavbarProps) {
  return (
    <nav className="bg-[#58A0C8] rounded-[15px] mb-4 sm:mb-6 mx-auto max-w-[1197px] min-h-[70px] sm:h-[98px] flex items-center px-2 sm:px-4 md:px-8 py-3 sm:py-0">
      <div className="flex items-center justify-between w-full gap-1 sm:gap-3 md:gap-4">
        {/* Hamburger Menu - Responsive - Hidden when sidebar is open */}
        {!isSidebarOpen && (
          <button
            className="text-white z-50 relative w-[32px] sm:w-[45px] md:w-[55px] flex-shrink-0"
            onClick={onToggleSidebar}
          >
            <svg
              width="100%"
              height="30"
              viewBox="0 0 55 30"
              fill="none"
              className="w-full h-auto"
            >
              <rect y="0" width="55" height="4" rx="2" fill="white" />
              <rect y="13" width="55" height="4" rx="2" fill="white" />
              <rect y="26" width="55" height="4" rx="2" fill="white" />
            </svg>
          </button>
        )}

        {/* Tab Buttons - Responsive */}
        <div className="flex gap-1 sm:gap-2 md:gap-4 lg:gap-6 flex-1 justify-center min-w-0">
          <button
            onClick={() => {
              if (isTimerRunning && activeTab !== "pomodoro" && onPauseTimer) {
                // Pause the timer before switching tabs
                onPauseTimer();
              }
              onTabChange("pomodoro");
              if (activeTab !== "pomodoro") {
                window.location.href = "/dashboard";
              }
            }}
            className={`px-2 sm:px-4 md:px-8 lg:px-12 py-1.5 sm:py-2 rounded-[30px] font-[family-name:var(--font-comfortaa)] text-[11px] sm:text-[16px] md:text-[22px] lg:text-[26px] font-bold transition-colors whitespace-nowrap ${
              activeTab === "pomodoro"
                ? "bg-transparent text-white border-2 sm:border-3 md:border-4 border-white"
                : "bg-transparent text-white"
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => {
              if (isTimerRunning && activeTab !== "todo" && onPauseTimer) {
                // Pause the timer before switching tabs
                onPauseTimer();
              }
              onTabChange("todo");
              if (activeTab !== "todo") {
                window.location.href = "/todo";
              }
            }}
            className={`px-2 sm:px-4 md:px-8 lg:px-12 py-1.5 sm:py-2 rounded-[30px] font-[family-name:var(--font-comfortaa)] text-[11px] sm:text-[16px] md:text-[22px] lg:text-[26px] font-bold transition-colors whitespace-nowrap ${
              activeTab === "todo"
                ? "bg-transparent text-white border-2 sm:border-3 md:border-4 border-white"
                : "bg-transparent text-white"
            }`}
          >
            To-Do List
          </button>
        </div>

        {/* Logo - Responsive */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          <Image
            src="/maskot.png"
            alt="Poro-List Mascot"
            width={94}
            height={98}
            className="w-[40px] sm:w-[55px] md:w-[75px] lg:w-[94px] h-auto object-contain"
          />
          <span className="hidden md:block text-white font-[family-name:var(--font-baloo-da)] text-[28px] font-bold leading-[100%] tracking-[0%] text-center whitespace-nowrap">
            Poro-List
          </span>
        </div>
      </div>
    </nav>
  );
}
