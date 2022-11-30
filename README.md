# My Portfolio

A developer portfolio for **Alex Chen**.  
Single-page app built with React, TypeScript, and Vite. Showcases skills, experience, projects, and contact.

## Tech Stack

- **Runtime / Build**: Node.js 20+, Vite 7.x
- **UI**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **UI components**: Radix UI (shadcn/ui style)

## Prerequisites

- Node.js 20+
- npm or yarn

## Run locally

```bash
# Install dependencies
npm install

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
├── sections/       # Page sections (Hero, About, Resume, Portfolio, Contact)
├── App.tsx         # Root component
├── main.tsx        # Entry point
├── index.css       # Global styles, Tailwind
└── ...
```

- **Background**: Static grid + subtle gradient (no particle or cursor animation).
- **Scripts**: See table below.

## Scripts

| Command           | Description        |
|-------------------|--------------------|
| `npm run dev`     | Start dev server   |
| `npm run build`   | Production build   |
| `npm run preview` | Preview build      |
| `npm run lint`    | Run ESLint         |

## Docs

- [info.md](./info.md) — Project setup, components, directory overview.

## License

Private. This repo is for portfolio use only.
