import { KnowledgeBase, Service } from "@/types/knowledge";
import knowledgeBaseData from "@/data/knowledge-base/knowledge-base.json";

export function getKnowledgeBase(): KnowledgeBase {
  return knowledgeBaseData as unknown as KnowledgeBase;
}

export function getGreetingMessage(): string {
  const kb = getKnowledgeBase();
  return kb.bot_behavior.greeting_message;
}

export function getQuickSuggestions(): string[] {
  const kb = getKnowledgeBase();
  return kb.bot_behavior.quick_suggestions.filter(
    (s) => s && !s.startsWith("[POPUNI")
  );
}

export function getServiceById(id: string): Service | undefined {
  const kb = getKnowledgeBase();
  return kb.services.find((s) => s.id === id);
}

/**
 * Formatira celu bazu znanja u tekst koji ce biti ubacen u system prompt.
 * Bot ne dobija sirovi JSON vec strukturiran tekst koji lako razume.
 */
export function formatKnowledgeBaseForPrompt(): string {
  const kb = getKnowledgeBase();
  const lines: string[] = [];

  // About
  lines.push("=== O SKOLI ===");
  if (!kb.about.school_name.startsWith("[POPUNI")) {
    lines.push(`Naziv: ${kb.about.school_name}`);
  }
  if (!kb.about.tagline.startsWith("[POPUNI")) {
    lines.push(`Slogan: ${kb.about.tagline}`);
  }
  if (!kb.about.description.startsWith("[POPUNI")) {
    lines.push(`Opis: ${kb.about.description}`);
  }
  if (!kb.about.philosophy.startsWith("[POPUNI")) {
    lines.push(`Filozofija rada: ${kb.about.philosophy}`);
  }
  if (!kb.about.certifications.startsWith("[POPUNI")) {
    lines.push(`Sertifikati: ${kb.about.certifications}`);
  }

  // Trainers
  const validTrainers = kb.about.trainers.filter(
    (t) => !t.name.startsWith("[POPUNI")
  );
  if (validTrainers.length > 0) {
    lines.push("\nTRENERI:");
    validTrainers.forEach((t) => {
      lines.push(`- ${t.name}, ${t.title}`);
      if (!t.bio.startsWith("[POPUNI")) lines.push(`  ${t.bio}`);
      if (!t.specializations.startsWith("[POPUNI"))
        lines.push(`  Specijalizacije: ${t.specializations}`);
    });
  }

  // Contact
  lines.push("\n=== KONTAKT I LOKACIJA ===");
  if (!kb.contact.phone.startsWith("[POPUNI")) {
    lines.push(`Telefon: ${kb.contact.phone}`);
  }
  if (!kb.contact.email.startsWith("[POPUNI")) {
    lines.push(`Email: ${kb.contact.email}`);
  }
  if (!kb.contact.website.startsWith("[POPUNI")) {
    lines.push(`Sajt: ${kb.contact.website}`);
  }
  if (!kb.contact.address.city.startsWith("[POPUNI")) {
    lines.push(`Grad: ${kb.contact.address.city}`);
  }
  if (
    kb.contact.address.address_line &&
    !kb.contact.address.address_line.startsWith("[POPUNI")
  ) {
    lines.push(`Adresa: ${kb.contact.address.address_line}`);
  }
  if (!kb.contact.address.area_coverage.startsWith("[POPUNI")) {
    lines.push(`Pokrivene oblasti: ${kb.contact.address.area_coverage}`);
  }

  // Working hours
  lines.push("\nRADNO VREME:");
  if (!kb.contact.working_hours.weekdays.startsWith("[POPUNI")) {
    lines.push(kb.contact.working_hours.weekdays);
  }
  if (!kb.contact.working_hours.saturday.startsWith("[POPUNI")) {
    lines.push(kb.contact.working_hours.saturday);
  }
  if (!kb.contact.working_hours.sunday.startsWith("[POPUNI")) {
    lines.push(kb.contact.working_hours.sunday);
  }
  if (
    kb.contact.working_hours.note &&
    !kb.contact.working_hours.note.startsWith("[POPUNI")
  ) {
    lines.push(`Napomena: ${kb.contact.working_hours.note}`);
  }

  // Services
  const validServices = kb.services.filter(
    (s) => !s.name.startsWith("[POPUNI")
  );
  if (validServices.length > 0) {
    lines.push("\n=== USLUGE ===");
    validServices.forEach((s) => {
      lines.push(`\n[${s.id}] ${s.name}`);
      if (!s.short_description.startsWith("[POPUNI")) {
        lines.push(`Opis: ${s.short_description}`);
      }
      if (!s.full_description.startsWith("[POPUNI")) {
        lines.push(`Detalji: ${s.full_description}`);
      }
      if (!s.suitable_for.startsWith("[POPUNI")) {
        lines.push(`Namenjeno za: ${s.suitable_for}`);
      }
      if (!s.duration.startsWith("[POPUNI")) {
        lines.push(`Trajanje: ${s.duration}`);
      }
      if (s.number_of_sessions && !s.number_of_sessions.startsWith("[POPUNI")) {
        lines.push(`Broj casova: ${s.number_of_sessions}`);
      }
      if (!s.location_type.startsWith("[POPUNI")) {
        lines.push(`Tip: ${s.location_type}`);
      }
      if (!s.problems_solved.startsWith("[POPUNI")) {
        lines.push(`Resava probleme: ${s.problems_solved}`);
      }
      if (kb.pricing.show_prices && s.price && !s.price.startsWith("[POPUNI")) {
        lines.push(`Cena: ${s.price}`);
      }
    });
  }

  // Pricing note
  if (!kb.pricing.show_prices) {
    lines.push(
      "\n=== CENE ===\nCene se ne prikazuju direktno. Korisnika uputiti da kontaktira tim za informacije o cenama."
    );
    if (
      kb.pricing.pricing_note &&
      !kb.pricing.pricing_note.startsWith("[POPUNI")
    ) {
      lines.push(kb.pricing.pricing_note);
    }
  }

  // FAQ
  const validFaqs = kb.faq.filter(
    (f) => !f.question.startsWith("[POPUNI") && !f.answer.startsWith("[POPUNI")
  );
  if (validFaqs.length > 0) {
    lines.push("\n=== CESTA PITANJA ===");
    validFaqs.forEach((f) => {
      lines.push(`\nP: ${f.question}`);
      lines.push(`O: ${f.answer}`);
    });
  }

  // Behavior recommendations
  lines.push("\n=== PREPORUKE PO PROBLEMU ===");
  kb.behavior_recommendations.mappings.forEach((m) => {
    if (!m.bot_note.startsWith("[POPUNI")) {
      const services = m.recommended_service_ids
        .map((id) => {
          const s = getServiceById(id);
          return s && !s.name.startsWith("[POPUNI") ? s.name : null;
        })
        .filter(Boolean);
      if (services.length > 0) {
        lines.push(
          `Kljucne reci: ${m.problem_keywords.slice(0, 4).join(", ")} => Preporuci: ${services.join(", ")}`
        );
        lines.push(`Napomena: ${m.bot_note}`);
      }
    }
  });

  // Policies
  lines.push("\n=== PRAVILA ===");
  if (!kb.policies.cancellation_policy.startsWith("[POPUNI")) {
    lines.push(`Otkazivanje: ${kb.policies.cancellation_policy}`);
  }
  if (!kb.policies.health_requirements.startsWith("[POPUNI")) {
    lines.push(`Zdravstveni zahtevi: ${kb.policies.health_requirements}`);
  }
  if (!kb.policies.owner_presence.startsWith("[POPUNI")) {
    lines.push(`Prisustvo vlasnika: ${kb.policies.owner_presence}`);
  }
  if (!kb.policies.results_disclaimer.startsWith("[POPUNI")) {
    lines.push(`Disclaimer rezultata: ${kb.policies.results_disclaimer}`);
  }
  lines.push(`Veterinarski disclaimer: ${kb.policies.veterinary_disclaimer}`);

  // Fallback contact
  if (!kb.bot_behavior.fallback_contact_message.startsWith("[POPUNI")) {
    lines.push(
      `\nKontakt poruka za nepoznate informacije: ${kb.bot_behavior.fallback_contact_message}`
    );
  }

  return lines.join("\n");
}
