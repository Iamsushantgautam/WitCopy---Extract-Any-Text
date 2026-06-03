# Witcopy Website

The official companion landing page for the [Witcopy Chrome Extension](../README.md). Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

**Live URL:** [witcopy.vercel.app](https://witcopy.vercel.app)

---

## 📁 Folder Structure

```
website/
├── index.html              # Main landing page
├── style.css               # All styles (dark theme, animations, layout)
├── script.js               # Interactive playground and FAQ accordion logic
├── logo.webp               # Hero section brand logo
├── witcopy-extension.zip   # Pre-built extension ZIP for download
└── pages/
    ├── contact.html        # Contact form page
    └── feedback.html       # User feedback / rating page
```

---

## 📄 Pages

### `index.html` — Main Landing Page

The primary entry point. Contains all major sections:

| Section | Anchor | Description |
|---|---|---|
| **Navbar** | — | Fixed top nav with links and "Download ZIP" CTA |
| **Hero** | `#` | Headline, description, download CTA, animated browser mockup |
| **Features** | `#features` | 4 feature cards with icons and keyboard shortcut badges |
| **Setup Guide** | `#guide` | 2-column step-by-step installation and usage guide |
| **Live Playground** | `#playground` | Interactive sandbox simulating the 3 core modes |
| **Tech Specs** | `#specs` | Architecture highlights (privacy, MV3, CSP bypass) |
| **FAQ** | `#faq` | Accordion-style frequently asked questions |
| **Footer** | — | Brand info, nav links, creator profile card |

### `pages/contact.html` — Contact Page

Form-based page allowing users to get in touch with the developer.

### `pages/feedback.html` — Feedback Page

Allows users to rate the extension and leave written feedback.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary Font | `Inter` (Google Fonts) | Body text |
| Display Font | `Outfit` (Google Fonts) | Headings and brand name |
| Icons | Font Awesome 6.4 | All UI icons |
| Theme | Dark mode | Background `#0a0a0f`, surface `#111118` |
| Accent | Indigo/Violet gradient | CTAs, highlights, gradient text |

---

## 🎮 Interactive Playground (`script.js`)

The live playground section simulates the extension's three core modes in-browser without requiring installation:

- **Selected Area Mode** — Click and drag on the sandbox to "copy" text blocks from a mock product spec table
- **Copy from Image (OCR) Mode** — Double-click or draw on a mock image to trigger a simulated OCR scan animation
- **Copy from Link Mode** — Click mock links to simulate extracting anchor text without navigation

All captured text is logged in a simulated history sidebar with search functionality.

---

## 🚀 Running Locally

This is a static website. No build step required.

```bash
# Option 1: Open directly
# Just open website/index.html in your browser

# Option 2: Use a local server (recommended to avoid CORS issues)
npx serve .

# Or with Python
python -m http.server 8080
```

---

## 🌍 Deployment

The site is deployed on **Vercel** via Git integration. A [`vercel.json`](../vercel.json) at the project root tells Vercel to serve only the `website/` subfolder:

```json
{
  "outputDirectory": "website"
}
```

This means Vercel ignores the `extension/` source code and only publishes the landing page. Any push to the connected branch triggers an automatic redeploy.

---

## 📦 Extension Download

The `witcopy-extension.zip` file in this folder is the pre-built, ready-to-install version of the Chrome extension. It is the file served when users click **"Download ZIP"** on the landing page.

To update it, rebuild the `extension/` folder contents and replace this ZIP file.

---

## 👤 Author

**Sushant Gautam**  
- GitHub: [@Iamsushantgautam](https://github.com/Iamsushantgautam)  
- LinkedIn: [iamsushantgautam](https://www.linkedin.com/in/iamsushantgautam)  
- Portfolio: [sushant.online](https://sushant.online)
