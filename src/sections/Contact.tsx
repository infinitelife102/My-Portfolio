import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { env } from '@/lib/env';

function useContactChannels() {
  const channels: { icon: typeof Mail; label: string; value: string; href: string }[] = [
    {
      icon: Mail,
      label: 'Email',
      value: env.profileEmail,
      href: `mailto:${env.profileEmail}`,
    },
  ];
  if (env.discord?.trim()) {
    const discordUrl = env.discord.startsWith('http') ? env.discord : `https://discord.com/users/${env.discord}`;
    channels.push({
      icon: MessageCircle,
      label: 'Discord',
      value: env.discord,
      href: discordUrl,
    });
  }
  if (env.whatsapp?.trim()) {
    const num = env.whatsapp.replace(/\D/g, '');
    channels.push({
      icon: MessageCircle,
      label: 'WhatsApp',
      value: env.whatsapp,
      href: `https://wa.me/${num}`,
    });
  }
  return channels;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const contactChannels = useContactChannels();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!env.formspreeId?.trim()) {
      setSubmitError('Contact form is not configured. Set VITE_FORMSPREE_ID in .env');
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await fetch(`https://formspree.io/f/${env.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed: ${res.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-heading mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              {contactChannels.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:bg-foreground/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{item.label}</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-green-400 font-medium">Available for Work</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                I'm currently open to new opportunities and interesting projects.
                Let's create something amazing together!
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="gradient-border p-0.5 rounded-2xl h-full">
              <div className="glass rounded-2xl p-6 sm:p-8 h-full">
                <h3 className="text-xl font-bold text-heading mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Send Me a Message
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground font-medium">Thank you for reaching out. I'll get back to you soon!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitError && (
                      <p className="text-destructive text-sm font-medium bg-destructive/10 rounded-lg p-3">
                        {submitError}
                      </p>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-foreground/90 text-sm mb-2 font-medium">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all font-medium"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground/90 text-sm mb-2 font-medium">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all font-medium"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-foreground/90 text-sm mb-2 font-medium">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all font-medium"
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-foreground/90 text-sm mb-2 font-medium">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all resize-none font-medium"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl btn-gradient text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
