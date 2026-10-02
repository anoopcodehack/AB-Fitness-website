# 🏋️‍♂️ AB Fitness Hub — Enterprise Multi-Location Fitness Platform

[![Live Production](https://img.shields.io/badge/Production-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel&logoColor=white)](https://ab-fitness-website.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **A modern, high-performance, multi-tenant digital fitness platform engineered for AB Fitness Hub’s commercial gym branches and nutrition bar in Mangalore, India.**

---

## 📌 Executive Summary

**AB Fitness Hub** is a multi-branch fitness enterprise operating in Mangalore, Karnataka. This application serves as the primary digital touchpoint, membership conversion engine, and brand experience platform for thousands of active and prospective gym members across multiple franchise facilities.

Built with **React 19**, **TypeScript**, and **Tailwind CSS v4**, the architecture is designed around modular multi-location routing, dynamic client-side theming, search-engine visibility (SEO / JSON-LD LocalBusiness Schemas), and high-fidelity micro-interactions optimized for sub-second mobile and desktop load times.

---

## 🌐 Live Deployments & Branch Routing

- **Production URL**: [https://ab-fitness-website.vercel.app/](https://ab-fitness-website.vercel.app/)
- **Branch Selector (Portal)**: `/`
- **Kavoor Branch**: `/kavoor`
- **Deralakatte Branch**: `/deralakatte`
- **Protein Hub Nutrition Bar**: `/protein-hub`

---

## 🏗️ Architecture & Component Design

The project uses a modular Single-Page Application (SPA) architecture designed to scale with newly added franchise locations without codebase degradation.

```
                           ┌──────────────────────────┐
                           │      React 19 Root       │
                           │      (src/main.tsx)      │
                           └─────────────┬────────────┘
                                         │
                           ┌─────────────▼────────────┐
                           │   React Router DOM v7    │
                           │      (src/App.tsx)       │
                           └──────┬────────────┬──────┘
                                  │            │
            ┌─────────────────────┴───┐        └────────────────────┐
            ▼                         ▼                             ▼
┌───────────────────────┐ ┌───────────────────────┐   ┌───────────────────────────┐
│     Portal Router     │ │    Branch Context     │   │      Specialty Pages      │
│  (/) Branch Selector  │ │  (/kavoor,           │   │    (/protein-hub)         │
│  Cinematic Entrance   │ │   /deralakatte)       │   │    Nutritional Bar &      │
│  Location Dispatcher  │ │  Interactive Gym Spec │   │    Active Shake Menu      │
└───────────────────────┘ └───────────────────────┘   └───────────────────────────┘
```

### 🗂️ Repository Structure

```
d:/AB Fitness website/
├── public/                     # Static assets, crawlers & indexing specs
│   ├── favicon.ico             # Brand favicon
│   ├── robots.txt              # Search crawler permissions & sitemap declarations
│   └── sitemap.xml             # XML sitemap mapping canonical branch URLs
├── src/
│   ├── imports/                # Optimized media assets (high-res photography & videos)
│   ├── pages/                  # Page-level route views
│   │   ├── BranchSelector.tsx  # Interactive multi-location entrance portal
│   │   ├── Kavoor.tsx          # Flagship Kavoor branch operational view
│   │   ├── Deralakatte.tsx     # Deralakatte campus branch view
│   │   └── ProteinHub.tsx      # Protein Hub & nutritional smoothie bar showcase
│   ├── App.tsx                 # Client routing declarations & history handling
│   ├── index.css               # Design system tokens & Tailwind v4 imports
│   └── main.tsx                # React DOM 19 bootstrap entry point
├── index.html                  # HTML5 shell, Open Graph meta & JSON-LD Structured Data
├── package.json                # Dependency graph & script definitions
├── tsconfig.json               # Strict TypeScript compiler configuration
├── vercel.json                 # Edge rewrite configuration for SPA fallback
└── vite.config.ts              # Vite bundling pipeline, plugins & alias mappings
```

---

## ⚡ Core Technical Features

### 1. Multi-Tenant Branch Routing Engine
- Instant client-side switching between distinct gym branches with zero bundle reloads.
- Dedicated brand experiences, schedules, trainer rosters, and membership pricing customized per location.

### 2. Custom Theming & Design System
- Built-in **Dual-Theme Engine (Dark / Light)** with hardware-accelerated transitions.
- Synchronizes with system preferences via `prefers-color-scheme` with `localStorage` state persistence.
- Industrial athletic visual palette (`#080808` Dark, `#ff4800` Blaze Orange, `#00d4ff` Electric Cyan).

### 3. SEO & Multi-Location Structured Data (JSON-LD)
- Fully compliant with **Google Search Console** and Schema.org specifications.
- Embedded `@graph` microdata identifying both physical gym properties (`ExerciseGym`) with geographic coordinates, addresses, and direct inquiry lines:
  - Kavoor: *2nd Floor, Durga Prasad Complex, Kavoor, Mangalore - 575015*
  - Deralakatte: *Hotel Plaza Avenue, beside NITTE University, Deralakatte - 575018*
- Open Graph (`og:*`) and Twitter Card tags configured for dynamic social previews on WhatsApp, Facebook, and X.

### 4. High-Conversion Membership & Utility Modules
- **Interactive Fee Calculators**: Visual pricing breakdowns across 1-Month, 3-Month, 6-Month, and Annual memberships.
- **Cinematic Video Integration**: Background gym floor video reels loaded asynchronously with fallbacks.
- **Direct-to-WhatsApp Booking**: Automated message pre-filling for instant walk-in scheduling.
- **Protein Hub Nutrition Menu**: Categorized smoothie and recovery shake menu with macronutrient highlights.

---

## 🛠️ Technology Stack & Decisions

| Layer | Technology | Decision Rationale |
|---|---|---|
| **Runtime & UI** | `React 19` | Leveraging the latest concurrent features, improved memoization, and hydration performance. |
| **Type Safety** | `TypeScript 5.7` | Strict typing guarantees across props, state variables, color schemes, and router navigation. |
| **Bundler & Tooling** | `Vite 8` | Sub-second Hot Module Replacement (HMR) and optimized Rollup tree-shaking for lean production assets. |
| **Styling** | `Tailwind CSS v4` | Modern CSS-first engine using `@tailwindcss/vite` without legacy PostCSS overhead. |
| **Iconography** | `Lucide React` | Clean, accessible vector icons tree-shaken down to minimal byte size. |
| **Deployment** | `Vercel Edge` | Global CDN edge caching, automatic HTTPS, and zero-config deployment hooks. |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **Package Manager**: `npm` or `pnpm`

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anoopcodehack/AB-Fitness-website.git
   cd AB-Fitness-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Compile production build**:
   ```bash
   npm run build
   ```
   The compiled bundle will be output to the `/dist` directory.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📊 Performance, Accessibility & Best Practices

- **Semantic HTML5**: Native `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` layout tags.
- **Asset Optimization**: High-resolution photography served with optimized WebP/JPEG compression.
- **Client-Side Fallbacks**: Configured `vercel.json` rewrite rules (`/(.*) -> /index.html`) preventing 404 errors on deep-link page refreshes.
- **Zero CLS (Cumulative Layout Shift)**: Aspect-ratio locked containers for banners, trainers, and media grids.

---

## 🛣️ Engineering Roadmap

- [x] Multi-branch landing portal with animated transitions
- [x] Dedicated branch views (Kavoor & Deralakatte)
- [x] Protein Hub digital order menu
- [x] Multi-location Google Search SEO & JSON-LD Structured Data
- [ ] Member portal authentication with member check-in QR codes
- [ ] Direct online membership payment gateway (Razorpay / Stripe)
- [ ] Real-time gym capacity meter (Live member count)

---

## 👨‍💻 Engineering Team & Credits

- **Engineering & Architecture**: Developed with pride for **AB Fitness Hub**
- **Locations**: Kavoor & Deralakatte, Mangalore, Karnataka, India
- **Contact & Inquiries**: [AB Fitness Website](https://ab-fitness-website.vercel.app/)

---

<div align="center">
  <sub>Built with precision and passion for peak physical performance. © 2026 AB Fitness Hub. All rights reserved.</sub>
</div>
