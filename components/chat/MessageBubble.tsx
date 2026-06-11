"use client";

import { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 animate-fade-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mb-0.5"
          style={{
            background:
              "linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(14, 165, 233, 0.4))",
            border: "1px solid rgba(186, 230, 253, 0.25)",
          }}
        >
          🐕
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm"
            : "rounded-bl-sm"
        }`}
        style={
          isUser
            ? {
                background:
                  "linear-gradient(135deg, rgba(3, 105, 161, 0.75), rgba(2, 132, 199, 0.85))",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                color: "rgba(240, 249, 255, 0.95)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
            : {
                background: "rgba(186, 230, 253, 0.1)",
                border: "1px solid rgba(186, 230, 253, 0.2)",
                color: "rgba(224, 242, 254, 0.95)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
        }
      >
        {/* Render line breaks in message */}
        {message.content.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < message.content.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}
