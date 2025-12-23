"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  // Timer speed multiplier based on environment
  // In development mode: 60x faster (1 minute = 1 second in real time)
  // In production mode: normal speed (1 minute = 60 seconds)
  const timerSpeedMultiplier =
    process.env.NEXT_PUBLIC_TIMER_MODE === "development" ? 60 : 1;
  const isDevelopmentMode =
    process.env.NEXT_PUBLIC_TIMER_MODE === "development";

  const [activeTab, setActiveTab] = useState<"pomodoro" | "todo">("pomodoro");
  const [activeMode, setActiveMode] = useState<"pomodoro" | "short" | "long">(
    "pomodoro"
  );
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{name: string, profile_pic: string} | null>(null);

  // Timer states
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialMode, setInitialMode] = useState<
    "pomodoro" | "short" | "long" | null
  >(null);
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(0); // Track completed pomodoro sessions

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number | null>(null); // Store remaining time when paused
  const handleTimerCompleteRef = useRef<(() => void) | null>(null); // Store handleTimerComplete function

  // Store saved timer state for each mode
  const savedTimerStateRef = useRef<{
    pomodoro: {
      minutes: number;
      seconds: number;
      isPaused: boolean;
      initialMode: "pomodoro" | "short" | "long" | null;
      pomodoroSessionCount: number;
      pausedTime: number | null;
    } | null;
    short: {
      minutes: number;
      seconds: number;
      isPaused: boolean;
      initialMode: "pomodoro" | "short" | "long" | null;
      pomodoroSessionCount: number;
      pausedTime: number | null;
    } | null;
    long: {
      minutes: number;
      seconds: number;
      isPaused: boolean;
      initialMode: "pomodoro" | "short" | "long" | null;
      pomodoroSessionCount: number;
      pausedTime: number | null;
    } | null;
  }>({
    pomodoro: null,
    short: null,
    long: null,
  });

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio("/ringtone.mp3");

    // Restore timer state from localStorage if exists
    const savedTimerState = localStorage.getItem("pomodoroTimerState");
    if (savedTimerState) {
      try {
        const state = JSON.parse(savedTimerState);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveMode(state.activeMode);
        setMinutes(state.minutes);
        setSeconds(state.seconds);
        setIsPaused(state.isPaused);
        setInitialMode(state.initialMode);
        setPomodoroSessionCount(state.pomodoroSessionCount);
        pausedTimeRef.current = state.pausedTime;

        // Clear saved state after restoring
        localStorage.removeItem("pomodoroTimerState");
      } catch (error) {
        console.error("Failed to restore timer state:", error);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userDataStr = params.get('user');

    if (userDataStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataStr));
        setUser(userData);
        localStorage.setItem('poro_user', JSON.stringify(userData));

        window.history.replaceState({}, document.title, window.location.pathname);

      } catch (error) {
        console.error("Gagal parse data user:", error);
      }
    } else {
      const savedUser = localStorage.getItem('poro_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle timer completion and auto-transitions
  const handleTimerComplete = useCallback(() => {
    // Note: isRunning and isPaused are already handled in tick function
    setIsRunning(false);
    setIsPaused(false);

    // Clear saved state for current mode when timer completes
    savedTimerStateRef.current[activeMode] = null;

    // Function to execute after ringtone finishes
    const executeAfterRingtone = () => {
      // Logic 2: If started from Short Break or Long Break, just stop and reset to default time
      if (initialMode === "short") {
        setMinutes(5);
        setSeconds(0);
        setInitialMode(null); // Reset initial mode so user can choose again
        pausedTimeRef.current = null;
        return;
      }

      if (initialMode === "long") {
        setMinutes(15);
        setSeconds(0);
        setInitialMode(null); // Reset initial mode so user can choose again
        pausedTimeRef.current = null;
        return;
      }

      // Logic 1: If started from Pomodoro mode
      if (initialMode === "pomodoro") {
        if (activeMode === "pomodoro") {
          // After Pomodoro completes, increment session count
          const completedSessions = pomodoroSessionCount + 1;
          setPomodoroSessionCount(completedSessions);

          // Check if this is the 4th pomodoro
          if (completedSessions === 4) {
            // After 4th pomodoro: Go directly to Long Break (skip short break)
            savedTimerStateRef.current.long = null;
            setActiveMode("long");
            setMinutes(15);
            setSeconds(0);
            pausedTimeRef.current = null;
            // Auto-start after a brief delay
            setTimeout(() => {
              setIsRunning(true);
              setIsPaused(false);
            }, 500);
          } else {
            // After pomodoro 1, 2, 3: Go to Short Break and auto-start
            savedTimerStateRef.current.short = null;
            setActiveMode("short");
            setMinutes(5);
            setSeconds(0);
            pausedTimeRef.current = null;
            // Auto-start after a brief delay
            setTimeout(() => {
              setIsRunning(true);
              setIsPaused(false);
            }, 500);
          }
        } else if (activeMode === "short") {
          // After Short Break completes (from siklus 1, 2, or 3)
          // Clear pomodoro saved state before auto-switching
          savedTimerStateRef.current.pomodoro = null;

          // Always go back to Pomodoro after short break
          setActiveMode("pomodoro");
          setMinutes(25);
          setSeconds(0);
          pausedTimeRef.current = null;
          // Auto-start after a brief delay
          setTimeout(() => {
            setIsRunning(true);
            setIsPaused(false);
          }, 500);
        } else if (activeMode === "long") {
          // After Long Break completes
          // Reset everything and wait for user to start (TIDAK AUTO-START)
          // Clear pomodoro saved state
          savedTimerStateRef.current.pomodoro = null;
          setActiveMode("pomodoro");
          setMinutes(25);
          setSeconds(0);
          setPomodoroSessionCount(0);
          setInitialMode(null);
          pausedTimeRef.current = null;
          // IMPORTANT: Don't auto-start, wait for user to press Start button
        }
      }
    };

    // Play ringtone and wait for it to finish before transitioning
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning

      // Remove any existing event listeners to prevent duplicates
      audioRef.current.onended = null;

      // Listen for the 'ended' event to know when ringtone finishes
      audioRef.current.onended = () => {
        executeAfterRingtone();
      };

      // Attempt to play the ringtone
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
        // If audio fails to play, execute transition immediately
        executeAfterRingtone();
      });
    } else {
      // If no audio available, execute transition immediately
      executeAfterRingtone();
    }
  }, [activeMode, initialMode, pomodoroSessionCount]);

  // Store handleTimerComplete in ref so it can be called from timer tick
  useEffect(() => {
    handleTimerCompleteRef.current = handleTimerComplete;
  }, [handleTimerComplete]);

  // Timer countdown logic using Date.now() to prevent slowdown when switching tabs
  useEffect(() => {
    if (isRunning && !isPaused) {
      // Calculate end time when timer starts or resumes (only when isRunning changes from false to true)
      if (endTimeRef.current === null) {
        const totalSeconds =
          pausedTimeRef.current !== null
            ? pausedTimeRef.current
            : minutes * 60 + seconds;
        // Apply speed multiplier: divide by multiplier to make timer faster
        // Example: 60 seconds / 60 = 1 second in development mode
        const adjustedDuration = (totalSeconds * 1000) / timerSpeedMultiplier;
        endTimeRef.current = Date.now() + adjustedDuration;
        pausedTimeRef.current = null;
      }

      const tick = () => {
        if (endTimeRef.current === null) return;

        // Calculate remaining time and convert back to display seconds
        const remainingMs = Math.max(0, endTimeRef.current - Date.now());
        const remaining = Math.floor(
          (remainingMs * timerSpeedMultiplier) / 1000
        );
        const newMinutes = Math.floor(remaining / 60);
        const newSeconds = remaining % 60;

        setMinutes(newMinutes);
        setSeconds(newSeconds);

        if (remainingMs <= 0) {
          // Clear interval first
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          endTimeRef.current = null;

          // Call handleTimerComplete to play ringtone and handle transitions
          if (handleTimerCompleteRef.current) {
            handleTimerCompleteRef.current();
          }
        }
      };

      // Execute immediately
      tick();

      // Then continue with interval - faster in development mode
      const intervalMs = Math.max(100, 1000 / timerSpeedMultiplier);
      intervalRef.current = setInterval(tick, intervalMs);
    } else {
      // Store remaining time when paused
      if (isPaused && endTimeRef.current !== null) {
        const remainingMs = Math.max(0, endTimeRef.current - Date.now());
        const remaining = Math.floor(
          (remainingMs * timerSpeedMultiplier) / 1000
        );
        pausedTimeRef.current = remaining;
      }

      endTimeRef.current = null;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, timerSpeedMultiplier]);

  // Handle Start/Pause button
  const handleStart = () => {
    if (!isRunning) {
      // Check if timer is at 00:00
      if (minutes === 0 && seconds === 0 && pausedTimeRef.current === null) {
        // Timer is at 00:00 and not paused, reset to default
        handleReset();
        return;
      }

      // Set initial mode when user first starts
      if (initialMode === null) {
        setInitialMode(activeMode);
      }
      setIsRunning(true);
      setIsPaused(false);
    } else {
      // Pause the timer
      setIsRunning(false);
      setIsPaused(true);
    }
  };

  // Handle Reset button
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setInitialMode(null);
    setPomodoroSessionCount(0);
    pausedTimeRef.current = null;

    // Reset to the current mode's default time
    if (activeMode === "pomodoro") {
      setMinutes(25);
      setSeconds(0);
    } else if (activeMode === "short") {
      setMinutes(5);
      setSeconds(0);
    } else if (activeMode === "long") {
      setMinutes(15);
      setSeconds(0);
    }
  };

  const getMascotImage = () => {
    if (activeMode === "short") return "/Maskot Short Break Page.png";
    if (activeMode === "long") return "/Maskot Long Break.png";
    return "/masket_lock.png";
  };

  // Function to save current timer state to ref
  const saveCurrentTimerState = (mode: "pomodoro" | "short" | "long") => {
    const currentPausedTime =
      endTimeRef.current !== null
        ? Math.max(
            0,
            Math.floor(
              ((endTimeRef.current - Date.now()) * timerSpeedMultiplier) / 1000
            )
          )
        : pausedTimeRef.current !== null
        ? pausedTimeRef.current
        : minutes * 60 + seconds;

    savedTimerStateRef.current[mode] = {
      minutes,
      seconds,
      isPaused: isPaused || isRunning,
      initialMode,
      pomodoroSessionCount,
      pausedTime: currentPausedTime,
    };
  };

  // Function to restore timer state from ref
  const restoreTimerState = (mode: "pomodoro" | "short" | "long") => {
    const savedState = savedTimerStateRef.current[mode];
    if (savedState) {
      setMinutes(savedState.minutes);
      setSeconds(savedState.seconds);
      setIsPaused(savedState.isPaused);
      setInitialMode(savedState.initialMode);
      setPomodoroSessionCount(savedState.pomodoroSessionCount);
      pausedTimeRef.current = savedState.pausedTime;
    } else {
      // No saved state, reset to default
      if (mode === "pomodoro") {
        setMinutes(25);
        setSeconds(0);
      } else if (mode === "short") {
        setMinutes(5);
        setSeconds(0);
      } else if (mode === "long") {
        setMinutes(15);
        setSeconds(0);
      }
      setIsPaused(false);
      pausedTimeRef.current = null;
    }
  };

  // Function to pause timer when switching pages
  const handlePauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);

      // Save timer state to localStorage
      const timerState = {
        activeMode,
        minutes,
        seconds,
        isPaused: true,
        initialMode,
        pomodoroSessionCount,
        pausedTime:
          endTimeRef.current !== null
            ? Math.max(
                0,
                Math.floor(
                  ((endTimeRef.current - Date.now()) * timerSpeedMultiplier) /
                    1000
                )
              )
            : minutes * 60 + seconds,
      };
      localStorage.setItem("pomodoroTimerState", JSON.stringify(timerState));
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#113F67] p-2 sm:p-4 relative transition-all duration-300 ${
        isSidebarOpen ? "md:ml-[320px]" : "ml-0"
      }`}
    >
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />

      {/* Navbar Component */}
      <Navbar
        activeTab={activeTab}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onTabChange={setActiveTab}
        isTimerRunning={isRunning}
        onPauseTimer={handlePauseTimer}
      />

      {/* Main Content - Responsive */}
      <div className="max-w-[1197px] mx-auto px-2 sm:px-4">
        <div className="bg-[#58A0C8] rounded-[20px] sm:rounded-[30px] md:rounded-[45px] p-4 sm:p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 w-full max-w-[971px] mx-auto">
          {/* Timer Section */}
          <div className="flex flex-col space-y-4 sm:space-y-6 flex-1 w-full">
            {/* Development Mode Indicator */}
            {isDevelopmentMode && (
              <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg px-3 py-2 text-center">
                <p className="text-yellow-100 font-[family-name:var(--font-quicksand)] text-[12px] sm:text-[14px] font-semibold">
                  ⚡ DEV MODE - Timer 60x Faster
                </p>
              </div>
            )}

            {/* Mode Tabs - Responsive */}
            <div className="flex gap-3 sm:gap-6 md:gap-12 justify-center lg:justify-start flex-wrap">
              <button
                onClick={() => {
                  if (activeMode === "pomodoro") return; // Already in this mode

                  // Save current mode state before switching
                  saveCurrentTimerState(activeMode);

                  // Stop timer if running
                  if (isRunning) {
                    setIsRunning(false);
                  }

                  // Switch to pomodoro mode and restore its state
                  setActiveMode("pomodoro");
                  restoreTimerState("pomodoro");
                }}
                className={`font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] md:text-[24px] font-semibold transition-colors ${
                  activeMode === "pomodoro" ? "text-white" : "text-white/70"
                }`}
              >
                Pomodoro
              </button>
              <button
                onClick={() => {
                  if (activeMode === "short") return; // Already in this mode

                  // Save current mode state before switching
                  saveCurrentTimerState(activeMode);

                  // Stop timer if running
                  if (isRunning) {
                    setIsRunning(false);
                  }

                  // Switch to short break mode and restore its state
                  setActiveMode("short");
                  restoreTimerState("short");
                }}
                className={`font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] md:text-[24px] font-semibold transition-colors ${
                  activeMode === "short" ? "text-white" : "text-white/70"
                }`}
              >
                Short Break
              </button>
              <button
                onClick={() => {
                  if (activeMode === "long") return; // Already in this mode

                  // Save current mode state before switching
                  saveCurrentTimerState(activeMode);

                  // Stop timer if running
                  if (isRunning) {
                    setIsRunning(false);
                  }

                  // Switch to long break mode and restore its state
                  setActiveMode("long");
                  restoreTimerState("long");
                }}
                className={`font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] md:text-[24px] font-semibold transition-colors ${
                  activeMode === "long" ? "text-white" : "text-white/70"
                }`}
              >
                Long Break
              </button>
            </div>

            {/* Pomodoro Cycle Indicator */}
            {initialMode === "pomodoro" && (
              <div className="flex justify-center gap-2 sm:gap-3">
                {[1, 2, 3, 4].map((cycle) => (
                  <div
                    key={cycle}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                      pomodoroSessionCount >= cycle ? "bg-white" : "bg-white/30"
                    }`}
                    title={`Siklus ${cycle}`}
                  />
                ))}
              </div>
            )}

            {/* Timer Display - Responsive */}
            <div className="bg-[#34699A] rounded-[20px] sm:rounded-[30px] w-full max-w-[579px] min-h-[180px] sm:min-h-[240px] md:h-[291px] flex items-center justify-center mx-auto">
              <div className="text-center font-[family-name:var(--font-quicksand)] text-[56px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-bold text-white leading-tight tracking-tight px-4">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
              <button
                onClick={handleStart}
                className="bg-[#34699A] hover:bg-[#2A5580] text-white font-[family-name:var(--font-quicksand)] text-[20px] sm:text-[24px] md:text-[32px] font-semibold w-[140px] sm:w-[170px] md:w-[199px] h-[44px] sm:h-[48px] md:h-[52px] rounded-[20px] sm:rounded-[30px] transition-colors uppercase leading-tight"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={handleReset}
                className="bg-[#34699A] hover:bg-[#2A5580] text-white font-[family-name:var(--font-quicksand)] text-[20px] sm:text-[24px] md:text-[32px] font-semibold w-[140px] sm:w-[170px] md:w-[199px] h-[44px] sm:h-[48px] md:h-[52px] rounded-[20px] sm:rounded-[30px] transition-colors uppercase leading-tight"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Mascot Section - Responsive */}
          <div className="flex flex-col items-center justify-center lg:ml-8 w-full lg:w-auto">
            <h2 className="text-white font-[family-name:var(--font-baloo-da)] text-[24px] sm:text-[32px] md:text-[36px] font-bold text-center mb-2">
              {activeMode === "short" || activeMode === "long"
                ? "Time for a break!"
                : "Time to focus!"}
            </h2>

            <div className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[340px]">
              <Image
                src={getMascotImage()}
                alt="Poro Mascot"
                width={340}
                height={320}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
