"use client";

import { useRouter } from "next/navigation";

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#113F67]">
      <div className="max-w-full">
        {/* Header Section */}
        <div className="bg-[#58A0C8] p-6 sm:p-8 md:p-12 mb-0">
          <div className="max-w-[1200px] mx-auto">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="mb-6 sm:mb-8 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-white rounded-[15px] flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="sm:w-7 sm:h-7"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#58A0C8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Title */}
            <h1 className="text-white font-[family-name:var(--font-baloo-da)] text-[48px] sm:text-[64px] md:text-[80px] lg:text-[92px] font-bold text-center mb-3 sm:mb-4 leading-tight">
              User Manual
            </h1>

            {/* Subtitle */}
            <p className="text-white font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-bold text-center leading-relaxed">
              This guide walks you through every feature of Poro-List to improve
              focus and task management
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          <div className="max-w-[1200px] mx-auto">
            {/* Section 1 */}
            <div className="bg-[#58A0C8] p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-white font-[family-name:var(--font-quicksand)] text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-bold mb-3 sm:mb-4">
                What is Poro-List?
              </h2>
              <p className="text-white font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-relaxed">
                Poro-List is a productivity app that combines the Pomodoro
                Technique with task management. Stay focused, track your tasks,
                and manage your time effectively! The Pomodoro Technique helps
                you break work into focused intervals, traditionally 25 minutes
                in length, separated by short breaks. This method helps maintain
                high levels of focus and prevents burnout. Poro-List integrates
                this proven technique with a comprehensive task management
                system, allowing you to plan your work, execute with focus, and
                track your progress all in one place.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-[#58A0C8] p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-white font-[family-name:var(--font-quicksand)] text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-bold mb-3 sm:mb-4">
                Pomodoro Timer
              </h2>
              <p className="text-white font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-relaxed">
                The Pomodoro Technique helps you stay focused by breaking your
                work into intervals. Each work session (Pomodoro) lasts 25
                minutes, followed by a 5-minute short break. After completing 4
                Pomodoros, take a longer 15-minute break to recharge. This
                rhythm helps maintain consistent focus while preventing mental
                fatigue. Use the Start button to begin a session, Pause if you
                need to stop temporarily, and Reset to return to the beginning
                of the current interval.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-[#58A0C8] p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-white font-[family-name:var(--font-quicksand)] text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-bold mb-3 sm:mb-4">
                To-Do List Management
              </h2>
              <p className="text-white font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-relaxed">
                Organize your tasks efficiently with our intuitive to-do list
                system. Create new tasks by clicking the plus button, giving
                each task a clear title and detailed description. Tasks are
                automatically organized into Ongoing and Completed sections.
                Click the Done button to mark a task as complete, or use the
                return icon to move it back to ongoing. Edit tasks anytime using
                the edit icon, and remove tasks you no longer need with the
                delete button. The system helps you stay organized and maintain
                a clear view of your workload.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-[#58A0C8] p-5 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]">
              <h2 className="text-white font-[family-name:var(--font-quicksand)] text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-bold mb-3 sm:mb-4">
                Tips for Maximum Productivity
              </h2>
              <p className="text-white font-[family-name:var(--font-quicksand)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-relaxed">
                To get the most out of Poro-List, start each day by reviewing
                and planning your tasks. Break large projects into smaller,
                manageable tasks that can be completed in one or two Pomodoros.
                During focus sessions, eliminate all distractions - close
                unnecessary tabs, silence notifications, and commit fully to the
                task at hand. Take your breaks seriously; use them to step away
                from your workspace, stretch, or grab a drink. This helps
                maintain energy levels throughout the day. At the end of each
                day, review what you accomplished and plan for tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
