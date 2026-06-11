# Dog Trainer Assistant - WebBot-Site1

AI chat widget za sajt škole dresure pasa. Višejezični bot sa GPT integracijom, bazom znanja i modernim glass-blue dizajnom.

## Pokretanje

### 1. Instaliraj zavisnosti

```bash
npm install
```

### 2. Podesi API ključ

Kopiraj `.env.example` u `.env.local` i dodaj OpenAI API ključ:

```bash
cp .env.example .env.local
```

Otvori `.env.local` i zameni `sk-your-api-key-here` sa tvojim API ključem sa [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### 3. Popuni bazu znanja

Otvori `data/knowledge-base/knowledge-base.json` i zameni sve `[POPUNI]` vrednosti sa pravim podacima firme.

Vidi `data/knowledge-base/README.md` za detaljna uputstva.

### 4. Pokreni razvojni server

```bash
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000) u browser-u. Chat widget se pojavljuje u donjem desnom uglu.

## Struktura Projekta

```
WebBot-Site1/
├── app/
│   ├── api/chat/route.ts       # Backend API - GPT komunikacija
│   ├── globals.css             # Globalni stilovi i glass efekti
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Demo stranica
├── components/chat/
│   ├── ChatWidget.tsx          # Glavni widget kontejner
│   ├── ChatWindow.tsx          # Chat panel sa istorijom poruka
│   ├── ChatToggleButton.tsx    # Floating dugme za otvaranje/zatvaranje
│   ├── MessageBubble.tsx       # Komponenta za jednu poruku
│   ├── ChatInput.tsx           # Input polje i dugme za slanje
│   ├── TypingIndicator.tsx     # Animacija dok bot kuca
│   └── QuickSuggestions.tsx    # Brza pitanja na početku
├── data/knowledge-base/
│   ├── knowledge-base.json     # Baza znanja firme (POPUNITI)
│   └── README.md               # Uputstvo za popunjavanje baze
├── lib/
│   ├── ai/
│   │   ├── openai.ts           # OpenAI klijent
│   │   └── prompt.ts           # System prompt builder
│   └── knowledge/
│       └── loader.ts           # Učitavanje i formatiranje baze znanja
├── types/
│   ├── chat.ts                 # TypeScript tipovi za chat
│   └── knowledge.ts            # TypeScript tipovi za bazu znanja
├── .env.local                  # API ključevi (ne commitovati!)
├── .env.example                # Template za env konfiguraciju
└── package.json
```

## Kako Radi

1. Korisnik otvori chat widget klikom na dugme u donjem desnom uglu.
2. Upiše pitanje na bilo kom jeziku.
3. Frontend pošalje poruku na `/api/chat` endpoint.
4. Backend učita bazu znanja, izgradi system prompt i pošalje zahtev GPT API-ju.
5. GPT odgovori na istom jeziku koristeći informacije iz baze znanja.
6. Odgovor se prikaže u chat widgetu.

## Bezbednost

- OpenAI API ključ se čuva samo u `.env.local` na serveru.
- Frontend ne vidi API ključ.
- Poruke korisnika su ograničene na 2000 karaktera.
- Istorija razgovora je ograničena na poslednjih 20 poruka.

## Kasnija Nadogradnja

Pogledaj `data/knowledge-base/knowledge-base.json` za extensible strukturu koja podržava:

- Admin panel za upravljanje bazom znanja
- Lead capture (ime, email, telefon, problem psa)
- Human handoff (prosleđivanje treneru)
- Rezervacija termina
- Napredni RAG sa vektorskom pretragom

## Deployment na Vercel

```bash
npm run build
vercel --prod
```

Dodaj `OPENAI_API_KEY` i `OPENAI_MODEL` u Vercel Environment Variables.
