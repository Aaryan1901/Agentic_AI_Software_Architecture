
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';

interface DiagramsTabProps {
  recommendation: ArchitectureRecommendation;
  diagramTab: string;
  setDiagramTab: (tab: string) => void;
  renderDiagram: () => React.ReactNode;
}

const DiagramsTab: React.FC<DiagramsTabProps> = ({ 
  recommendation, 
  diagramTab, 
  setDiagramTab, 
  renderDiagram 
}) => {
  // Check if we have diagrams available from the backend
  const hasDiagrams = recommendation.diagrams && Object.values(recommendation.diagrams).some(diagram => !!diagram);

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Architecture Visualizations</h2>
        <div className="mb-4">
          <TabsList className="w-full mb-4">
            <TabsTrigger 
              value="flowchart" 
              className={diagramTab === "flowchart" ? "bg-architect text-white" : ""}
              onClick={() => setDiagramTab("flowchart")}
            >
              Flowchart
            </TabsTrigger>
            <TabsTrigger 
              value="usecase" 
              className={diagramTab === "usecase" ? "bg-architect text-white" : ""}
              onClick={() => setDiagramTab("usecase")}
            >
              Use Case
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className={diagramTab === "component" ? "bg-architect text-white" : ""}
              onClick={() => setDiagramTab("component")}
            >
              Component
            </TabsTrigger>
            <TabsTrigger 
              value="sequence" 
              className={diagramTab === "sequence" ? "bg-architect text-white" : ""}
              onClick={() => setDiagramTab("sequence")}
            >
              Sequence
            </TabsTrigger>
            <TabsTrigger 
              value="class" 
              className={diagramTab === "class" ? "bg-architect text-white" : ""}
              onClick={() => setDiagramTab("class")}
            >
              Class
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex justify-center p-4 bg-white rounded border">
          <div className="w-full">
            {hasDiagrams ? renderDiagram() : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No diagram available for this architecture type.</p>
                <p className="text-sm mt-2">Try selecting a different diagram type or generating a new architecture.</p>
              </div>
            )}
          </div>
        </div>
        
        {recommendation.diagrams && recommendation.diagrams[diagramTab as keyof typeof recommendation.diagrams] && (
          <div className="mt-6 border p-3 rounded-md bg-gray-50">
            <h4 className="text-sm font-medium mb-2">PlantUML Code</h4>
            <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
              {recommendation.diagrams[diagramTab as keyof typeof recommendation.diagrams]?.plantUmlCode || 'No PlantUML code available'}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagramsTab;
