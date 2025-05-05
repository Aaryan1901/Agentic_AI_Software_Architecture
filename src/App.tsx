
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Index from './pages/Index';
import RequirementsPage from './pages/RequirementsPage';
import ResultsPage from './pages/ResultsPage';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { initializeApiKeys, API_KEYS } from './utils/apiKeys';
import './App.css';

// Page title updater component
const PageTitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    let title = "DesignPanda";
    
    switch(location.pathname) {
      case '/':
        title = "DesignPanda - Intelligent Software Architecture";
        break;
      case '/requirements':
        title = "Define Project Requirements - DesignPanda";
        break;
      case '/results':
        title = "Architecture Recommendations - DesignPanda";
        break;
      default:
        title = "DesignPanda";
    }
    
    document.title = title;
  }, [location]);
  
  return null;
};

function App() {
  // Initialize API keys on app startup
  useEffect(() => {
    // Initialize with the provided API keys
    const apiKeys = {
      [API_KEYS.GROQ_API_KEY]: "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",
      [API_KEYS.LANGCHAIN_API_KEY]: "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",
      [API_KEYS.LANGCHAIN_PROJECT]: "langgraph-prerequisites",
      [API_KEYS.SERPER_API_KEY]: "6dd728c1740ec52e6cd4d36bebbdaa461998061d",
      [API_KEYS.GOOGLE_API_KEY]: "AIzaSyAqhsgKxPnwZkDFWua2nJT42ZRXYVHlL3M",
      [API_KEYS.TAVILY_API_KEY]: "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",
    };

    initializeApiKeys(apiKeys);
    console.log("API keys initialized on app startup");
  }, []);

  return (
    <Router>
      <PageTitleUpdater />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/requirements" element={<RequirementsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
