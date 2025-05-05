
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';

interface TechStackTabProps {
  recommendation: ArchitectureRecommendation;
}

const TechStackTab: React.FC<TechStackTabProps> = ({ recommendation }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Recommended Technologies</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Frameworks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendation.frameworks.map((framework, index) => (
              <div key={index} className="border rounded-lg p-4 hover:border-architect/40 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{framework.name}</h4>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: framework.popularity }).map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-architect rounded-full"/>
                    ))}
                    {Array.from({ length: 10 - framework.popularity }).map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-muted rounded-full"/>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{framework.description}</p>
                <div className="mt-3">
                  <a 
                    href={framework.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-architect hover:underline inline-flex items-center"
                  >
                    Learn more <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Libraries & Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendation.libraries.map((library, index) => (
              <div key={index} className="border rounded-md p-3 hover:border-architect/40 transition-colors">
                <h4 className="font-medium">{library.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">{library.purpose}</p>
                <a 
                  href={library.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-architect hover:underline inline-flex items-center"
                >
                  Documentation <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechStackTab;
