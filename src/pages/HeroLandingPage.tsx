
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Server, Code2, Rocket, Cpu } from 'lucide-react';

const HeroLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-architect">
              Intelligent Software Architecture Design
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              DesignPanda leverages AI to create optimized software architecture 
              tailored to your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="text-lg px-8 py-6 bg-architect hover:bg-architect/90"
                onClick={() => navigate('/input')}
              >
                Start New Project
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/backend-setup')}
              >
                Configure Backend
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Settings className="h-8 w-8 mb-4 text-architect" />,
                  title: "Input Requirements",
                  description: "Specify your project details, constraints, and functional requirements."
                },
                {
                  icon: <Cpu className="h-8 w-8 mb-4 text-architect" />,
                  title: "AI Analysis",
                  description: "Our AI analyzes requirements and determines optimal architecture patterns."
                },
                {
                  icon: <Code2 className="h-8 w-8 mb-4 text-architect" />,
                  title: "Architecture Design",
                  description: "Receive detailed architecture diagrams, tech stack recommendations, and deployment options."
                }
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-architect text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Design Your Architecture?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Start building better software systems with architecture designed for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/input')}
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-architect"
                onClick={() => navigate('/backend-setup')}
              >
                <Server className="mr-2 h-5 w-5" />
                Configure Backend
              </Button>
            </div>
          </div>
        </section>
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

export default HeroLandingPage;
