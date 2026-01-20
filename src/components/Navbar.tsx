import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, PenTool, Home, LogIn } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const Navbar = ({ isLoggedIn, onLogout, onLoginClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/blog', label: 'Blog', icon: PenTool },
    { path: '/equipo', label: 'Equipo', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-neon-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-display font-bold text-primary-foreground text-lg">2º</span>
            </motion.div>
            <span className="font-display font-bold text-xl text-primary text-neon-subtle hidden sm:block">
               FPBGIO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <motion.span
                  className={`font-accent text-sm uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                    isActive(item.path) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-neon-sm"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/nuevo-post">
                  <Button variant="neon" size="sm">
                    <PenTool className="w-4 h-4" />
                    Nueva Entrada
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button variant="neon" size="sm" onClick={onLoginClick}>
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-accent text-sm uppercase tracking-wider flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border/50">
                  {isLoggedIn ? (
                    <>
                      <Link to="/nuevo-post" onClick={() => setIsOpen(false)}>
                        <Button variant="neon" size="sm" className="w-full mb-2">
                          <PenTool className="w-4 h-4" />
                          Nueva Entrada
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="w-full" onClick={onLogout}>
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <Button variant="neon" size="sm" className="w-full" onClick={onLoginClick}>
                      <LogIn className="w-4 h-4" />
                      Iniciar Sesión
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
