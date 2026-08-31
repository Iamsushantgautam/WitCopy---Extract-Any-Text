import type { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tag?: string;
}

export interface FeatureShowcase {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  imageAlt: string;
  badgeText: string;
  interactiveType: "snippet-ocr" | "multi-lang" | "format-export";
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    badge?: string;
  }>;
}
