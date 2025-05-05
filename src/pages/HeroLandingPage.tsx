
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Cpu, Database, LayoutTemplate, Server } from 'lucide-react';
import Header from '@/components/Header';

const HeroLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mount
    setIsLoaded(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };
  
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: {
        duration: 1.5
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-architect/5 overflow-hidden">
      <Header />
      
      {/* Background animated elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={backgroundVariants}
      >
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-architect/30 rounded-full filter blur-[8rem]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[20rem] h-[20rem] bg-architect-vibrant/20 rounded-full filter blur-[6rem]"></div>
        <div className="absolute top-[40%] right-[15%] w-[25rem] h-[25rem] bg-architect-magenta/20 rounded-full filter blur-[7rem]"></div>
      </motion.div>
      
      {/* Main content */}
      <main className="flex-1 container py-10 lg:py-20 flex flex-col items-center justify-center relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="inline-block mb-2"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-architect/10 text-architect">
              Architect AI - Design Better Software
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 gradient-text"
            variants={itemVariants}
          >
            Transform Your Ideas Into
            <br />
            <span className="shiny-text text-5xl md:text-7xl">Robust Architecture</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Let AI design the perfect software architecture for your next project.
            Analyze requirements, select frameworks, and visualize your solution with ease.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="text-lg bg-architect hover:bg-architect-dark shine"
              onClick={() => navigate('/input')}
            >
              Start Designing <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-architect text-architect hover:bg-architect/10"
            >
              View Examples
            </Button>
          </motion.div>
          
          {/* Animated icons */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            {[
              { icon: <LayoutTemplate className="h-8 w-8" />, label: "Front-end" },
              { icon: <Server className="h-8 w-8" />, label: "Back-end" },
              { icon: <Database className="h-8 w-8" />, label: "Database" },
              { icon: <Cpu className="h-8 w-8" />, label: "Infrastructure" },
              { icon: <Code className="h-8 w-8" />, label: "API Design" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <div className="w-16 h-16 rounded-full bg-architect/10 flex items-center justify-center text-architect mb-2">
                  {item.icon}
                </div>
                <p className="font-medium">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Animated card */}
        <motion.div
          className="mt-20 relative w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-architect to-architect-vibrant opacity-30 blur-lg rounded-xl transform -rotate-1"></div>
          <div className="relative glass-card rounded-xl p-8 border border-white/20 bg-white/5 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Describe Your Project",
                  description: "Tell us about your project goals, requirements, constraints and features."
                },
                {
                  step: "2",
                  title: "Refine Requirements",
                  description: "Add detailed technical requirements and specify your project's needs."
                },
                {
                  step: "3",
                  title: "Get Architecture Plan",
                  description: "Receive a comprehensive architecture design with diagrams and tech stack recommendations."
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + (i * 0.2) }}
                >
                  <div className="w-10 h-10 rounded-full bg-architect/20 flex items-center justify-center text-architect font-bold mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to transform your project?</h2>
          <Button
            size="lg"
            className="text-lg bg-architect hover:bg-architect-dark"
            onClick={() => navigate('/input')}
          >
            Start Designing <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-architect">
              <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
              <path d="M7 7 4.5 3h15L17 7" />
              <path d="m12 16-1 6h2l1-6" />
            </svg>
            <p className="text-sm text-muted-foreground">© 2025 ArchitectAI. All rights reserved.</p>
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
};

export default HeroLandingPage;
