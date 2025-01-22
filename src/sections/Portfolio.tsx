import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Eye, Layers, ShoppingCart, Globe, Smartphone, CheckCircle2, Trophy, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// NewsFlow gallery
import newsflowArticle from '@/assets/newsflow/article.png';
import newsflowCluster from '@/assets/newsflow/cluster.png';
import newsflowSummarizing from '@/assets/newsflow/summarizing.png';
import newsflowSummarizeSuccess from '@/assets/newsflow/summarize_success.png';
// NewsFlowApp gallery
import newsflowappHeadline from '@/assets/newsflowapp/headline.png';
import newsflowappSports from '@/assets/newsflowapp/sports.png';
import newsflowappBusiness from '@/assets/newsflowapp/business.png';

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'webapp', label: 'Web App', icon: Globe },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
];

const projects = [
  {
    id: 1,
    title: 'MarketHub',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    badge: 'Multi-Vendor · AI',
    description: 'Full-stack multi-vendor e-commerce platform — buyers, sellers, and admins each get a dedicated portal. Stripe payments, Supabase auth, real-time analytics, and Grok AI-powered product descriptions.',
    tech: ['Next.js 14', 'TypeScript', 'Supabase', 'Stripe', 'Grok API (xAI)', 'Tailwind CSS', 'Recharts', 'PostgreSQL'],
    demoUrl: 'https://market-hub-delta.vercel.app/',
    githubUrl: 'https://github.com/infinitelife102/MarketHub',
    stats: { views: '—', likes: '—' },
    purpose: 'Build a production-ready marketplace where vendors can list & manage products, admins can approve sellers and track revenue, and buyers get a seamless checkout — all on one platform.',
    features: [
      'Three-role system: Buyer · Vendor · Admin — each with a dedicated portal & dashboard',
      'Stripe checkout & subscriptions with webhook handling; Supabase Auth + Google OAuth',
      'Vendor dashboard: product CRUD, order management & real revenue/order analytics charts',
      'Admin dashboard: live stats (vs. prior month %), 7-day revenue chart, vendor approval flow',
      'Grok (xAI) AI — auto-generates product descriptions & summarizes customer reviews',
      'Persistent cart & wishlist via React Context; product catalog with category, search & filter',
    ],
    achievements: [
      'End-to-end marketplace: buyer, vendor & admin flows all wired to a live Supabase PostgreSQL DB',
      'Real admin analytics — revenue/orders grouped by day, month-over-month % change from actual data',
      'AI integration via Grok API for description generation & review summarization',
    ],
  },
  {
    id: 2,
    title: 'NewsFlow',
    category: 'webapp',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
    badge: 'Full-Stack AI',
    description: 'End-to-end AI news intelligence platform — crawls multiple sources, clusters related stories with vector embeddings, then streams developer-focused summaries via Gemini & Groq LLMs.',
    tech: ['Next.js 14', 'FastAPI', 'Python', 'Supabase', 'pgvector', 'BeautifulSoup4', 'Playwright', 'Gemini API', 'Groq', 'Tailwind', 'shadcn/ui'],
    demoUrl: 'https://real-estate-hub-pi.vercel.app',
    githubUrl: 'https://github.com/infinitelife102/NewsFlow',
    stats: { views: '1K', likes: '1' },
    purpose: 'Kill developer news overload — auto-collect, deduplicate, cluster, and summarize IT/AI articles so you see only the insights that matter, powered entirely by free-tier AI APIs.',
    features: [
      'Multi-source crawler: NewsAPI, RSS feeds & Playwright scraping',
      'Sentence-transformer embeddings + cosine-similarity clustering',
      'Gemini / Groq LLM summarization with streaming output',
      'Supabase + pgvector for scalable vector similarity search',
      'Parallel count + list queries for sub-2 round-trip page loads',
      'Per-article & per-cluster AI summary views with "Show more" UX',
      'Admin panel for crawl management & cluster deletion',
    ],
    achievements: [
      'Built a complete crawl → embed → cluster → summarize AI pipeline from scratch',
      'Achieved fast page loads via thread-pool-parallelized Supabase queries',
      'Delivered full documentation: Architecture, API, Setup & Clustering guides',
    ],
    galleryImages: [
      newsflowArticle,
      newsflowCluster,
      newsflowSummarizing,
      newsflowSummarizeSuccess,
    ],
  },
  {
    id: 3,
    title: 'E-Commerce Template',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
    badge: 'Live Demo',
    description: 'Pixel-perfect React 19 storefront with a blazing-fast Vite 7 build — silky-smooth checkout flow, persistent cart, and responsive design, all without a single line of backend.',
    tech: ['React 19', 'Vite 7', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'React Router 7', 'shadcn/ui'],
    demoUrl: 'https://infinitelife102.github.io/E-Commerce-Template/',
    githubUrl: 'https://github.com/infinitelife102/E-Commerce-Template',
    stats: { views: '1K', likes: '1' },
    purpose: 'Prove that a polished, production-grade shopping experience can be delivered purely in the browser — ideal as a rapid client demo or zero-backend starter kit.',
    features: [
      'Multi-category product catalog with instant client-side search',
      'Rich product detail pages with related-item recommendations',
      'Persistent cart powered by localStorage — survives page reload',
      'Full checkout flow with shipping address input & order summary',
      'Mobile-first responsive layout built with Radix UI primitives',
    ],
    achievements: [
      'Zero-backend architecture — ships as a fully static site to GitHub Pages',
      'Adopts React 19 concurrent features & Vite 7 build pipeline for lightning DX',
    ],
  },
  {
    id: 4,
    title: 'CryptoTracker',
    category: 'webapp',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    badge: 'Live Demo',
    description: 'Professional-grade real-time crypto dashboard — tracks top 50 coins, renders interactive multi-period charts, manages a virtual portfolio with live P&L, and fires browser push alerts on price triggers. Pure frontend, zero backend.',
    tech: ['React 19', 'TypeScript 5.9', 'Vite 7', 'Tailwind CSS 3.4', 'shadcn/ui', 'Recharts 2', 'Zustand 5', 'React Router 7', 'React Hook Form', 'Zod', 'CoinGecko API v3', 'Lucide React'],
    demoUrl: 'https://crypto-track-fawn.vercel.app/',
    githubUrl: 'https://github.com/infinitelife102/CryptoTrack',
    stats: { views: '1K', likes: '1' },
    purpose: 'Deliver a Bloomberg-like crypto experience entirely in the browser — no account, no API key, no server — using CoinGecko\'s free public API and Zustand-persisted local state.',
    features: [
      'Market Dashboard: top 50 coins with 1h / 24h / 7d % columns, green/red flash on live refresh every 30 s',
      'Coin Detail: interactive area chart (1D / 7D / 30D / 1Y), ATH / ATL, market cap, supply stats',
      'Virtual Portfolio: add holdings with quantity & avg buy price; real-time P&L, total return & cost-basis cards',
      'Price Alerts: above / below triggers per coin — fires browser push notification when price crosses the target',
      'Global Stats bar: live total market cap, 24h volume & BTC dominance — auto-refreshed every 30 s',
      'Debounced live search + Favorites watchlist tab — all three stores persisted via Zustand persist + localStorage',
    ],
    achievements: [
      'Fully static SPA — ships to Vercel with no backend; CoinGecko free tier powers all 6 API endpoints',
      'Three independent Zustand persist stores (portfolio, alerts, favorites) survive page refresh & browser close',
      'Robust error UX: 15 s timeout, HTTP 429 rate-limit detection, network error — each with a Retry button',
    ],
  },
  {
    id: 5,
    title: 'AI Business Mentor Chat',
    category: 'webapp',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop',
    badge: 'Streaming AI · Flutter',
    description: 'Flutter AI chatbot powered by Llama 3.3-70B on Groq — responses stream word-by-word in real time and every conversation is persisted in Supabase PostgreSQL for unlimited history.',
    tech: ['Flutter', 'Dart', 'Groq API', 'Llama 3.3-70B', 'Supabase', 'PostgreSQL'],
    demoUrl: 'https://ai-chatting-one.vercel.app/',
    githubUrl: 'https://github.com/infinitelife102/AI-Chatting',
    stats: { views: '1K', likes: '1' },
    purpose: 'Give anyone a pocket business mentor — Groq\'s near-instant inference delivers rapid AI replies, while Supabase preserves every conversation for long-term knowledge retention.',
    features: [
      'Llama 3.3-70B-Versatile via Groq — state-of-the-art free-tier LLM',
      'Server-sent-event streaming — tokens render as they arrive',
      'Full conversation history stored & loaded from Supabase',
      'Live connection health checks for Groq and Supabase',
      'Cross-platform Flutter app: Android, iOS & Web',
    ],
    achievements: [
      'Sub-500 ms time-to-first-token on Groq free tier',
      'Streaming delta rendering with zero UI jank using custom stream manager',
      'Documented architecture: SETUP, API reference & CONTRIBUTING guide',
    ],
  },
  {
    id: 6,
    title: 'NoteTaking — Wisdom',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop',
    badge: 'App Store Live',
    description: 'Privacy-first Flutter note app — 100% offline, AES-encrypted Hive storage, rich text & images, and published live on the Apple App Store across 6 platforms from a single codebase.',
    tech: ['Flutter', 'Dart', 'Hive (AES)', 'Material 3', 'flutter_launcher_icons', 'build_runner'],
    demoUrl: 'https://apps.apple.com/us/app/wisdom-note-taking-app/id6744746646',
    githubUrl: 'https://github.com/infinitelife102/NoteTaking',
    stats: { views: '2K', likes: '—' },
    purpose: 'Your notes, your device — no accounts, no cloud, no tracking. Fast, secure, beautiful note-taking that works everywhere Flutter runs, from phone to desktop to browser.',
    features: [
      'AES-encrypted local storage with Hive — data never leaves the device',
      'Rich notes: text with formatting, camera capture & gallery images',
      'Adaptive light / dark theme (system-sync or manual toggle)',
      'Trash bin with one-tap restore for accidentally deleted notes',
      'Universal builds: Android, iOS, macOS, Windows, Linux & Web',
    ],
    achievements: [
      'Published on Apple App Store as "Wisdom Note Taking App"',
      'Single Flutter codebase ships across 6 platforms simultaneously',
      'Zero data collection — full privacy compliance by design',
    ],
  },
  {
    id: 7,
    title: 'NewsFlowApp',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1760199789464-7d3989e22758?q=80&w=687&auto=format&fit=crop',
    badge: 'KMM · Compose · SwiftUI',
    description: 'Cross-platform news app with a single Kotlin Multiplatform core — shared ViewModels & Ktor networking power native Jetpack Compose on Android and SwiftUI on iOS simultaneously.',
    tech: ['Kotlin Multiplatform', 'Jetpack Compose', 'SwiftUI', 'SQLDelight', 'Ktor', 'Kotlin Coroutines', 'Flow', 'Hilt'],
    demoUrl: 'https://github.com/infinitelife102/NewsFlowApp',
    githubUrl: 'https://github.com/infinitelife102/NewsFlowApp',
    stats: { views: '—', likes: '—' },
    purpose: 'Showcase KMM\'s "write once, run natively" potential — share business logic, networking and DB across platforms while keeping fully native, platform-idiomatic UIs.',
    features: [
      'KMM shared module: ViewModels, Ktor HTTP client & Kotlin Serialization',
      'Jetpack Compose with Material You dynamic color on Android',
      'SwiftUI with native feel on iOS',
      'SQLDelight for type-safe local article caching & offline reading',
      'MVVM + Kotlin Flow unidirectional data flow',
      'Hilt dependency injection on Android',
    ],
    achievements: [
      'One Kotlin codebase drives two fully native apps — Android & iOS',
      'Clean Architecture: data · domain · presentation layers with clear boundaries',
      'Country-specific news filtering via News API integration',
    ],
    galleryImages: [
      newsflowappHeadline,
      newsflowappSports,
      newsflowappBusiness,
    ],
  },
];

function ProjectCard({
  project,
  index,
  onEyeClick,
}: {
  project: typeof projects[0];
  index: number;
  onEyeClick: (project: typeof projects[0]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const hasGallery = 'galleryImages' in project && Array.isArray(project.galleryImages) && project.galleryImages.length > 0;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="gradient-border p-0.5 rounded-2xl h-full">
        <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">

          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70" />

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {hasGallery ? (
                <motion.button
                  type="button"
                  onClick={() => onEyeClick(project)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center shadow-lg border-0 cursor-pointer"
                >
                  <Eye className="w-5 h-5 text-primary-foreground" />
                </motion.button>
              ) : (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center shadow-lg"
                >
                  <Eye className="w-5 h-5 text-primary-foreground" />
                </motion.a>
              )}
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 shadow-lg"
              >
                <Github className="w-5 h-5 text-primary-foreground" />
              </motion.a>
            </div>

            {/* Category Badge — bottom-left */}
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 rounded-full glass text-xs font-medium text-foreground/90 capitalize backdrop-blur-md">
                {project.category}
              </span>
            </div>

            {/* Highlight Badge — top-right */}
            {'badge' in project && project.badge && (
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-md shadow-md">
                  {project.badge}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col gap-3">

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-medium">
              {project.description}
            </p>

            {/* Purpose */}
            {'purpose' in project && project.purpose && (
              <div className="flex gap-2 items-start">
                <Zap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground/90 text-xs leading-relaxed line-clamp-2">
                  {project.purpose}
                </p>
              </div>
            )}

            {/* Features */}
            {'features' in project && Array.isArray(project.features) && project.features.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1.5">Key Features</p>
                <ul className="space-y-1">
                  {project.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground text-xs leading-relaxed">{f}</span>
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-xs text-muted-foreground/60 pl-5">
                      +{project.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {'achievements' in project && Array.isArray(project.achievements) && project.achievements.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1.5">Achievements</p>
                <ul className="space-y-1">
                  {project.achievements.slice(0, 2).map((a, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground text-xs leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1 border-t border-border/40">
              {project.tech.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted/60 text-foreground/80 border border-border/60"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 6 && (
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted/40 text-muted-foreground border border-border/40">
                  +{project.tech.length - 6}
                </span>
              )}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [galleryProject, setGalleryProject] = useState<typeof projects[0] | null>(null);
  const carouselApiRef = useRef<CarouselApi | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Keyboard navigation when gallery dialog is open
  useEffect(() => {
    if (!galleryProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        carouselApiRef.current?.scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        carouselApiRef.current?.scrollNext();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [galleryProject]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleEyeClick = (project: typeof projects[0]) => {
    if ('galleryImages' in project && Array.isArray(project.galleryImages) && project.galleryImages.length > 0) {
      setGalleryProject(project);
    } else {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-heading mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
            A collection of projects that showcase my skills and passion for creating amazing digital experiences
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'filter-btn-active'
                  : 'glass text-foreground/90 hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onEyeClick={handleEyeClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Gallery slide dialog for NewsFlow / NewsFlowApp */}
      <Dialog open={!!galleryProject} onOpenChange={(open) => !open && setGalleryProject(null)}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-[90vh] overflow-hidden flex flex-col p-0 gap-0 sm:max-w-[90vw]">
          {galleryProject && 'galleryImages' in galleryProject && Array.isArray(galleryProject.galleryImages) && (
            <>
              <DialogTitle className="sr-only">{galleryProject.title} — Screenshots</DialogTitle>
              <div className="px-6 pt-4 pb-2 pr-12 text-lg font-semibold text-foreground shrink-0">
                {galleryProject.title}
              </div>
              <div className="flex-1 min-h-0 flex items-center justify-center px-4 pb-4">
                <Carousel
                  opts={{ loop: true }}
                  className="w-full h-full"
                  setApi={(api) => { carouselApiRef.current = api; }}
                >
                  <CarouselContent className="-ml-2 sm:-ml-4 h-full">
                    {galleryProject.galleryImages.map((src, i) => (
                      <CarouselItem key={i} className="pl-2 sm:pl-4 basis-full flex items-center justify-center">
                        <div className="w-full h-full min-h-[70vh] flex items-center justify-center bg-muted/20 rounded-lg">
                          <img
                            src={src}
                            alt={`${galleryProject.title} screenshot ${i + 1}`}
                            className="max-w-full max-h-[78vh] w-auto h-auto object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 sm:left-4 size-10" />
                  <CarouselNext className="right-2 sm:right-4 size-10" />
                </Carousel>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
