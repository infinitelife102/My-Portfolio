<div align="center">

# 🛠️ System Architecture & Developer Guide

### **"The Internal Blueprint of Atsushi Kimura's Portfolio"**

<br/>

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📌 Project Overview

This is a high-performance, single-page developer portfolio designed for maximum flexibility. The core philosophy is **"Zero Hardcoding"**—all personal identity, contact details, and dynamic content are driven by environment variables, allowing the same engine to power multiple profiles effortlessly.

- **Engine**: React 19 + Vite 7 (Latest stable stack)
- **Styling**: Tailwind CSS 3.4 (Utility-first)
- **Components**: Radix UI + shadcn/ui primitives
- **Intelligence**: Integrated with Formspree for serverless contact handling

---

## 🔐 Environment Configuration

The application security and personalization rely on the `.env` file. All variables prefixed with `VITE_` are exposed to the client-side code.

### 📝 Profile Data
| Variable | Usage | Description |
|:---|:---|:---|
| `VITE_PROFILE_NAME` | Hero, About, CV PDF | Full identity name |
| `VITE_PROFILE_EMAIL` | Contact, Footer, CV | Primary contact email |
| `VITE_PROFILE_LOCATION` | About, Contact | Resident city/country |
| `VITE_PROFILE_BIRTHDAY` | About Section | Date of birth |

### 🔗 Social & Integration
| Variable | Usage | Description |
|:---|:---|:---|
| `VITE_DISCORD` | Social Links | Discord invite or username |
| `VITE_TELEGRAM` | Social Links | Telegram t.me link or handle |
| `VITE_FORMSPREE_ID` | API Endpoint | Formspree ID for message routing |

> 🖇️ **Note:** Configuration is centralized in `src/lib/env.ts` for type-safe access throughout the app.

---

## 🏗️ Directory Roadmap

```bash
f:\Portfolio\My-Portfolio\
├── 📂 public/           # Static assets (Favicon, PDF templates)
├── 📂 src/
│   ├── 📂 components/   # Atomic UI Elements
│   │   ├── 📂 ui/       # Radix/shadcn design system primitives
│   │   ├── 🧩 Navigation.tsx
│   │   └── 🧩 Footer.tsx
│   ├── 📂 lib/          # Core Logic & Utilities
│   │   ├── ⚙️ env.ts        # Environment variable validator
│   │   └── 📄 downloadCv.ts  # jsPDF logic for dynamic CV generation
│   ├── 📂 sections/     # Page Blocks (Logical grouping)
│   │   ├── ⚡ Hero.tsx       # Animated entrance & CTA
│   │   ├── 👤 About.tsx      # Personal bio & tech stats
│   │   ├── 📜 Resume.tsx     # Vertical experience timeline
│   │   ├── 📁 Portfolio.tsx  # Interactive project grid
│   │   └── 📧 Contact.tsx    # Formspree-powered communications
│   ├── 🧪 App.tsx       # Layout wrapper & Theme provider
│   ├── 🏁 main.tsx      # Application entry point
│   └── 🎨 index.css     # Global design tokens & Grid logic
└── ⚙️ vite.config.ts    # Build optimization & Path aliases
```

---

## 🎨 Component Library (Internal UI System)

The project leverages a robust set of UI primitives based on **Radix UI**, ensuring high accessibility (a11y) and silky-smooth interactions.

<details>
<summary>📂 View Available UI Components</summary>

- **Navigation**: Menubar, Pagination, Breadcrumb, Tabs
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Form validation
- **Feedback**: Alert, AlertDialog, Sonner (Toast), Progress, Skeleton, Spinner
- **Overlay**: Dialog, Sheet, Popover, Drawer, HoverCard, Tooltip
- **Data Display**: Tables, Cards, Accordion, Carousel, Calendar, Badge
- **Layout**: Sidebar, ScrollArea, Separator, Resizable, AspectRatio

</details>

```tsx
// Example of type-safe component usage
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
```

---

## 💻 Developer Workflow

### 🛠️ Local Setup
```bash
# 1. Prepare Environment
npm install

# 2. Inject Configuration (Essential)
cp .env.example .env
# Open .env and fill in your VITE_* credentials

# 3. Boot Engine
npm run dev
```

### 📦 Lifecycle Commands
| Command | Description |
|:---|:---|
| `npm run build` | Compiles optimized production bundle to `/dist` |
| `npm run preview` | Locally serve the production build for QA |
| `npm run lint` | Execute ESLint rules for code quality |

---

## 🔄 Behavioral Logic

1.  **The Grid System**: The `DevBackground` uses a 2D grid matrix with a radial gradient mask to create the modern "SaaS-lite" feel.
2.  **Serverless Mail**: The contact form doesn't need a backend. It POSTs directly to `https://formspree.io/f/{ID}`, handling spam and delivery automatically.
3.  **Dynamic PDF**: Clicking "Download CV" triggers `jsPDF` to generate a resume on-the-fly using the cached environment variables. No static PDF storage needed!

---

<div align="center">

**[← Back to Main README](./README.md)**

<br/>

*Designed for Engineers. Documentation by Atsushi Kimura.*

</div>
