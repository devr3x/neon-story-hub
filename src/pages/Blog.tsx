import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { LoginModal } from '@/components/LoginModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockPosts } from '@/data/mockPosts';

const Blog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const savedLogin = localStorage.getItem('storyboard-login');
    if (savedLogin) {
      setIsLoggedIn(true);
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
  };

  const categories = [...new Set(mockPosts.map((post) => post.category))];

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-accent text-sm text-primary uppercase tracking-widest">
              Actualizaciones del Proyecto
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
              <span className="text-foreground">TODAS LAS </span>
              <span className="text-primary text-neon">ENTRADAS</span>
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Explora el diario completo de nuestro desarrollo. Cada entrada cuenta una parte de nuestra historia.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar entradas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'neon' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                <Filter className="w-4 h-4" />
                Todas
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'neon' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View mode toggle */}
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'grid' ? 'neon' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'neon' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            className="text-muted-foreground text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Mostrando {filteredPosts.length} de {mockPosts.length} entradas
          </motion.p>

          {/* Posts grid/list */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-6'
            }
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* No results */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg">
                No se encontraron entradas con esos criterios.
              </p>
            </motion.div>
          )}
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

export default Blog;
