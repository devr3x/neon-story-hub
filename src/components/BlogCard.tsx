import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      className="group relative glass-card rounded-2xl overflow-hidden gradient-border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-accent uppercase tracking-wider rounded-full shadow-neon-sm">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} min
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author & Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-accent text-muted-foreground">
              {post.author}
            </span>
          </div>

          <Link
            to={`/blog/${post.id}`}
            className="flex items-center gap-1 text-primary font-accent text-sm uppercase tracking-wider group/link"
          >
            Leer más
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      </div>
    </motion.article>
  );
};
