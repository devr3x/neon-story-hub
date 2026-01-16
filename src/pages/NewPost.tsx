import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Send, Loader2, Eye, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/Navbar';
import { LoginModal } from '@/components/LoginModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const NewPost = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const savedLogin = localStorage.getItem('storyboard-login');
    if (savedLogin) {
      setIsLoggedIn(true);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    if (email && password.length >= 4) {
      localStorage.setItem('storyboard-login', 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('storyboard-login');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !excerpt || !content || !category) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('¡Entrada publicada exitosamente!');
    setIsSubmitting(false);
    navigate('/blog');
  };

  const categories = ['Anuncios', 'Diseño', 'Desarrollo', 'Retrospectiva', 'Roadmap'];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => navigate('/')}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-accent text-sm uppercase tracking-wider">Volver</span>
              </button>

              <div className="flex gap-2">
                <Button
                  variant={previewMode ? 'outline' : 'neon'}
                  size="sm"
                  onClick={() => setPreviewMode(false)}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
                <Button
                  variant={previewMode ? 'neon' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode(true)}
                >
                  <Eye className="w-4 h-4" />
                  Vista Previa
                </Button>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold">
                <span className="text-foreground">NUEVA </span>
                <span className="text-primary text-neon">ENTRADA</span>
              </h1>
              <p className="font-body text-muted-foreground mt-2">
                Comparte una actualización con el equipo
              </p>
            </motion.div>

            {previewMode ? (
              /* Preview Mode */
              <motion.div
                className="glass-card rounded-2xl p-8 gradient-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-xl mb-8"
                  />
                )}
                {category && (
                  <span className="inline-block px-4 py-1 bg-primary/90 text-primary-foreground text-sm font-accent uppercase tracking-wider rounded-full mb-4">
                    {category}
                  </span>
                )}
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  {title || 'Título de la entrada'}
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {excerpt || 'Extracto de la entrada...'}
                </p>
                <div className="prose prose-invert prose-lg max-w-none">
                  <ReactMarkdown>{content || '*El contenido aparecerá aquí...*'}</ReactMarkdown>
                </div>
              </motion.div>
            ) : (
              /* Edit Mode */
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Title */}
                <div className="glass-card rounded-2xl p-6 gradient-border">
                  <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                    Título *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Un título impactante para tu entrada"
                    className="text-xl font-display"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="glass-card rounded-2xl p-6 gradient-border">
                  <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                    Extracto *
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Un breve resumen de la entrada (aparecerá en las tarjetas)"
                    className="w-full h-24 bg-transparent border-2 border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-neon-sm transition-all resize-none font-body"
                    required
                  />
                </div>

                {/* Category & Cover Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-2xl p-6 gradient-border">
                    <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                      Categoría *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-12 bg-muted/50 border-2 border-border rounded-lg px-4 text-foreground focus:border-primary focus:shadow-neon-sm transition-all font-body"
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="glass-card rounded-2xl p-6 gradient-border">
                    <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                      Imagen de Portada (URL)
                    </label>
                    <div className="relative">
                      <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://..."
                        className="pl-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-6 gradient-border">
                  <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                    Contenido (Markdown) *
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe el contenido de tu entrada usando Markdown..."
                    className="w-full h-96 bg-transparent border-2 border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-neon-sm transition-all resize-none font-mono text-sm"
                    required
                  />
                  <p className="text-muted-foreground text-xs mt-2">
                    Soporta Markdown: **negrita**, *cursiva*, # títulos, - listas, etc.
                  </p>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/blog')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="neon-solid"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Publicar Entrada
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default NewPost;
