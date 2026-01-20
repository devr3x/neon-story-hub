import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-accent/10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-accent text-sm text-muted-foreground">
              Actualizaciones del proyecto
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-foreground">2º </span>
            <span className="text-primary text-neon">FPGBIO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            El diario de desarrollo de nuestro proyecto.
            <br />
            <span className="text-primary">Sigue cada paso de nuestra historia.</span>
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-32 h-1 mx-auto bg-gradient-to-r from-primary via-accent to-secondary rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link to="/blog">
              <Button variant="hero" size="xl">
                Explorar Entradas
              </Button>
            </Link>
            <Link to="/equipo">
              <Button variant="outline" size="lg">
                Conocer al Equipo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - positioned below content, not overlapping */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 w-32 h-32 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
      <div className="absolute top-20 right-4 w-32 h-32 border-r-2 border-t-2 border-secondary/30 rounded-tr-3xl" />
      <div className="absolute bottom-20 left-4 w-32 h-32 border-l-2 border-b-2 border-accent/30 rounded-bl-3xl" />
      <div className="absolute bottom-20 right-4 w-32 h-32 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />
    </section>
  );
};
