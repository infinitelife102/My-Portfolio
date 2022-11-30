import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ opacity: 0.3 }}
            />
            <div className="absolute inset-2 rounded-xl bg-background flex items-center justify-center">
              <span className="text-4xl font-bold gradient-text">P</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-muted-foreground text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading experience...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Developer-style subtle background (grid + soft gradient)
function DevBackground() {
  return (
    <div className="dev-bg">
      <div className="grid-bg-full" />
      <div className="gradient-veil" />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen bg-background text-foreground overflow-x-hidden"
        >
          {/* Background */}
          <DevBackground />
          <div className="noise-overlay" />

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Resume />
            <Portfolio />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
