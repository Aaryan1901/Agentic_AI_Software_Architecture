
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';
import { Button } from '@/components/ui/button';
import { DeploymentMetrics } from './ResultsHelpers';

interface OverviewTabProps {
  recommendation: ArchitectureRecommendation;
  renderDiagram: () => React.ReactNode;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ recommendation, renderDiagram }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Architecture Summary</h2>
            <p className="mb-4 text-muted-foreground">{recommendation.description}</p>
            
            <h3 className="font-semibold mt-6 mb-2">Key Components</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {recommendation.frameworks.map((framework, i) => (
                <li key={i}>{framework.name} - {framework.description}</li>
              ))}
            </ul>
            
            {recommendation.searchResults && recommendation.searchResults.length > 0 && (
              <>
                <h3 className="font-semibold mt-6 mb-2">Research Findings</h3>
                <div className="space-y-3">
                  {recommendation.searchResults.slice(0, 2).map((result, index) => (
                    <div key={index} className="border-l-2 border-architect pl-3">
                      <h4 className="font-medium text-sm">{result.title}</h4>
                      <p className="text-xs text-muted-foreground">{result.summary}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Main Diagram</h2>
            <div className="border rounded p-4 bg-white">
              {renderDiagram()}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-bold mb-4">Cost Estimation</h2>
            <div className="space-y-4">
              {recommendation.deployment.map((option, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{option.name}</h4>
                    <Badge variant="outline">{option.costEstimate}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                  {index < recommendation.deployment.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-bold mb-4">Deployment Analysis</h2>
            <div className="space-y-4">
              {recommendation.deployment.map((option, index) => {
                // Use default values if metrics is undefined
                const metrics = option.metrics || { costEfficiency: 'Medium', scalability: 'High', complexity: 'Low' };
                
                return (
                  <div key={`analysis-${index}`} className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{option.name}</h4>
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {index === 0 ? "Recommended" : "Alternative"}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs">
                      <div className="flex justify-between mb-1">
                        <span>Cost efficiency</span>
                        <span className="font-medium">{metrics.costEfficiency || "Medium"}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Scalability</span>
                        <span className="font-medium">{metrics.scalability || "High"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup complexity</span>
                        <span className="font-medium">{metrics.complexity || "Low"}</span>
                      </div>
                    </div>
                    {index < recommendation.deployment.length - 1 && <Separator className="my-2" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-architect-light/30 to-background">
          <CardContent className="pt-6">
            <h2 className="text-lg font-bold mb-2">Need Expert Help?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with professionals who can implement this architecture for your project.
            </p>
            <Button className="w-full bg-architect hover:bg-architect-dark">
              Find Developers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
