import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onLogin(email, password);
      if (success) {
        onClose();
        setEmail('');
        setPassword('');
      } else {
        setError('Credenciales inválidas. Inténtalo de nuevo.');
      }
    } catch {
      setError('Error al iniciar sesión. Inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md glass-card rounded-2xl p-8 gradient-border"
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-neon-md"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Lock className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-primary text-neon-subtle">
                ACCESO MIEMBROS
              </h2>
              <p className="font-body text-muted-foreground mt-2">
                Inicia sesión para publicar actualizaciones
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="font-accent text-sm text-muted-foreground uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-accent text-sm text-muted-foreground uppercase tracking-wider">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  className="text-destructive text-sm text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                variant="neon-solid"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-muted-foreground text-sm mt-6">
              Solo los miembros del equipo pueden acceder
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
