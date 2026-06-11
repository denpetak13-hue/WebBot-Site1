"use client";

import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatToggleButton from "./ChatToggleButton";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat panel - slide up animation */}
      <div
        className={`transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <ChatWindow onClose={() => setIsOpen(false)} />
      </div>

      {/* Toggle button */}
      <ChatToggleButton
        isOpen={isOpen}
        hasUnread={hasUnread}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
}
