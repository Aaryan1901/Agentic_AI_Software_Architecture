
import { useState } from 'react';
import RequirementsForm, { ProjectRequirements } from '@/components/RequirementsForm';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RequirementsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (data: ProjectRequirements) => {
    console.log("Requirements submitted:", data);
    setIsLoading(true);

    // Store the form data in local storage for persistence
    localStorage.setItem('projectRequirements', JSON.stringify(data));

    // Simulate a delay before navigating to results page
    setTimeout(() => {
      navigate('/results');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header showNav={true} />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-architect">
            Define Your Project
          </h1>
          
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Tell us about your project requirements, and we'll generate a tailored software architecture recommendation
            to help you build efficiently and effectively.
          </p>
          
          <RequirementsForm onSubmit={handleFormSubmit} />
          
          {isLoading && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-architect border-r-architect border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-lg">Generating your architecture recommendation...</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
