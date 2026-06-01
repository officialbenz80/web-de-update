"use client";

import { useState } from "react";
import { acceptCookies } from "@/app/actions/cookies";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = async () => {
    setIsVisible(false); // Hide immediately for snappy UX
    await acceptCookies();
  };

  const handleDecline = () => {
    setIsVisible(false);
    // Optional: Call another server action to set a 'declined' cookie if needed
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center z-50">
      <p className="text-sm mb-4 sm:mb-0">
        We use cookies to improve your browsing experience and analyze site
        traffic.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
