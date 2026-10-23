# SASSA Help Hub 🇿🇦

A comprehensive, production-ready Next.js web application providing SASSA (South African Social Security Agency) beneficiaries with accurate information, guidance, and tools. This is an **Independent Resource** with prominent disclaimers throughout.

![SASSA Help Hub](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue)

## 🌟 Features

### Core Functionality

- **📱 Mobile-First Design** - Optimized for South African mobile users
- **🌍 Multilingual Support** - English, isiZulu, and isiXhosa support in guides
- **🔍 Smart Search** - FAQ and guide search functionality
- **📅 Payment Schedule** - Current 2026 payment dates and countdowns
- **🛡️ Scam Protection Hub** - Education and detection tools
- **🗺️ Office Locator** - Find local SASSA offices
- **👥 Community Support** - Curated help and eligibility tools

### Accessibility & Performance

- **♿ WCAG 2.1 AA Compliant** - Screen reader compatible, keyboard navigation
- **⚡ Next.js SSR/SSG** - Optimized for SEO and fast indexing
- **📱 PWA Ready** - Installable progressive web app
- **⚡ Optimized Assets** - WebP images and efficient code splitting

### Compliance & Legal

- **📋 Legal Pages** - Privacy policy, terms of service, and official disclaimers
- **💰 AdSense Integration** - Compliant monetization with account verification

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone and Install**

```bash
git clone https://github.com/yourusername/sassa-help-hub.git
cd sassa-help-hub
npm install
```

2. **Start Development**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router (Pages and API)
├── components/           # Reusable UI components
│   ├── Common/          # Shared components (AdSense, AdUnit, etc.)
│   ├── Layout/          # Layout components (Navbar, Footer, AlertBanner)
│   └── ScamAlert/       # Fraud prevention components
├── public/               # Static assets
└── data/                 # JSON data files (Updates, Guides, Payments)
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
2. **Environment Variables** - Add AdSense and Analytics IDs if applicable.
3. **Build Command** - `npm run build`
4. **Output Directory** - `.next` (default)

The homepage, payment calendar, and status-check page revalidate every 15 minutes. The GitHub Actions **Production freshness** workflow checks that production serves the latest `main` commit and matching schedule/update data, and reports stale deployments or content in the Actions tab. It runs after pushes to `main` and every 30 minutes.

## 📄 Legal & Compliance

### Disclaimer

This is an **independent resource** not affiliated with SASSA or the South African Government. Users must verify all information through official SASSA channels:

- **Official Website**: https://www.sassa.gov.za
- **Helpline**: 0800 60 10 11

---

**Built with ❤️ for South African SASSA beneficiaries**
