
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ApiKeysSetup from '@/components/ApiKeysSetup';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header showNav={false} />
      
      {showApiKeyModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => setShowApiKeyModal(false)}
              >
                ✕
              </Button>
              <ApiKeysSetup onComplete={() => setShowApiKeyModal(false)} />
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <motion.div 
          className="max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <img 
              src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
              alt="DesignPanda Logo" 
              className="w-32 h-32 object-contain"
            />
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-architect-light via-architect to-architect-vibrant mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            DesignPanda
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Intelligent software architecture recommendations for your next project
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button 
              onClick={() => navigate('/requirements')}
              size="lg" 
              className="gradient-btn"
            >
              Start Your Project
            </Button>
            <Button 
              onClick={() => setShowApiKeyModal(true)} 
              variant="outline" 
              size="lg"
            >
              Configure API Keys
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-architect/10 text-architect flex items-center justify-center rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Define Requirements</h3>
              <p className="text-center text-muted-foreground">Describe your project needs and constraints</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-architect/10 text-architect flex items-center justify-center rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9.5V4a2 2 0 0 1 2-2h4.586a1 1 0 0 1 .707.293l.707.707"/><path d="M2 14.5V20a2 2 0 0 0 2 2h4.586a1 1 0 0 0 .707-.293l.707-.707"/><path d="M22 9.5V4a2 2 0 0 0-2-2h-4.586a1 1 0 0 0-.707.293l-.707.707"/><path d="M22 14.5V20a2 2 0 0 1-2 2h-4.586a1 1 0 0 1-.707-.293l-.707-.707"/><rect width="6" height="6" x="9" y="9" rx="1"/></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Get Recommendations</h3>
              <p className="text-center text-muted-foreground">Receive tailored architecture suggestions</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-architect/10 text-architect flex items-center justify-center rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Build Confidently</h3>
              <p className="text-center text-muted-foreground">Implement with clear technical guidance</p>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
