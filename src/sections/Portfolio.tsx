import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Eye, Layers, ShoppingCart, Globe, User, Home, Briefcase, Wrench, Smartphone } from 'lucide-react';
import imgFlutter from '@/assets/portfolio/flutter-app.svg?url';
import imgIsowords from '@/assets/portfolio/isowords-app.svg?url';
import imgReactNative from '@/assets/portfolio/reactnative-app.svg?url';
import imgNowInAndroid from '@/assets/portfolio/nowinandroid-app.svg?url';

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
  { id: 'saas', label: 'SaaS', icon: Briefcase },
  { id: 'webapp', label: 'Web App', icon: Globe },
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'realestate', label: 'Real Estate', icon: Home },
  { id: 'service', label: 'Service', icon: Wrench },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
];

const projects = [
  // Web — E-Commerce
  {
    id: 1,
    title: 'Your Next Store',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    description: 'Open-source e-commerce platform with Next.js, Stripe, and ultra-fast storefront. Live demo available.',
    tech: ['Next.js', 'Stripe', 'TypeScript', 'Tailwind'],
    demoUrl: 'https://demo.yournextstore.com',
    githubUrl: 'https://github.com/yournextstore/yournextstore',
    stats: { views: '5.3K', likes: '643' },
  },
  // Web — Real Estate
  {
    id: 6,
    title: 'NewsFlow',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1760199789464-7d3989e22758?q=80&w=687&auto=format&fit=crop',
    description: 'Full-stack real estate platform with Mapbox, Google Auth, Cloudinary, and owner messaging.',
    tech: ['Next.js', 'Mapbox', 'MongoDB', 'Cloudinary'],
    demoUrl: 'https://real-estate-hub-pi.vercel.app',
    githubUrl: 'https://github.com/infinitelife102/NewsFlow',
    stats: { views: '1K', likes: '1' },
  },
  // Web — Real Estate
  {
    id: 6,
    title: 'E-Commerce-Template',
    category: 'E-Commerce',
    image: 'https://thumbs.dreamstime.com/b/online-shopping-ecommerce-laptop-phone-bicycle-shoes-modern-technology-digital-lifestyle-retail-purchase-internet-store-person-357096364.jpg?w=768',
    description: 'Full-stack real estate platform with Mapbox, Google Auth, Cloudinary, and owner messaging.',
    tech: ['Next.js', 'Mapbox', 'MongoDB', 'Cloudinary'],
    demoUrl: 'https://infinitelife102.github.io/E-Commerce-Template/',
    githubUrl: 'https://github.com/infinitelife102/E-Commerce-Template',
    stats: { views: '1K', likes: '1' },
  },  
  // Web App
  {
    id: 5,
    title: 'AI-Chatting',
    category: 'Web App',
    image: 'https://plus.unsplash.com/premium_vector-1725939109042-ed1ce1a716cf?q=80&w=880&auto=format&fit=crop',
    description: 'Full-stack real estate platform with Mapbox, Google Auth, Cloudinary, and owner messaging.',
    tech: ['Next.js', 'Mapbox', 'MongoDB', 'Cloudinary'],
    demoUrl: 'https://ai-chatting-one.vercel.app/',
    githubUrl: 'https://github.com/infinitelife102/AI-Chatting',
    stats: { views: '1K', likes: '1' },
  },
  // Mobile — Flutter
  {
    id: 10,
    title: 'Wisdom',
    category: 'mobile',
    image: imgFlutter,
    description: 'Production-ready Flutter demo with 25+ modules: dashboard, chat, email, kanban, e-commerce. Web & native.',
    tech: ['Flutter', 'Dart', 'Material 3', 'Firebase'],
    demoUrl: 'https://apps.apple.com/us/app/wisdom-note-taking-app/id6744746646',
    githubUrl: 'https://github.com/infinitelife102/Wisdom',
    stats: { views: '2K', likes: '—' },
  },
  // Mobile — Swift
  {
    id: 11,
    title: 'isowords',
    category: 'mobile',
    image: imgIsowords,
    description: 'Word search game on a 3D cube. SwiftUI + Composable Architecture. Available on App Store, open source.',
    tech: ['Swift', 'SwiftUI', 'Composable Architecture'],
    demoUrl: 'https://apps.apple.com/us/app/isowords/id1528246952',
    githubUrl: 'https://github.com/pointfreeco/isowords',
    stats: { views: '2.9K', likes: '—' },
  },
  // Mobile — Kotlin
  {
    id: 13,
    title: 'Now in Android',
    category: 'mobile',
    image: imgNowInAndroid,
    description: 'Official Android sample app in Kotlin & Jetpack Compose. News, bookmarks, push. Reference architecture.',
    tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Material 3'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.google.samples.apps.nowinandroid',
    githubUrl: 'https://github.com/android/nowinandroid',
    stats: { views: '18.6K', likes: '3.5K' },
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

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
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
            
            {/* Hover Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center"
              >
                <Eye className="w-5 h-5 text-primary-foreground" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10"
              >
                <Github className="w-5 h-5 text-primary-foreground" />
              </motion.a>
            </motion.div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full glass text-xs font-medium text-foreground/90 capitalize">
                {project.category}
              </span>
            </div>

            {/* Stats */}
            {/* <div className="absolute top-4 right-4 flex gap-3">
              <div className="flex items-center gap-1 glass px-2 py-1 rounded-full">
                <Eye className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">{project.stats.views}</span>
              </div>
            </div> */}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1 font-medium">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-muted/50 text-foreground/90 border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
