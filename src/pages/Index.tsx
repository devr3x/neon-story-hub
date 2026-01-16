import { useState, useEffect } from 'react';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedPosts } from '@/components/FeaturedPosts';
import { Footer } from '@/components/Footer';
import { LoginModal } from '@/components/LoginModal';
import { mockPosts } from '@/data/mockPosts';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check for saved login state
    const savedLogin = localStorage.getItem('storyboard-login');
    if (savedLogin) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    // Demo login - in production this would connect to a real auth system
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

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      <main>
        <HeroSection />
        <FeaturedPosts posts={mockPosts} />
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

export default Index;
