
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BackendSetup from '@/components/BackendSetup';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BackendSetupPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center">AI Agent Backend Configuration</h1>
          <p className="text-center text-muted-foreground mb-6">
            Connect DesignPanda to your Python AI Agent backend to enable advanced architecture generation
          </p>
          
          <BackendSetup />
          
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">About the AI Agent Backend</h3>
            <p className="text-sm text-muted-foreground">
              The Python AI Agent backend uses advanced LLM models and langgraph to generate highly optimized 
              software architecture recommendations based on your requirements. The backend processes 
              your project information and generates detailed architecture plans using a multi-agent 
              approach with Requirements Engineer, Architect, Critic, Optimizer, and Arbiter agents.
            </p>
          </div>
        </div>
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
};

export default BackendSetupPage;
