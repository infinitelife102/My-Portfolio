# My Portfolio — Developer docs

## Overview

- **Project**: My Portfolio  
- **Purpose**: Developer portfolio for Alex Chen  
- **Stack**: Node.js 20+, Vite 7.x, React 19, TypeScript, Tailwind CSS 3.4.x  

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
├── sections/         # Main page sections
│   ├── Hero.tsx      # Hero, name (Alex Chen), role typing
│   ├── About.tsx     # Intro, skills, stats
│   ├── Resume.tsx    # Experience / education timeline
│   ├── Portfolio.tsx # Project cards
│   └── Contact.tsx   # Contact form
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

## References

- **Tailwind**: `tailwind.config.js`, `postcss.config.js`  
- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`  
- **ESLint**: `eslint.config.js`  
- **Vite**: `vite.config.ts` (React plugin, `@` alias, base path)

## Build & run

```bash
npm install
npm run dev      # Development
npm run build    # Build
npm run preview  # Preview dist
npm run lint     # Lint
```
