# Baza Znanja - Dog Trainer Assistant

Ovo je rucno odrzavana baza znanja za MVP verziju bota.
Bot ce koristiti ovaj fajl kao jedini izvor istine o firmi.

## Kako Popuniti

Otvori `knowledge-base.json` i zameni sva mesta oznacena sa `[POPUNI]` pravim podacima.

### Sta Obavezno Treba Popuniti

- `about` - naziv firme, opis, treneri
- `contact` - telefon, email, lokacija, radno vreme
- `services` - sve usluge sa opisom i trajanjem
- `faq` - najcesca pitanja i odgovori
- `bot_behavior.greeting_message` - pocetna poruka bota
- `bot_behavior.fallback_contact_message` - kontakt poruka kada bot ne zna odgovor

### Cene

U `pricing.show_prices` podesi:

- `false` - bot ne prikazuje cene, vec preusmerava korisnika na kontakt
- `true` - popuni `pricing.prices` listu sa cenama po usluzi

### Dodavanje Novih Usluga

Kopiraj jedan blok iz `services` liste i dodaj na kraj.
`id` mora biti jedinstven, npr. `service_08`.

### Dodavanje FAQ Pitanja

Kopiraj jedan blok iz `faq` liste i dodaj na kraj.

### Uklanjanje Neuporabeljivih Sekcija

Ako firma nema npr. grupne treninge ili online konsultacije,
jednostavno ukloni odgovarajuci blok iz `services` liste.

## Pravilo Bota

Bot ce koristiti samo informacije iz ovog fajla za konkretna pitanja o firmi.
Za opste savete o dresuri pasa moze koristiti opste znanje.
Ako informacija nije u fajlu, bot ce to jasno reci i preusmeriti korisnika na kontakt.

## Verzionisanje

Kada azuriras bazu znanja, preporucujemo da belezis promene u git commit poruci
ili u `_changelog` polju (opciono), da bi znao sta je i kada menjano.
