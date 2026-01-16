export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorAvatar?: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
}
