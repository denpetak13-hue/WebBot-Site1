"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 96) + "px";
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div
      className="flex-shrink-0 px-3 py-3"
      style={{
        borderTop: "1px solid rgba(186, 230, 253, 0.12)",
        background: "rgba(7, 89, 133, 0.3)",
      }}
    >
      <div
        className="flex items-end gap-2 rounded-xl px-3 py-2"
        style={{
          background: "rgba(186, 230, 253, 0.08)",
          border: "1px solid rgba(186, 230, 253, 0.18)",
        }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Postavite pitanje..."
          disabled={isLoading}
          rows={1}
          maxLength={2000}
          className="flex-1 bg-transparent resize-none text-sm outline-none placeholder-sky-500/60 text-sky-100 leading-relaxed py-0.5"
          style={{
            minHeight: "24px",
            maxHeight: "96px",
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Posalji poruku"
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            canSend
              ? "hover:scale-105 active:scale-95"
              : "opacity-30 cursor-not-allowed"
          }`}
          style={
            canSend
              ? {
                  background:
                    "linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(2, 132, 199, 0.9))",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  boxShadow: "0 2px 8px rgba(14, 165, 233, 0.3)",
                }
              : {
                  background: "rgba(186, 230, 253, 0.1)",
                  border: "1px solid rgba(186, 230, 253, 0.15)",
                }
          }
        >
          {isLoading ? (
            <svg
              className="w-4 h-4 text-sky-300 animate-spin"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>

      <p className="text-center text-sky-600/50 text-[10px] mt-1.5">
        ZOOlogisch Assistant · AI powered
      </p>
    </div>
  );
}
