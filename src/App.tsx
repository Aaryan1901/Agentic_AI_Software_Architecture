
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectInput from "./pages/ProjectInput";
import RequirementsPage from "./pages/RequirementsPage";
import ResultsPage from "./pages/ResultsPage";
import HeroLandingPage from "./pages/HeroLandingPage";

const queryClient = new QueryClient();

// Page title updater component
const PageTitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    let title = "DesignPanda";
    
    switch (location.pathname) {
      case '/':
        title = "DesignPanda - Architecture AI";
        break;
      case '/input':
        title = "Project Input - DesignPanda";
        break;
      case '/requirements':
        title = "Requirements - DesignPanda";
        break;
      case '/results':
        title = "Architecture Results - DesignPanda";
        break;
      default:
        if (location.pathname !== '/') {
          title = "DesignPanda";
        }
    }
    
    document.title = title;
  }, [location]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTitleUpdater />
        <Routes>
          <Route path="/" element={<HeroLandingPage />} />
          <Route path="/input" element={<ProjectInput />} />
          <Route path="/requirements" element={<RequirementsPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/original" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
