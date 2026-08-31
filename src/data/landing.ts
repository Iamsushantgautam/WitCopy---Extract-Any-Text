import {
  Scan,
  Link,
  History,
  Bot
} from "lucide-react";
import type {
  NavItem,
  Feature,
  FeatureShowcase,
  HowItWorksStep,
  StatItem,
  Testimonial,
  FAQItem,
  FooterColumn
} from "../types/landing";

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Stats", href: "#stats" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Feedback", href: "#feedback" },
];


export const EDITORIAL_FEATURES: Feature[] = [
  {
    id: "01",
    number: "01",
    title: "Selected Area",
    description: "Copy selection or draw a box around any part of the screen to copy only the text inside that area using DOM TreeWalker spatial analysis.",
    icon: Scan,
    tag: "ALT + S",
  },
  {
    id: "02",
    number: "02",
    title: "Copy from Image",
    description: "Draw a box around any image area on screen to extract its text using Gemini 2.5 Flash API or local Tesseract.js fallback.",
    icon: Bot,
    tag: "ALT + I",
  },
  {
    id: "03",
    number: "03",
    title: "Copy from Link",
    description: "Click any hyperlink to instantly copy its text content or URL to your clipboard without triggering page navigation.",
    icon: Link,
    tag: "ALT + L",
  },
  {
    id: "04",
    number: "04",
    title: "Copy History",
    description: "Compact slide-over history panel embedded directly inside the popup. Search past extractions with 1-click copy & delete.",
    icon: History,
    tag: "LOCAL STORAGE",
  },
];


export const FEATURE_SHOWCASES: FeatureShowcase[] = [
  {
    id: "showcase-1",
    eyebrow: "Spatial DOM Analysis",
    title: "Selected Area: Copy exact text columns without grabbing clutter",
    description: "Draw a marquee box around any visual region. WitCopy spatially analyzes DOM text nodes using TreeWalker to extract only the text within your box — ideal for data tables, sidebars, and multi-column articles.",
    bullets: [
      "Spatially filters DOM text nodes relative to your selection box",
      "Directly copies natively highlighted text with zero box drawing",
      "Press Esc anytime to cancel active selection mode",
    ],
    imageAlt: "WitCopy Selected Area Spatial Snip Demonstration",
    badgeText: "Spatial DOM Engine",
    interactiveType: "snippet-ocr",
  },
  {
    id: "showcase-2",
    eyebrow: "Dual OCR Engine",
    title: "Copy from Image: Gemini 2.5 Flash API + Tesseract.js Local Fallback",
    description: "Extract text from complex images, diagrams, video frames, and scanned PDFs using our dual-engine architecture. Enjoy cloud-speed AI accuracy or complete offline privacy.",
    bullets: [
      "Gemini 2.5 Flash API for high-speed AI multimodal & code syntax parsing",
      "Tesseract.js offline fallback running 100% locally in your browser",
      "Configure and test your Gemini API Key in real-time extension settings",
    ],
    imageAlt: "WitCopy Dual Engine Image OCR Demonstration",
    badgeText: "Gemini 2.5 + Tesseract.js",
    interactiveType: "multi-lang",
  },
  {
    id: "showcase-3",
    eyebrow: "Link Extraction & History Drawer",
    title: "Copy from Link without navigating & Searchable Local History",
    description: "Hover and click any hyperlink to copy anchor text or URLs without navigating away from your active tab. Access all past extractions instantly inside the popup history drawer.",
    bullets: [
      "Extract link text & URLs without triggering tab navigation",
      "Slide-over history drawer with real-time keyword search",
      "Persisted locally in chrome.storage.local with 1-click card actions",
    ],
    imageAlt: "WitCopy Link Copy and History Drawer Demonstration",
    badgeText: "Zero Navigation & History",
    interactiveType: "format-export",
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Clone or Download Repository",
    description: "Download or clone the WitCopy repository to your local machine.",
    detail: "Get the project source code onto your local environment.",
  },
  {
    step: "02",
    title: "Open chrome://extensions/",
    description: "Open Google Chrome and navigate to chrome://extensions/ in your URL address bar.",
    detail: "Access Chrome's extension management page.",
  },
  {
    step: "03",
    title: "Enable Developer Mode",
    description: "Toggle the Developer Mode switch in the top-right corner of the Chrome extensions page.",
    detail: "Unlocks unpacked extension loading capability.",
  },
  {
    step: "04",
    title: "Click Load Unpacked",
    description: "Click the 'Load unpacked' button and select the folder containing manifest.json.",
    detail: "Select the root project folder containing manifest.json.",
  },
  {
    step: "05",
    title: "Pin & Start Extracting Text",
    description: "Pin WitCopy to your browser toolbar for instant text extraction across any webpage.",
    detail: "Choose Selected Area, Copy from Image, or Copy from Link mode.",
  },
];


export const STATS_ITEMS: StatItem[] = [
  {
    value: "Dual Engine",
    label: "Gemini 2.5 + Tesseract",
    subtext: "Multimodal AI speed & local offline fallback",
  },
  {
    value: "< 42ms",
    label: "Average Extraction Speed",
    subtext: "Instant spatial DOM & OCR processing",
  },
  {
    value: "100% Private",
    label: "Local Storage & Wasm",
    subtext: "Persisted securely in chrome.storage.local",
  },
  {
    value: "Manifest V3",
    label: "Latest Chrome Standard",
    subtext: "Dynamic script injection & CSP service worker",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Copy from Link is a lifesaver! I can grab URL titles and button anchor text without accidentally navigating away from my work dashboard.",
    author: "Alex Rivera",
    role: "Senior Frontend Engineer",
    company: "Vercel Ecosystem Community",
    avatarText: "AR",
    rating: 5,
  },
  {
    id: "t2",
    quote: "The dual-engine setup with Gemini 2.5 Flash and local Tesseract.js gives me super-fast code snippet extraction and complete offline privacy when needed.",
    author: "Dr. Elena Rostova",
    role: "AI Research Fellow",
    company: "Stanford NLP Lab",
    avatarText: "ER",
    rating: 5,
  },
  {
    id: "t3",
    quote: "The popup history panel with real-time keyword search makes retrieving past snips effortless. Manifest V3 performance feels instant.",
    author: "Marcus Chen",
    role: "Product Designer",
    company: "Stripe Community",
    avatarText: "MC",
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What core features does WitCopy provide?",
    answer: "WitCopy includes 4 primary tools: 1) Selected Area (ALT + S) to draw a marquee box and snip text, 2) Copy from Image (ALT + I) to extract text using Gemini 2.5 Flash or Tesseract.js, 3) Copy from Link (ALT + L) to copy link text/URLs without navigating, and 4) Copy History panel with instant search.",
  },
  {
    id: "faq-2",
    question: "How does Selected Area (ALT + S) extract text?",
    answer: "Selected Area uses DOM TreeWalker spatial analysis to evaluate text nodes within your drawn selection box. It extracts clean text from columns, sidebars, and tables without grabbing surrounding page clutter. It also instantly copies natively highlighted text.",
  },
  {
    id: "faq-3",
    question: "How does Copy from Image (ALT + I) Dual Engine work?",
    answer: "Copy from Image uses a dual engine: 1) Gemini 2.5 Flash API for high-speed AI multimodal OCR and handwriting recognition (requires your API key in extension settings), and 2) Tesseract.js as an offline fallback running 100% locally in your browser when no key is set.",
  },
  {
    id: "faq-4",
    question: "What is Copy from Link (ALT + L) mode?",
    answer: "Copy from Link enables a hover-and-click selection mode. Clicking any hyperlink instantly copies its anchor text or target URL directly to your clipboard without triggering tab navigation or leaving your current webpage.",
  },
  {
    id: "faq-5",
    question: "Where is my Gemini API Key and Copy History stored?",
    answer: "Your Gemini API Key and Copy History items are stored securely on your local device inside chrome.storage.local. Your data is never uploaded to remote servers or third-party tracking services.",
  },
  {
    id: "faq-6",
    question: "How do I install WitCopy unpacked in Google Chrome?",
    answer: "Clone or download the repository, open chrome://extensions/ in Chrome, toggle 'Developer mode' ON in the top-right corner, click 'Load unpacked', and select the project folder containing manifest.json.",
  },
];


import { APP_CONFIG } from "../lib/constants";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Interactive Demo", href: "#showcase" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Customer Reviews", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  {
    title: "Capabilities",
    links: [
      { label: "Selected Area", href: "#features", badge: "ALT + S" },
      { label: "Copy from Image", href: "#features", badge: "ALT + I" },
      { label: "Copy from Link", href: "#features", badge: "ALT + L" },
      { label: "Copy History", href: "#features", badge: "Local" },
    ],
  },


  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "Give Feedback", href: "#feedback" },
    ],
  },


  {
    title: "Connect",
    links: [
      { label: "Extension Repository", href: APP_CONFIG.githubUrl },
      { label: "Developer GitHub", href: APP_CONFIG.developerGithubUrl },
      { label: "Portfolio (sushant.online)", href: APP_CONFIG.portfolioUrl },
      { label: "Instagram (@sushant.webdev)", href: APP_CONFIG.instagramUrl },
    ],
  },
];

