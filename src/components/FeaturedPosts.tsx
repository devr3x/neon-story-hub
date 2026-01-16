import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/types/blog';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
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

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

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
