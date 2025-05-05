
import { useState } from 'react';
import Header from '@/components/Header';
import RequirementsForm, { ProjectRequirements } from '@/components/RequirementsForm';
import ArchitectureDisplay, { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';
import { generateArchitectureRecommendation } from '@/services/architectureService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Index = () => {
  const [requirements, setRequirements] = useState<ProjectRequirements | null>(null);
  const [recommendation, setRecommendation] = useState<ArchitectureRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("requirements");
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // Animation to hide splash screen after it completes
  setTimeout(() => {
    setShowSplashScreen(false);
  }, 3000);

  const handleSubmitRequirements = async (data: ProjectRequirements) => {
    setRequirements(data);
    setLoading(true);
    setActiveTab("results");
    
    try {
      const recommendation = await generateArchitectureRecommendation(data);
      setRecommendation(recommendation);
    } catch (error) {
      console.error("Failed to generate architecture recommendation", error);
      // In a production app, you'd add error handling UI here
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = () => {
    setActiveTab("requirements");
  };

  // Splash screen animation
  if (showSplashScreen) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-background to-architect/5">
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1.2, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.6, 1],
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="relative"
            animate={{ 
              rotate: [0, -10, 10, -5, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 2,
              times: [0, 0.2, 0.5, 0.8, 1],
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full filter blur-xl"></div>
            <img 
              src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
              alt="DesignPanda Logo" 
              className="w-32 h-32 object-contain relative z-10" 
            />
          </motion.div>
          
          <motion.h1
            className="mt-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-architect-dark to-architect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            DesignPanda
          </motion.h1>
          
          <motion.p
            className="mt-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Software Architecture Design
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-architect">DesignPanda</h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Transform your project ideas into professional software architecture
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requirements">Project Requirements</TabsTrigger>
            <TabsTrigger value="results" disabled={!requirements}>Architecture Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requirements" className="mt-6">
            <RequirementsForm onSubmit={handleSubmitRequirements} />
          </TabsContent>
          
          <TabsContent value="results" className="mt-6">
            <ArchitectureDisplay 
              requirements={requirements!} 
              recommendation={recommendation}
              loading={loading}
              onRefine={handleRefine}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-architect flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 10h12" />
                  <path d="M4 14h9" />
                  <path d="M4 18h6" />
                  <rect width="8" height="4" x="12" y="6" rx="1" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Define Your Requirements</h3>
              <p className="text-muted-foreground">Tell us about your project goals, scale, and essential features.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-architect flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M2 9.5V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.5" />
                  <path d="M8 11V9" />
                  <path d="M16 11V9" />
                  <path d="M22 13H2" />
                  <path d="M22 2 2 22" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Our AI analyzes your needs to determine optimal architecture patterns.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-architect flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
                  <path d="M7 7 4.5 3h15L17 7" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Complete Blueprint</h3>
              <p className="text-muted-foreground">Receive detailed recommendations including frameworks, libraries, and deployment options.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
              alt="DesignPanda Logo" 
              className="h-5 w-5 object-contain" 
            />
            <p className="text-sm text-muted-foreground">© 2025 DesignPanda. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
