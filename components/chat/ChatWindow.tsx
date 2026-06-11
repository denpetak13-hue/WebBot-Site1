"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import QuickSuggestions from "./QuickSuggestions";

const GREETING =
  "Zdravo! Ja sam Dog Trainer Assistant 🐕 Tu sam da vam pomognem sa pitanjima o dresuri i obuci pasa, nasim uslugama i savetima za vas i vaseg ljubimca. Kako mogu da pomognem?";

const QUICK_SUGGESTIONS = [
  "Koje usluge nudite?",
  "Stene ne slusa - sta da radim?",
  "Sa koliko meseci poceti trening?",
  "Kako zakazati termin?",
];

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      content: GREETING,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setShowSuggestions(false);
      setError(null);

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const historyForApi = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForApi }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(
            data.error || "Doslo je do greske. Pokusajte ponovo."
          );
        }

        const botMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Doslo je do greske. Pokusajte ponovo.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: "360px",
        height: "520px",
        background:
          "linear-gradient(160deg, rgba(12, 74, 110, 0.88) 0%, rgba(7, 89, 133, 0.92) 50%, rgba(3, 105, 161, 0.85) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(186, 230, 253, 0.2)",
        boxShadow:
          "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(186, 230, 253, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(7, 89, 133, 0.6)",
          borderBottom: "1px solid rgba(186, 230, 253, 0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(14, 165, 233, 0.5))",
              border: "1px solid rgba(186, 230, 253, 0.3)",
            }}
          >
            🐕
          </div>
          <div>
            <p className="text-sky-100 font-semibold text-sm leading-tight">
              Dog Trainer Assistant
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sky-400 text-xs">Online</span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Zatvori chat"
          className="w-7 h-7 rounded-full flex items-center justify-center text-sky-300 hover:text-sky-100 hover:bg-sky-800/40 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2 chat-scroll"
        style={{ minHeight: 0 }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div
            className="mx-auto max-w-xs rounded-xl px-3 py-2 text-center text-xs"
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "rgba(252, 165, 165, 0.9)",
            }}
          >
            {error}
          </div>
        )}

        {showSuggestions && messages.length === 1 && (
          <QuickSuggestions
            suggestions={QUICK_SUGGESTIONS}
            onSelect={handleSuggestionClick}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
