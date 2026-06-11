"use client";

interface QuickSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function QuickSuggestions({
  suggestions,
  onSelect,
}: QuickSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-3 animate-fade-in">
      <p className="text-sky-500/70 text-[11px] text-center mb-2">
        Brza pitanja
      </p>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="text-xs px-3 py-1.5 rounded-full transition-all duration-150 hover:scale-105 active:scale-95 text-left"
            style={{
              background: "rgba(186, 230, 253, 0.08)",
              border: "1px solid rgba(186, 230, 253, 0.2)",
              color: "rgba(186, 230, 253, 0.85)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(186, 230, 253, 0.16)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(186, 230, 253, 0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(186, 230, 253, 0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(186, 230, 253, 0.2)";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
