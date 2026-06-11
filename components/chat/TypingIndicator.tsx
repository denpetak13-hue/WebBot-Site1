"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      {/* Bot avatar */}
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

      {/* Typing dots */}
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1"
        style={{
          background: "rgba(186, 230, 253, 0.1)",
          border: "1px solid rgba(186, 230, 253, 0.2)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <span
          className="typing-dot w-2 h-2 rounded-full"
          style={{ background: "rgba(125, 211, 252, 0.8)" }}
        />
        <span
          className="typing-dot w-2 h-2 rounded-full"
          style={{ background: "rgba(125, 211, 252, 0.8)" }}
        />
        <span
          className="typing-dot w-2 h-2 rounded-full"
          style={{ background: "rgba(125, 211, 252, 0.8)" }}
        />
      </div>
    </div>
  );
}
