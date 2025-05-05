
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import ApiKeysSetup from '@/components/ApiKeysSetup';

export default function Index() {
  const [showApiKeySetup, setShowApiKeySetup] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Splash screen animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        duration: 0.5,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, rotate: -5, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />

      {!animationComplete ? (
        <motion.div 
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <motion.div
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="mb-6" 
              variants={logoVariants}
            >
              <img 
                src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
                alt="DesignPanda Logo" 
                className="h-32 w-32 object-contain" 
              />
            </motion.div>
            <motion.h1 
              className="text-5xl font-bold text-architect mb-2"
              variants={itemVariants}
            >
              DesignPanda
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Intelligent Software Architecture Design
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}

      <main className="container mx-auto px-4 py-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationComplete ? 0 : 3, duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
              alt="DesignPanda Logo" 
              className="h-24 w-24 object-contain" 
            />
          </div>
          
          <h1 className="text-5xl font-bold mb-6 text-architect">
            Architect Your Software With AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            DesignPanda uses advanced AI to generate optimal software architecture 
            recommendations based on your project requirements.
          </p>

          {showApiKeySetup ? (
            <div className="mb-8">
              <ApiKeysSetup onComplete={() => setShowApiKeySetup(false)} />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowApiKeySetup(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link to="/requirements">
                <Button size="lg" className="gradient-btn">
                  Start New Project
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowApiKeySetup(true)}
              >
                Configure API Keys
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-lg border">
              <div className="h-12 w-12 bg-architect/10 text-architect rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path><path d="M12 13v8"></path><path d="M12 3v3"></path></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">Get intelligent architecture suggestions based on your specific project needs and constraints.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border">
              <div className="h-12 w-12 bg-architect/10 text-architect rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Visual Diagrams</h3>
              <p className="text-muted-foreground">Visualize your architecture with clear, interactive diagrams that explain component relationships.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border">
              <div className="h-12 w-12 bg-architect/10 text-architect rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Tech Stack Selection</h3>
              <p className="text-muted-foreground">Find the optimal combination of frameworks, libraries, and tools for your specific project.</p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
              alt="DesignPanda Logo" 
              className="h-8 w-8 object-contain" 
            />
            <p className="text-sm text-muted-foreground">© 2025 DesignPanda. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
