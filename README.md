# My Portfolio

A developer portfolio (profile name and contact details come from environment variables).  
Single-page app built with React, TypeScript, and Vite. Showcases skills, experience, projects, and contact.

## Tech Stack

- **Runtime / Build**: Node.js 20+, Vite 7.x
- **UI**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **UI components**: Radix UI (shadcn/ui style)
- **CV download**: jsPDF (generates PDF from profile env)

## Prerequisites

- Node.js 20+
- npm or yarn

## Environment variables

Copy `.env.example` to `.env` and set your values. All profile and contact data is driven by env so nothing is hardcoded.

| Variable | Description |
|----------|-------------|
| `VITE_PROFILE_NAME` | Full name (e.g. Atsushi Kimura) |
| `VITE_PROFILE_EMAIL` | Email address |
| `VITE_PROFILE_LOCATION` | Location (e.g. Tokyo) |
| `VITE_PROFILE_BIRTHDAY` | Birthday (e.g. Aug 1995) |
| `VITE_DISCORD` | Optional. Discord invite URL or username |
| `VITE_TELEGRAM` | Optional. Telegram username (e.g. johndoe) or full t.me URL |
| `VITE_FORMSPREE_ID` | Formspree form ID for "Send Me a Message". Create a form at [formspree.io](https://formspree.io) and set this so messages are emailed to you. |

Without `VITE_FORMSPREE_ID`, the contact form will show an error when submitting.

## Run locally

```bash
# Install dependencies
npm install

# Copy env example and edit .env
cp .env.example .env

# Start dev server (default: http://localhost:5173)
npm run dev
```

The browser tab title is **My Portfolio** and the favicon uses a developer/code icon.

## Build & preview

```bash
# Production build
npm run build

# Preview build output
npm run preview
```

Output is written to the `dist/` directory.

## Project structure

```
src/
├── components/     # Shared components (Navigation, Footer, ui/)
├── lib/            # env.ts (profile/contact config), downloadCv.ts (CV PDF)
├── sections/       # Page sections (Hero, About, Resume, Portfolio, Contact)
├── App.tsx         # Root component
├── main.tsx        # Entry point
├── index.css       # Global styles, Tailwind
└── ...
```

- **Hero**: Name from env, "View My Work" and "Download CV" (CV is generated via jsPDF from env).
- **Contact**: Email (and optional Discord/Telegram from env). "Send Me a Message" submits to Formspree when `VITE_FORMSPREE_ID` is set.
- **Background**: Static grid + subtle gradient.

## Scripts

| Command           | Description        |
|-------------------|--------------------|
| `npm run dev`     | Start dev server   |
| `npm run build`   | Production build   |
| `npm run preview` | Preview build      |
| `npm run lint`    | Run ESLint         |

## Docs

- [info.md](./info.md) — Project setup, components, directory overview, env reference.

## License

Private. This repo is for portfolio use only.
