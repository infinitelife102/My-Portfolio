import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Mail, MapPin, GraduationCap, Users, Briefcase, Clock, Award } from 'lucide-react';
import { env, getProfileInitials } from '@/lib/env';

const stats = [
  { icon: Users, value: 50, suffix: '+', label: 'Happy Clients' },
  { icon: Briefcase, value: 120, suffix: '+', label: 'Projects Completed' },
  { icon: Clock, value: 8000, suffix: '+', label: 'Hours of Work' },
  { icon: Award, value: 25, suffix: '+', label: 'Awards Won' },
];

const skills = [
  { name: 'JavaScript / TypeScript', level: 95 },
  { name: 'React / Next.js', level: 92 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'Python / Django', level: 85 },
  { name: 'AWS / Cloud Services', level: 82 },
  { name: 'UI/UX Design', level: 78 },
];

const interests = [
  'Open Source', 'Machine Learning', 'Blockchain', 'Mobile Dev',
  'DevOps', 'Cloud Architecture', 'System Design', 'Tech Writing',
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="counter-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-heading mb-4">
            Let Me <span className="gradient-text">Introduce</span> Myself
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
            A passionate developer who loves turning ideas into reality through code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="gradient-border p-1 rounded-2xl">
              <div className="glass rounded-2xl p-6 sm:p-8">
                {/* Profile Image Placeholder */}
                <div className="relative w-full aspect-square max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center glow-cyan">
                      <span className="text-5xl font-bold text-primary-foreground">{getProfileInitials()}</span>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 rounded-full bg-cyan-500/30 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-purple-500/30 blur-xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Calendar, label: 'Born', value: env.profileBirthday },
                    { icon: MapPin, label: 'Location', value: env.profileLocation },
                    { icon: Mail, label: 'Email', value: env.profileEmail },
                    { icon: GraduationCap, label: 'Degree', value: 'CS Bachelor' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="glass rounded-xl p-4 hover:bg-foreground/5 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-muted-foreground text-xs mb-1 font-medium">{item.label}</p>
                      <p className="text-foreground text-sm font-semibold">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">👋</span>
                </span>
                Who am I?
              </h3>
              <p className="text-foreground/90 leading-relaxed mb-4 font-medium">
                I'm a <span className="text-primary font-semibold">Full-Stack Developer</span> with over 
                <span className="text-primary font-semibold"> 7 years of experience</span> building 
                scalable web and mobile applications. I specialize in JavaScript, React, Node.js, and 
                modern cloud technologies.
              </p>
              <p className="text-foreground/90 leading-relaxed font-medium">
                My passion lies in creating elegant solutions to complex problems. I believe in writing 
                clean, maintainable code and staying up-to-date with the latest industry trends. When 
                I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="glass rounded-xl p-4 text-center hover:bg-foreground/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold gradient-text mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-muted-foreground text-xs font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-heading mb-8 text-center">
            My <span className="gradient-text">Skills</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-foreground font-semibold">{skill.name}</span>
                  <span className="text-primary text-sm font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full skill-bar-fill rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-heading mb-6 text-center">
            Areas of <span className="gradient-text">Interest</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, index) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full glass text-foreground/90 text-sm font-medium hover:bg-foreground/10 hover:text-foreground transition-colors cursor-default"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
