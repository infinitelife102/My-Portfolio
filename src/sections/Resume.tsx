import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code2, Calendar, Building2 } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Senior Full-Stack Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    period: '2021 - Present',
    description: 'Leading a team of 5 developers in building scalable web applications. Architected microservices infrastructure serving 1M+ users daily.',
    achievements: [
      'Reduced API response time by 60% through optimization',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
      'Mentored junior developers and conducted code reviews',
    ],
    tech: ['React', 'Node.js', 'AWS', 'Kubernetes', 'PostgreSQL'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    period: '2019 - 2021',
    description: 'Developed and maintained multiple client projects. Worked closely with designers to implement pixel-perfect UI.',
    achievements: [
      'Built real-time chat application using WebSockets',
      'Created reusable component library used across 10+ projects',
      'Improved website performance score from 60 to 95',
    ],
    tech: ['Vue.js', 'Python', 'Django', 'Redis', 'Docker'],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'Los Angeles, CA',
    period: '2017 - 2019',
    description: 'Collaborated with cross-functional teams to deliver high-quality web applications for various clients.',
    achievements: [
      'Developed 20+ responsive websites for clients',
      'Implemented accessibility standards (WCAG 2.1)',
      'Reduced bundle size by 40% through optimization',
    ],
    tech: ['JavaScript', 'HTML/CSS', 'Sass', 'jQuery', 'WordPress'],
  },
];

const education = [
  {
    type: 'education',
    degree: 'Master of Science in Computer Science',
    school: 'Stanford University',
    location: 'Stanford, CA',
    period: '2015 - 2017',
    description: 'Specialized in Artificial Intelligence and Machine Learning. GPA: 3.9/4.0',
    achievements: [
      'Published 2 research papers on neural networks',
      'Teaching Assistant for Advanced Algorithms course',
      'Received Outstanding Graduate Student Award',
    ],
  },
  {
    type: 'education',
    degree: 'Bachelor of Science in Software Engineering',
    school: 'UC Berkeley',
    location: 'Berkeley, CA',
    period: '2011 - 2015',
    description: 'Dean\'s List all semesters. Minor in Mathematics.',
    achievements: [
      'President of Computer Science Club',
      'Won 1st place in Hackathon 2014',
      'GPA: 3.8/4.0',
    ],
  },
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    icon: Award,
  },
  {
    name: 'Google Cloud Professional',
    issuer: 'Google',
    date: '2022',
    icon: Code2,
  },
  {
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB',
    date: '2021',
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
            <Briefcase className="w-5 h-5 text-white" />
          ) : (
            <GraduationCap className="w-5 h-5 text-white" />
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
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {isWork ? item.title : item.degree}
            </h4>
            <div className="flex items-center gap-2 text-white/60 mt-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">{isWork ? item.company : item.school}</span>
              <span className="text-white/30">•</span>
              <span className="text-sm">{isWork ? item.location : item.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80">{item.period}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Achievements */}
        <ul className="space-y-2 mb-4">
          {item.achievements.map((achievement: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
              {achievement}
            </li>
          ))}
        </ul>

        {/* Tech Stack (for work items) */}
        {isWork && item.tech && (
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
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
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2 block">
            My Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Resume & <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
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
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
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
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
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
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
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
                  <cert.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">{cert.name}</h4>
                <p className="text-white/50 text-sm">{cert.issuer}</p>
                <p className="text-cyan-400 text-xs mt-2">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
