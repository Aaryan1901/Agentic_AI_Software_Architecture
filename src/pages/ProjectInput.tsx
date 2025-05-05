
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowRight, Lightbulb, Sparkles, Code, Database } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import Header from '@/components/Header';
import { toast } from "sonner";

const ProjectInput = () => {
  const navigate = useNavigate();
  const [projectIdea, setProjectIdea] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectIdea.trim()) {
      toast.error("Please enter your project idea");
      return;
    }
    
    // Store the project idea in session storage
    sessionStorage.setItem('projectIdea', projectIdea);
    
    setLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      navigate('/requirements');
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold tracking-tight shiny-text animate-background-shine mb-2">ArchitectAI</h1>
          <div className="w-40 h-1 bg-gradient-to-r from-architect-vibrant via-architect to-architect-magenta mx-auto mb-4 rounded-full"></div>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your project ideas into professional software architecture plans using advanced AI
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="gradient-border animate-pulse-glow mb-10">
            <Card className="border-none bg-card">
              <CardHeader className="bg-gradient-to-r from-architect-light/20 to-background">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-architect-vibrant animate-pulse-glow" />
                  Start With Your Project Idea
                </CardTitle>
                <CardDescription>
                  Describe your project idea in as much detail as possible. The more specific you are, the better the architecture recommendations will be.
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="animate-fade-in">
                      <label htmlFor="projectIdea" className="text-sm font-medium mb-1 block flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-architect-vibrant" />
                        What is your project idea?
                      </label>
                      <Textarea
                        id="projectIdea"
                        placeholder="Describe your software project idea (e.g., 'I want to build a real-time collaborative document editor with AI writing assistance')"
                        className="min-h-[200px] resize-y border-architect/30 focus:border-architect-vibrant transition-all duration-300"
                        value={projectIdea}
                        onChange={(e) => setProjectIdea(e.target.value)}
                      />
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-md flex gap-3 animate-scale-in">
                      <AlertCircle className="h-5 w-5 text-architect-vibrant flex-shrink-0 mt-0.5 animate-pulse" />
                      <div className="text-sm">
                        <p className="font-medium">Tips for better results:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Include the purpose and main features</li>
                          <li>Mention expected user volume and scale</li>
                          <li>Note any specific technical requirements</li>
                          <li>Specify performance or security needs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end border-t bg-muted/20 py-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-gradient-to-r from-architect to-architect-vibrant hover:from-architect-vibrant hover:to-architect-magenta transition-all duration-300 animate-fade-in shadow-lg hover:shadow-architect/50 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <>Processing<span className="loading-dots"></span></>
                    ) : (
                      <>Continue to Requirements <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Code className="text-white" />}
              title="AI-Powered Analysis"
              description="Our AI analyzes your requirements and leverages open-source LLMs to create tailored architecture plans"
              delay="0s"
            />
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" /><path d="M7 7 4.5 3h15L17 7" /></svg>}
              title="Dynamic Visualizations"
              description="Receive detailed architecture diagrams including flowcharts, use cases, component diagrams and more"
              delay="0.2s"
            />
            <FeatureCard 
              icon={<Database className="text-white" />}
              title="Complete Tech Stack"
              description="Get comprehensive architecture plans with tech stack recommendations, deployment options, and cost estimates"
              delay="0.4s"
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-20">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-architect-vibrant">
              <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
              <path d="M7 7 4.5 3h15L17 7" />
              <path d="m12 16-1 6h2l1-6" />
            </svg>
            <p className="text-sm text-muted-foreground">© 2025 ArchitectAI. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-architect-vibrant transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect-vibrant transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect-vibrant transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: string;
}) => (
  <div 
    className="hover-scale group flex flex-col items-center text-center p-6 rounded-lg border border-architect-vibrant/20 hover:border-architect-vibrant/60 transition-colors bg-gradient-to-b from-background to-muted/20 hover:shadow-md overflow-hidden"
    style={{
      animationDelay: delay,
      animation: `fade-in 0.5s ease-out forwards, scale-in 0.4s ease-out forwards`,
      opacity: 0
    }}
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-architect-vibrant to-architect-magenta flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      {icon}
    </div>
    <h3 className="font-semibold mb-2 text-lg">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
    <div className="w-full h-1 bg-gradient-to-r from-architect-vibrant/0 via-architect-vibrant to-architect-vibrant/0 mt-4 group-hover:via-architect-magenta transition-all duration-500"></div>
  </div>
);

export default ProjectInput;
