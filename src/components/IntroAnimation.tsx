import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Animated circles */}
          <motion.div
            className="absolute w-96 h-96 rounded-full border-2 border-primary/30"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.5, 1], rotate: 360 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full border border-secondary/40"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.2, 0.9], rotate: -360 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-accent/50"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0.8], rotate: 180 }}
            transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
          />

          {/* 3D Rotating cube */}
          <motion.div
            className="perspective-2000 preserve-3d"
            initial={{ opacity: 0, rotateX: 90, rotateY: 90 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="relative w-32 h-32 preserve-3d animate-rotate-slow">
              {/* Cube faces */}
              <div
                className="absolute inset-0 border-2 border-primary bg-primary/10 backdrop-blur-sm"
                style={{ transform: 'translateZ(64px)' }}
              />
              <div
                className="absolute inset-0 border-2 border-secondary bg-secondary/10 backdrop-blur-sm"
                style={{ transform: 'rotateY(180deg) translateZ(64px)' }}
              />
              <div
                className="absolute inset-0 border-2 border-accent bg-accent/10 backdrop-blur-sm"
                style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}
              />
              <div
                className="absolute inset-0 border-2 border-primary bg-primary/10 backdrop-blur-sm"
                style={{ transform: 'rotateY(90deg) translateZ(64px)' }}
              />
              <div
                className="absolute inset-0 border-2 border-secondary bg-secondary/10 backdrop-blur-sm"
                style={{ transform: 'rotateX(90deg) translateZ(64px)' }}
              />
              <div
                className="absolute inset-0 border-2 border-accent bg-accent/10 backdrop-blur-sm"
                style={{ transform: 'rotateX(-90deg) translateZ(64px)' }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="absolute flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold text-primary text-neon"
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{ letterSpacing: '0.1em', opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              2ndo FPBGIO
            </motion.h1>
            <motion.div
              className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 1.5 }}
            />
            <motion.p
              className="font-accent text-muted-foreground tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              CARGANDO...
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-secondary"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
