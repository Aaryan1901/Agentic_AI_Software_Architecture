
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <img 
                src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
                alt="DesignPanda Logo" 
                className="h-9 w-9 object-contain rounded-full bg-white shadow-sm" 
              />
            </motion.div>
            <motion.h1 
              className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-architect-dark to-architect"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              DesignPanda
            </motion.h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="items-center gap-4 hidden md:flex">
            <PageLink to="/" label="Project Input" currentPath={location.pathname} />
            <PageLink to="/requirements" label="Requirements" currentPath={location.pathname} />
            <PageLink to="/results" label="Results" currentPath={location.pathname} />
            <Button variant="outline" size="sm">Login</Button>
          </nav>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Helper component for navigation links
const PageLink = ({ to, label, currentPath }: { to: string; label: string; currentPath: string }) => {
  const isActive = currentPath === to || 
    (to === "/" && currentPath === "/") || 
    (to !== "/" && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`text-sm font-medium transition-colors relative ${
        isActive 
          ? 'text-architect' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
      {isActive && (
        <motion.span 
          className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-architect" 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default Header;
