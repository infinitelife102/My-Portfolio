import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Layers, ShoppingCart, Globe, User, Home, Briefcase, Wrench } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
  { id: 'saas', label: 'SaaS', icon: Briefcase },
  { id: 'webapp', label: 'Web App', icon: Globe },
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'realestate', label: 'Real Estate', icon: Home },
  { id: 'service', label: 'Service', icon: Wrench },
];

const projects = [
  {
    id: 1,
    title: 'LuxeMart E-Commerce',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    description: 'A premium e-commerce platform with real-time inventory, AI-powered recommendations, and seamless checkout.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '12K', likes: '856' },
  },
  {
    id: 2,
    title: 'TaskFlow Pro',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    description: 'Enterprise project management SaaS with real-time collaboration, Gantt charts, and team analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '8.5K', likes: '623' },
  },
  {
    id: 3,
    title: 'CryptoTracker',
    category: 'webapp',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    description: 'Real-time cryptocurrency tracking dashboard with portfolio management and price alerts.',
    tech: ['Vue.js', 'Python', 'WebSockets', 'AWS'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '15K', likes: '1.2K' },
  },
  {
    id: 4,
    title: 'Design Portfolio',
    category: 'personal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'Creative portfolio website for a graphic designer with immersive animations and galleries.',
    tech: ['React', 'GSAP', 'Three.js', 'Framer Motion'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '6K', likes: '445' },
  },
  {
    id: 5,
    title: 'HomeFinder Pro',
    category: 'realestate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    description: 'Real estate platform with virtual tours, mortgage calculator, and neighborhood insights.',
    tech: ['Next.js', 'Mapbox', 'Prisma', 'Vercel'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '9K', likes: '712' },
  },
  {
    id: 6,
    title: 'FixItNow',
    category: 'service',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
    description: 'On-demand home services marketplace connecting homeowners with verified professionals.',
    tech: ['React Native', 'Firebase', 'Stripe', 'Node.js'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '7K', likes: '534' },
  },
  {
    id: 7,
    title: 'LearnHub',
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    description: 'Online learning platform with video courses, quizzes, and progress tracking.',
    tech: ['React', 'Django', 'PostgreSQL', 'AWS S3'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '11K', likes: '892' },
  },
  {
    id: 8,
    title: 'FoodieExpress',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    description: 'Food delivery app with real-time order tracking and restaurant management system.',
    tech: ['Flutter', 'Node.js', 'MongoDB', 'Google Maps'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '13K', likes: '967' },
  },
  {
    id: 9,
    title: 'DevBlog',
    category: 'personal',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    description: 'Technical blogging platform with markdown editor, syntax highlighting, and newsletter.',
    tech: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '5K', likes: '378' },
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center"
              >
                <Eye className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10"
              >
                <Github className="w-5 h-5 text-white" />
              </motion.a>
            </motion.div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full glass text-xs font-medium text-white/80 capitalize">
                {project.category}
              </span>
            </div>

            {/* Stats */}
            <div className="absolute top-4 right-4 flex gap-3">
              <div className="flex items-center gap-1 glass px-2 py-1 rounded-full">
                <Eye className="w-3 h-3 text-white/60" />
                <span className="text-xs text-white/60">{project.stats.views}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-white/70 border border-white/10"
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
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2 block">
            My Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
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
                  : 'glass text-white/70 hover:text-white hover:bg-white/10'
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

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
