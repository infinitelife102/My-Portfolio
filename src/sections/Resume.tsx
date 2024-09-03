import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code2, Calendar, Building2 } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Senior Software Engineer',
    company: 'College Board',
    location: 'Tokyo, Japan',
    period: 'April 2021 - Present',
    description: 'Leading cross-platform mobile, backend, and AI-integrated features with focus on scale and user experience.',
    achievements: [
      'Led development of cross-platform mobile app using Flutter and React Native, achieving 4.8-star rating with 200K+ downloads',
      'Architected microservices backend with Node.js and AWS Lambda, handling 50K+ daily active users',
      'Integrated LLM-based features (OpenAI API, RAG) for in-app assistance and content summarization, improving engagement',
      'Implemented real-time push notification system and offline data synchronization, improving user retention by 35%',
      'Reduced app bundle size by 45% through code splitting and asset optimization techniques',
      'Mentored 4 junior developers and established mobile development best practices across the team',
      'Built CI/CD pipelines with GitHub Actions and Fastlane, reducing release cycle from 2 weeks to 3 days',
    ],
    tech: ['Flutter', 'React Native', 'Node.js', 'AWS Lambda', 'OpenAI API', 'LangChain', 'GitHub Actions', 'Fastlane'],
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'CoDigital, Inc.',
    location: 'Tokyo, Japan',
    period: 'June 2019 - March 2021',
    description: 'Developed blockchain-based and consumer mobile apps with React Native and Angular.',
    achievements: [
      'Developed blockchain-based mobile gaming app with React Native, integrating Web3 and wallet connectivity',
      'Published 3 iOS/Android apps to App Store and Play Store, maintaining 99.5% crash-free rate',
      'Built responsive admin dashboards with Angular and TypeScript, improving internal operations efficiency by 40%',
      'Implemented deep linking and universal links for seamless user onboarding experience',
      'Optimized app performance achieving 60fps scrolling and sub-second screen load times',
    ],
    tech: ['React Native', 'Angular', 'TypeScript', 'Web3', 'iOS', 'Android'],
  },
  {
    type: 'work',
    title: 'Mobile Developer Intern',
    company: 'Netwise',
    location: 'Tokyo, Japan',
    period: 'September 2018 - May 2019',
    description: 'Built full-featured booking and payment applications for iOS and Android.',
    achievements: [
      'Built full-featured booking application with React Native for both iOS and Android platforms',
      'Integrated secure payment processing with Stripe and Apple Pay, processing $2M+ in transactions',
      'Implemented biometric authentication (Face ID/Touch ID) for enhanced security',
      'Set up automated testing with Jest and Detox, achieving 85% code coverage',
    ],
    tech: ['React Native', 'Stripe', 'Apple Pay', 'Jest', 'Detox'],
  },
];

const education = [
  {
    type: 'education',
    degree: 'Bachelor of Engineering',
    school: 'University of Tokyo',
    location: 'Tokyo, Japan',
    period: '2014 - 2018',
    description: 'Computer Software Engineering.',
    achievements: [],
  },
];

const certifications = [
  {
    name: 'AWS Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    date: '',
    icon: Award,
  },
  {
    name: 'Google Cloud Professional Developer',
    issuer: 'Google',
    date: '',
    icon: Code2,
  },
  {
    name: 'React Native Certified Developer',
    issuer: 'Meta',
    date: '',
    icon: Briefcase,
  },
];

function TimelineItem({ item, index, isLeft }: { item: any; index: number; isLeft: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  const isWork = item.type === 'work';

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-start gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:flex-row`}
    >
      {/* Timeline Dot */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
          className="w-12 h-12 rounded-full timeline-dot flex items-center justify-center z-10"
        >
          {isWork ? (
            <Briefcase className="w-5 h-5 text-primary" />
          ) : (
            <GraduationCap className="w-5 h-5 text-primary" />
          )}
        </motion.div>
        {index < 2 && (
          <div className="w-0.5 h-full min-h-[100px] bg-gradient-to-b from-cyan-500/50 to-purple-500/50 mt-2" />
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 group">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {isWork ? item.title : item.degree}
            </h4>
            <div className="flex items-center gap-2 text-muted-foreground mt-1 font-medium">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">{isWork ? item.company : item.school}</span>
              <span className="text-border">•</span>
              <span className="text-sm">{isWork ? item.location : item.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/90 font-medium">{item.period}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground/90 text-sm leading-relaxed mb-4 font-medium">
          {item.description}
        </p>

        {/* Achievements */}
        {item.achievements && item.achievements.length > 0 && (
          <ul className="space-y-2 mb-4">
            {item.achievements.map((achievement: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack (for work items) */}
        {isWork && item.tech && (
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="resume" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            My Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-heading mb-4">
            Resume & <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
            A timeline of my professional growth and educational background
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Work Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-heading">Work Experience</h3>
            </motion.div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} item={exp} index={index} isLeft={true} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-heading">Education</h3>
            </motion.div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <TimelineItem key={index} item={edu} index={index} isLeft={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-heading mb-8 text-center">
            <span className="gradient-text">Certifications</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass rounded-xl p-6 text-center group hover:bg-white/5 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 group-hover:from-cyan-400/30 group-hover:to-purple-600/30 transition-colors">
                  <cert.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">{cert.name}</h4>
                <p className="text-muted-foreground text-sm font-medium">{cert.issuer}</p>
                <p className="text-primary text-xs mt-2 font-medium">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
