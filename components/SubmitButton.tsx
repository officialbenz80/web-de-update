// components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-6 w-full rounded-full py-3 text-[15px] font-medium transition-colors ${
        pending
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#fef5d4] text-gray-700 hover:bg-[#fcd419] hover:text-black"
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          {/* Subtle Loading Spinner */}
          <svg
            className="h-4 w-4 animate-spin text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Bitte warten...
        </span>
      ) : (
        text
      )}
    </button>
  );
}
