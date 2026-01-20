import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPostWithAuthor {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  video_url: string | null;
  category: string;
  tags: string[] | null;
  created_at: string;
  published: boolean;
  author: {
    display_name: string;
    avatar_url: string | null;
  } | null;
}

export const useBlogPosts = (onlyPublished = true) => {
  return useQuery({
    queryKey: ['blog-posts', onlyPublished],
    queryFn: async (): Promise<BlogPostWithAuthor[]> => {
      let query = supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          excerpt,
          content,
          image_url,
          video_url,
          category,
          tags,
          created_at,
          published,
          author_id
        `)
        .order('created_at', { ascending: false });

      if (onlyPublished) {
        query = query.eq('published', true);
      }

      const { data: posts, error } = await query;

      if (error) throw error;

      // Fetch author profiles
      const authorIds = [...new Set(posts?.map(p => p.author_id) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', authorIds);

      const profilesMap = new Map(profiles?.map(p => [p.user_id, p]));

      return (posts || []).map(post => ({
        ...post,
        author: profilesMap.get(post.author_id) || null,
      }));
    },
  });
};

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: async (): Promise<BlogPostWithAuthor | null> => {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          excerpt,
          content,
          image_url,
          video_url,
          category,
          tags,
          created_at,
          published,
          author_id
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      // Fetch author profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .eq('user_id', post.author_id)
        .single();

      return {
        ...post,
        author: profile || null,
      };
    },
    enabled: !!id,
  });
};
