import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { BlogPostWithAuthor } from '@/hooks/useBlogPosts';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

interface FeaturedPostsProps {
  posts: BlogPostWithAuthor[];
  isLoading?: boolean;
}

export const FeaturedPosts = ({ posts, isLoading }: FeaturedPostsProps) => {
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-sm text-primary uppercase tracking-widest">
            Últimas Actualizaciones
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            <span className="text-foreground">ENTRADAS </span>
            <span className="text-secondary text-neon-subtle">DESTACADAS</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Las publicaciones más recientes de nuestro equipo sobre el desarrollo del proyecto.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {!isLoading && featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
          </div>
        )}

        {/* No posts message */}
        {!isLoading && featuredPosts.length === 0 && (
          <motion.div
            className="text-center py-12 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-lg">
              No hay entradas publicadas todavía. ¡Vuelve pronto!
            </p>
          </motion.div>
        )}

        {/* View all button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/blog">
            <Button variant="neon" size="lg">
              Ver Todas las Entradas
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
