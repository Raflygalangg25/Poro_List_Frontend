"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = "https://porolistbackend-production.up.railway.app/auth/google";
    // simulasi proses login, nanti bisa diganti dengan logic login sesungguhnya
  };

  // Auto redirect to dashboard after 2 seconds of loading
  /*
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, router]);
  */

  // Loading Screen
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Maskot Loading Image - Responsive */}
          <div className="w-full max-w-[390px]">
            <Image
              src="/maskot_loading.png"
              alt="Poro-List Loading"
              width={390}
              height={359}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Loading Text - Responsive font sizes */}
          <h1 className="text-[#113F67] font-[family-name:var(--font-baloo-da)] text-[36px] sm:text-[48px] md:text-[60px] font-normal leading-tight">
            Loading...
          </h1>

          {/* Description Text - Responsive font sizes */}
          <p className="text-[#113F67] font-[family-name:var(--font-comfortaa)] text-[18px] sm:text-[24px] md:text-[28px] font-normal leading-tight px-4">
            Your Poro-List is getting ready
          </p>
        </div>
      </div>
    );
  }

  // Login Screen
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#113F67] p-4">
      <main className="flex flex-col items-center justify-center w-full mx-auto">
        {/* Main Card Container - Responsive: mobile to desktop 1014 x 687 */}
        <div className="relative w-full max-w-[90%] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:w-[1014px] min-h-[600px] sm:min-h-[650px] xl:h-[687px]">
          {/* Rectangle 1 - Top layer: #34699A, full rounded 15px */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#34699A] rounded-[15px]" />

          {/* Rectangle 2 - Bottom layer: #58A0C8 - Responsive height */}
          <div className="absolute bottom-0 left-0 w-full h-[150px] sm:h-[180px] md:h-[200px] xl:h-[229px] bg-[#58A0C8] rounded-b-[15px]" />

          {/* Content - Above layers */}
          <div className="absolute inset-0 z-10 flex flex-col items-center text-center px-4">
            {/* Maskot Image - Responsive: scales down on mobile */}
            <div className="mt-4 sm:mt-6 md:mt-8 xl:mt-[18px] w-[200px] sm:w-[240px] md:w-[280px] xl:w-[313px] h-auto">
              <Image
                src="/maskot.png"
                alt="Poro-List Mascot"
                width={313}
                height={279}
                priority
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Welcome Text - Baloo Da Bold - Responsive font size */}
            <h1 className="text-white font-[family-name:var(--font-baloo-da)] text-[28px] sm:text-[32px] md:text-[36px] xl:text-[42px] font-bold leading-tight mt-2 sm:mt-0 md:mt-[-12px] xl:mt-[-23px]">
              Welcome to Poro-List
            </h1>

            {/* Description Text - Quicksand Regular - Responsive font size */}
            <p className="text-white font-[family-name:var(--font-quicksand)] text-[16px] sm:text-[17px] md:text-[18px] xl:text-[20px] font-normal leading-relaxed max-w-[90%] sm:max-w-[450px] md:max-w-[550px] xl:max-w-[668px] mt-3 md:mt-4 xl:mt-[14px]">
              A simple and cheerful way to organize your tasks, focus better,
              and make progress without stress. Your productivity journey starts
              here!
            </p>

            {/* Login Section - Responsive spacing */}
            <div className="flex flex-col items-center w-full mt-8 sm:mt-12 md:mt-16 xl:mt-[73px]">
              {/* Google Login Button - #113F67 - Responsive size */}
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-[#113F67] hover:bg-[#0D2F4E] transition-colors rounded-[15px] w-full max-w-[240px] sm:max-w-[257px] h-[44px] sm:h-[48px] px-4"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 sm:w-[28px] sm:h-[28px]"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {/* Log in with Google - Comfortaa Medium - Responsive font size */}
                <span className="text-white font-[family-name:var(--font-comfortaa)] text-[17px] sm:text-[19px] font-medium leading-tight">
                  Log in with Google
                </span>
              </button>

              {/* Continue Text - Comfortaa Regular - Responsive font size */}
              <p className="text-white font-[family-name:var(--font-comfortaa)] text-[14px] sm:text-[15px] xl:text-[16px] font-normal leading-tight mt-4 sm:mt-5 xl:mt-[24px]">
                Continue with your Google account
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
