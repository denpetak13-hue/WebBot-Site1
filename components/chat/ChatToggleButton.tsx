"use client";

interface ChatToggleButtonProps {
  isOpen: boolean;
  hasUnread: boolean;
  onClick: () => void;
}

export default function ChatToggleButton({
  isOpen,
  hasUnread,
  onClick,
}: ChatToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Zatvori chat" : "Otvori chat"}
      className="relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-transparent"
      style={{
        background:
          "linear-gradient(135deg, rgba(14, 165, 233, 0.85) 0%, rgba(2, 132, 199, 0.9) 50%, rgba(3, 105, 161, 0.95) 100%)",
        border: "1px solid rgba(186, 230, 253, 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(14, 165, 233, 0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {/* Unread indicator */}
      {hasUnread && !isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-300 rounded-full border-2 border-sky-900 animate-pulse" />
      )}

      {/* Icon transition */}
      <span className="flex items-center justify-center w-full h-full">
        {isOpen ? (
          <svg
            className="w-5 h-5 text-white transition-all duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white transition-all duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
