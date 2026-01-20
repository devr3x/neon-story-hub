import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LoginModal } from '@/components/LoginModal';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useBlogPost, useBlogPosts } from '@/hooks/useBlogPosts';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const { data: post, isLoading } = useBlogPost(id || '');
  const { data: allPosts = [] } = useBlogPosts();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    window.scrollTo(0, 0);

    return () => subscription.unsubscribe();
  }, [id]);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onLoginClick={() => setShowLoginModal(true)}
        />
        <main className="pt-20">
          <Skeleton className="h-[50vh] w-full" />
          <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Entrada no encontrada</h1>
          <Link to="/blog">
            <Button variant="neon">Volver al blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // Estimate read time based on content length
  const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />

      <main className="pt-20">
        {/* Hero */}
        <motion.div
          className="relative h-[50vh] md:h-[60vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Back button */}
          <motion.button
            className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-accent text-sm uppercase tracking-wider">Volver</span>
          </motion.button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <motion.span
                className="inline-block px-4 py-1 bg-primary/90 text-primary-foreground text-sm font-accent uppercase tracking-wider rounded-full mb-4 shadow-neon-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {post.category}
              </motion.span>
              <motion.h1
                className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Meta info */}
            <motion.div
              className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                {post.author?.avatar_url ? (
                  <img 
                    src={post.author.avatar_url} 
                    alt={post.author.display_name}
                    className="w-12 h-12 rounded-full object-cover shadow-neon-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-neon-sm">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-accent text-foreground">{post.author?.display_name || 'Anónimo'}</p>
                  <p className="text-muted-foreground text-sm">Miembro del equipo</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(post.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readTime} min de lectura</span>
              </div>
            </motion.div>

            {/* Video if exists */}
            {post.video_url && (
              <ScrollReveal>
                <div className="mb-8 rounded-xl overflow-hidden">
                  <video 
                    src={post.video_url} 
                    controls 
                    className="w-full"
                    poster={post.image_url || undefined}
                  />
                </div>
              </ScrollReveal>
            )}

            {/* Article content */}
            <ScrollReveal>
              <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
            </ScrollReveal>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-border">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Actions */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant={liked ? 'neon-solid' : 'outline'}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Te gusta' : 'Me gusta'}
                </Button>

                <Button variant="ghost">
                  <Share2 className="w-5 h-5" />
                  Compartir
                </Button>
              </div>
            </ScrollReveal>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <ScrollReveal delay={0.4}>
                <div className="mt-16 pt-12 border-t border-border">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                    Entradas Relacionadas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.id}`}
                        className="group glass-card rounded-xl overflow-hidden hover:shadow-neon-sm transition-all"
                      >
                        <div className="h-32 overflow-hidden">
                          {relatedPost.image_url ? (
                            <img
                              src={relatedPost.image_url}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default BlogPost;
