import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import RequirementsForm, { ProjectRequirements } from '@/components/RequirementsForm';
import { toast } from "sonner";

const RequirementsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get project idea from session storage
  const projectIdea = sessionStorage.getItem('projectIdea') || '';

  const handleSubmit = (requirements: ProjectRequirements) => {
    if (!requirements.hospitalName.trim()) {
      toast.error("Please enter a hospital name");
      return;
    }
    
    // Store requirements in session storage
    sessionStorage.setItem('projectRequirements', JSON.stringify(requirements));
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/results');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight shiny-text animate-background-shine">Hospital Management System Requirements</h1>
          <div className="w-40 h-1 bg-gradient-to-r from-architect-vibrant via-architect to-architect-magenta mx-auto mb-4 rounded-full"></div>
          <p className="mt-2 text-lg text-muted-foreground">
            Let's gather detailed information about your healthcare facility's technology needs
          </p>
        </div>

        <RequirementsForm 
          onSubmit={handleSubmit}
          initialDescription={projectIdea}
        />
      </main>
      
      <footer className="border-t py-6 mt-10">
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

// Feature options
const FEATURES = [
  { id: "auth", label: "Authentication & Authorization", description: "User login, registration, and role-based access control" },
  { id: "api", label: "API Integration", description: "Connect with external services and APIs" },
  { id: "ml", label: "Machine Learning / AI", description: "Intelligent features like predictions, recommendations, etc." },
  { id: "realtime", label: "Real-time Features", description: "Live updates, notifications, or collaboration" },
  { id: "offline", label: "Offline Support", description: "Allow app to function without internet connection" },
  { id: "analytics", label: "Analytics & Monitoring", description: "Track usage, performance metrics, and user behavior" },
  { id: "payment", label: "Payment Processing", description: "Handle transactions and subscriptions" },
  { id: "search", label: "Search Functionality", description: "Enable users to search through content" },
  { id: "mobile", label: "Mobile Optimization", description: "Ensure functionality works well on mobile devices" },
  { id: "internationalization", label: "Internationalization", description: "Multi-language and locale support" },
];

export default RequirementsPage;
