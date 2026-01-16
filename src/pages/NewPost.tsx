import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Video, Send, Loader2, Eye, Edit, Upload, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/Navbar';
import { LoginModal } from '@/components/LoginModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const NewPost = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      } else {
        setShowLoginModal(true);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
      if (!session) {
        setShowLoginModal(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const uploadFile = async (file: File, type: 'image' | 'video') => {
    setIsUploading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Debes iniciar sesión para subir archivos');
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) {
        toast.error(`Error al subir ${type === 'image' ? 'imagen' : 'video'}`);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      toast.success(`${type === 'image' ? 'Imagen' : 'Video'} subido correctamente`);
      return publicUrl;
    } catch (error) {
      toast.error('Error al subir archivo');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen');
      return;
    }

    const url = await uploadFile(file, 'image');
    if (url) {
      setCoverImage(url);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Por favor selecciona un archivo de video');
      return;
    }

    const url = await uploadFile(file, 'video');
    if (url) {
      setVideoUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !excerpt || !content || !category) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Debes iniciar sesión');
        return;
      }

      const { error } = await supabase
        .from('blog_posts')
        .insert({
          author_id: session.user.id,
          title,
          excerpt,
          content,
          image_url: coverImage || null,
          video_url: videoUrl || null,
          category,
          published: true,
        });

      if (error) {
        toast.error('Error al publicar la entrada');
        return;
      }

      toast.success('¡Entrada publicada exitosamente!');
      navigate('/blog');
    } catch (error) {
      toast.error('Error al publicar');
    } finally {
      setIsSubmitting(false);
    }
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
                {videoUrl && (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full rounded-xl mb-8"
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

                {/* Category */}
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

                {/* Media uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image upload */}
                  <div className="glass-card rounded-2xl p-6 gradient-border">
                    <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                      Imagen de Portada
                    </label>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {coverImage ? (
                      <div className="relative">
                        <img
                          src={coverImage}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setCoverImage('')}
                          className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground hover:scale-110 transition-transform"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-32 flex flex-col gap-2"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            <Image className="w-6 h-6" />
                            <span>Subir imagen</span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Video upload */}
                  <div className="glass-card rounded-2xl p-6 gradient-border">
                    <label className="font-accent text-sm text-primary uppercase tracking-wider block mb-2">
                      Video
                    </label>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    {videoUrl ? (
                      <div className="relative">
                        <video
                          src={videoUrl}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setVideoUrl('')}
                          className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground hover:scale-110 transition-transform"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-32 flex flex-col gap-2"
                        onClick={() => videoInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <>
                            <Video className="w-6 h-6" />
                            <span>Subir video</span>
                          </>
                        )}
                      </Button>
                    )}
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
