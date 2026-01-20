import { motion } from 'framer-motion';
import { Github, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useState, useEffect } from 'react';
import { LoginModal } from '@/components/LoginModal';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar_url: string | null;
  bio: string | null;
  github_url: string | null;
}

const Team = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setTeamMembers(data);
      }
      setLoading(false);
    };
    fetchTeamMembers();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-4 h-4 text-primary" />
                <span className="font-accent text-sm text-muted-foreground">
                  Nuestro Equipo
                </span>
              </motion.div>
              
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-foreground">CONOCE AL </span>
                <span className="text-primary text-neon">EQUIPO</span>
              </h1>
              
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                Las mentes creativas detrás de 2ndo de FPGBIO. Un equipo apasionado por la innovación y el desarrollo.
              </p>
            </div>
          </ScrollReveal>

          {/* Team Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card p-6 rounded-xl animate-pulse">
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4" />
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.1}>
                  <motion.div
                    className="glass-card p-6 rounded-xl text-center group relative overflow-hidden"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary))) border-box',
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />
                    
                    {/* Avatar */}
                    <motion.div
                      className="relative w-32 h-32 mx-auto mb-4"
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-50 blur-md group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-1">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                          {member.avatar_url ? (
                            <img
                              src={member.avatar_url}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-display text-4xl font-bold text-primary">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Info */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-accent text-sm text-primary mb-3">
                      {member.role}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mb-4">
                      {member.bio}
                    </p>

                    {/* GitHub Link */}
                    {member.github_url && (
                      <motion.a
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-neon-sm transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Join CTA */}
          <ScrollReveal delay={0.4}>
            <motion.div
              className="mt-16 text-center glass-card p-8 rounded-2xl max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                ¿Quieres unirte al equipo?
              </h2>
              <p className="font-body text-muted-foreground mb-6">
                Siempre estamos buscando mentes creativas y apasionadas.
              </p>
              <Button variant="neon" size="lg">
                Contáctanos
              </Button>
            </motion.div>
          </ScrollReveal>
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

export default Team;
