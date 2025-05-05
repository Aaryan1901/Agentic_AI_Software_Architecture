
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { LLMModel } from '@/services/searchService';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [selectedModel, setSelectedModel] = useState<LLMModel>('default');
  
  // Check localStorage on component mount
  useEffect(() => {
    const savedModel = localStorage.getItem('selectedLLM') as LLMModel | null;
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  const handleModelChange = (value: LLMModel) => {
    setSelectedModel(value);
    // Store in localStorage to persist across page reloads
    localStorage.setItem('selectedLLM', value);
    console.log('LLM model changed to:', value);
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-architect">
              <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
              <path d="M7 7 4.5 3h15L17 7" />
              <path d="m12 16-1 6h2l1-6" />
            </svg>
            <h1 className="text-lg font-bold">ArchitectAI</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-muted-foreground">LLM:</span>
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Select LLM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                <SelectItem value="llama-3">Llama 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
        <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-architect" />
      )}
    </Link>
  );
};

export default Header;
