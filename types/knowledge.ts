export interface Trainer {
  name: string;
  title: string;
  experience_years: string;
  specializations: string;
  bio: string;
}

export interface About {
  school_name: string;
  tagline: string;
  description: string;
  founded_year: string;
  trainers: Trainer[];
  certifications: string;
  philosophy: string;
}

export interface ContactHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  note: string;
}

export interface ContactAddress {
  city: string;
  municipality: string;
  address_line: string;
  area_coverage: string;
}

export interface Contact {
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  address: ContactAddress;
  working_hours: ContactHours;
}

export interface Service {
  id: string;
  name: string;
  short_description: string;
  full_description: string;
  suitable_for: string;
  duration: string;
  number_of_sessions: string;
  location_type: string;
  price: string | null;
  problems_solved: string;
}

export interface Pricing {
  show_prices: boolean;
  note: string;
  prices: Array<{ service_id: string; price: string }>;
  pricing_note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BehaviorMapping {
  problem_keywords: string[];
  recommended_service_ids: string[];
  bot_note: string;
}

export interface BehaviorRecommendations {
  description: string;
  mappings: BehaviorMapping[];
}

export interface Policies {
  cancellation_policy: string;
  health_requirements: string;
  age_restrictions: string;
  aggressive_dog_policy: string;
  owner_presence: string;
  payment_policy: string;
  results_disclaimer: string;
  veterinary_disclaimer: string;
}

export interface BotBehavior {
  default_language_note: string;
  tone: string;
  no_hallucination_rule: string;
  fallback_contact_message: string;
  greeting_message: string;
  quick_suggestions: string[];
}

export interface KnowledgeBase {
  _instructions: Record<string, string>;
  about: About;
  contact: Contact;
  services: Service[];
  pricing: Pricing;
  faq: FaqItem[];
  behavior_recommendations: BehaviorRecommendations;
  policies: Policies;
  bot_behavior: BotBehavior;
}
