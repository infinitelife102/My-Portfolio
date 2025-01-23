# My Portfolio — Developer docs

## Overview

- **Project**: My Portfolio  
- **Purpose**: Developer portfolio; profile and contact data are configured via environment variables (no hardcoded personal data).  
- **Stack**: Node.js 20+, Vite 7.x, React 19, TypeScript, Tailwind CSS 3.4.x  

## Environment variables

Defined in `.env` (see `.env.example`). All `VITE_*` vars are exposed to the client.

| Variable | Used in | Description |
|----------|---------|-------------|
| `VITE_PROFILE_NAME` | Hero, About (initials), CV PDF | Full name |
| `VITE_PROFILE_EMAIL` | About, Contact, CV PDF | Email |
| `VITE_PROFILE_LOCATION` | About, Contact, CV PDF | Location (e.g. Tokyo) |
| `VITE_PROFILE_BIRTHDAY` | About, CV PDF | Birthday (e.g. Aug 1995) |
| `VITE_DISCORD` | Contact | Optional. Discord URL or username |
| `VITE_TELEGRAM` | Contact | Optional. Telegram username or full t.me URL |
| `VITE_FORMSPREE_ID` | Contact form | Formspree form ID so "Send Me a Message" emails you |

Config is read from `src/lib/env.ts`. Contact form POSTs to `https://formspree.io/f/{VITE_FORMSPREE_ID}` with JSON body.

## Config summary

| Item        | Value                    |
|------------|---------------------------|
| Bundler    | Vite 7.x                  |
| Port       | 5173 (falls back if in use) |
| Path alias | `@` → `src/`              |
| Build out  | `dist/` (base: `./`)      |

## Directory structure

```
src/
├── components/       # Shared components
│   ├── ui/           # shadcn-style UI (button, card, dialog, etc.)
│   ├── Navigation.tsx
│   └── Footer.tsx
├── lib/              # Shared logic
│   ├── env.ts        # Profile/contact config from import.meta.env
│   └── downloadCv.ts # CV PDF generation (jsPDF) using env
├── sections/         # Main page sections
│   ├── Hero.tsx      # Hero, name from env, role typing, Download CV
│   ├── About.tsx     # Intro, skills, stats; Born/Location/Email from env
│   ├── Resume.tsx    # Experience / education timeline
│   ├── Portfolio.tsx # Project cards (no "View More on GitHub")
│   └── Contact.tsx   # Email + optional Discord/Telegram, Formspree form
├── App.tsx           # Root: loading, DevBackground, nav, footer
├── main.tsx          # React entry
└── index.css         # Tailwind, global and background styles
```

## UI components (shadcn/Radix)

accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,  
button-group, button, calendar, card, carousel, chart, checkbox, collapsible,  
command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,  
hover-card, input-group, input-otp, input, item, kbd, label, menubar,  
navigation-menu, pagination, popover, progress, radio-group, resizable,  
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,  
spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip  

Example:

```ts
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
```

## Behavior

- **Background**: `DevBackground` only (grid + gradient). No particles or custom cursor.
- **Tab**: `index.html` — `<title>My Portfolio</title>`, `/favicon.svg`.
- **Routing**: Single page; section links use anchors (#about, #portfolio, #contact).
- **Contact form**: Real submission via Formspree when `VITE_FORMSPREE_ID` is set. Messages are sent to the form owner's email.

## References

- **Tailwind**: `tailwind.config.js`, `postcss.config.js`  
- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`  
- **ESLint**: `eslint.config.js`  
- **Vite**: `vite.config.ts` (React plugin, `@` alias, base path)

## Build & run

```bash
npm install
cp .env.example .env   # then edit .env
npm run dev      # Development
npm run build    # Build
npm run preview  # Preview dist
npm run lint     # Lint
```
