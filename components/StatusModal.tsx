// components/StatusModal.tsx
"use client";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function StatusModal({
  isOpen,
  onClose,
  title,
  message,
}: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl transition-all scale-100">
        {/* Red background container with an exclamation/warning icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-[#005ea8] py-2.5 text-sm font-medium text-white hover:bg-[#004b87] transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
