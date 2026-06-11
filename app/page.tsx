import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <main
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #0c4a6e 40%, #0e7490 70%, #164e63 100%)",
      }}
    >
      {/* Demo page background content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="glass-panel rounded-3xl p-10 max-w-lg">
          <div className="text-5xl mb-4">🐕</div>
          <h1 className="text-3xl font-bold text-sky-100 mb-3">
            ZOOlogisch Assistant
          </h1>
          <p className="text-sky-300 text-base leading-relaxed mb-2">
            Dobrodošli na demo stranicu AI asistenta za obuku pasa.
          </p>
          <p className="text-sky-400 text-sm">
            Kliknite na chat ikonicu u donjem desnom uglu da počnete razgovor.
          </p>
        </div>
      </div>

      {/* Chat widget - uvek vidljiv u donjem desnom uglu */}
      <ChatWidget />
    </main>
  );
}
