// Legacy types - now using database types from useBlogPosts hook
// Keeping User type for any remaining uses

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
}
