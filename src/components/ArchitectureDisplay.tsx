
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProjectRequirements } from './RequirementsForm';
import { getDiagramByPattern } from './DiagramTemplates';
import { SearchResult } from '@/services/searchService';
import { GeneratedDiagram } from '@/services/diagramService';

export interface ArchitectureRecommendation {
  pattern: string;
  description: string;
  frameworks: Framework[];
  libraries: Library[];
  deployment: DeploymentOption[];
  diagram: string; // This would be a diagram representation (SVG or component reference)
  pros: string[];
  cons: string[];
  searchResults?: SearchResult[]; // Add search results to the recommendation
  diagrams?: {
    flowchart: GeneratedDiagram;
    useCase: GeneratedDiagram;
    component?: GeneratedDiagram;
    sequence?: GeneratedDiagram;
    class?: GeneratedDiagram;
  };
}

interface Framework {
  name: string;
  description: string;
  url: string;
  popularity: number; // 1-10
}

interface Library {
  name: string;
  purpose: string;
  url: string;
}

interface DeploymentOption {
  name: string;
  description: string;
  costEstimate: string;
}

interface ArchitectureDisplayProps {
  requirements: ProjectRequirements;
  recommendation: ArchitectureRecommendation | null;
  loading: boolean;
  onRefine: () => void;
}

const ArchitectureDisplay: React.FC<ArchitectureDisplayProps> = ({
  requirements,
  recommendation,
  loading,
  onRefine,
}) => {
  const [diagramTab, setDiagramTab] = useState<string>("pattern");
  const [diagramType, setDiagramType] = useState<string>("flowchart");
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-architect mb-4"></div>
          <p className="text-muted-foreground">Searching for project information and designing architecture...</p>
          <p className="text-sm text-muted-foreground mt-2">Analyzing requirements and industry best practices...</p>
        </CardContent>
      </Card>
    );
  }

  if (!recommendation) {
    return null;
  }

  // Function to render the PlantUML code or SVG diagram
  const renderDiagram = () => {
    if (diagramTab === "pattern") {
      return getDiagramByPattern(recommendation.pattern);
    } else if (diagramTab === "dynamic" && recommendation.diagrams) {
      let diagram: GeneratedDiagram | undefined;
      
      switch (diagramType) {
        case "flowchart":
          diagram = recommendation.diagrams.flowchart;
          break;
        case "usecase":
          diagram = recommendation.diagrams.useCase;
          break;
        case "component":
          diagram = recommendation.diagrams.component;
          break;
        case "sequence":
          diagram = recommendation.diagrams.sequence;
          break;
        case "class":
          diagram = recommendation.diagrams.class;
          break;
        default:
          diagram = recommendation.diagrams.flowchart;
      }
      
      if (diagram) {
        // In a real application, this SVG would be generated from the PlantUML code
        // For now, we're using the pre-generated SVG content
        return (
          <div className="flex flex-col gap-4">
            <div 
              className="w-full border p-4 rounded bg-white"
              dangerouslySetInnerHTML={{ __html: diagram.svgContent }} 
            />
            <div className="border p-3 rounded-md bg-gray-50">
              <h4 className="text-sm font-medium mb-2">PlantUML Code</h4>
              <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
                {diagram.plantUmlCode}
              </pre>
            </div>
          </div>
        );
      }
    }
    
    // Fallback to pattern diagram
    return getDiagramByPattern(recommendation.pattern);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-architect">Architecture Recommendation</CardTitle>
            <CardDescription>
              Based on your project: <span className="font-medium">{requirements.projectName}</span>
            </CardDescription>
          </div>
          <Button onClick={onRefine} variant="outline" size="sm">
            Refine Results
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* If we have search results, show them first */}
        {recommendation.searchResults && recommendation.searchResults.length > 0 && (
          <div className="mb-4 border rounded-md p-4 bg-muted/20">
            <h3 className="text-lg font-semibold mb-2">Research Findings</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The AI searched for information relevant to your project requirements:
            </p>
            <div className="space-y-3">
              {recommendation.searchResults.slice(0, 3).map((result, index) => (
                <div key={index} className="border-l-2 border-architect pl-3">
                  <h4 className="font-medium text-sm">{result.title}</h4>
                  <p className="text-xs text-muted-foreground">{result.summary}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs italic">{result.source}</span>
                    {result.url && (
                      <a 
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-xs text-architect hover:underline"
                      >
                        Learn more
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Recommended Pattern</h3>
          <div className="flex items-center">
            <Badge className="bg-architect text-white mr-2">{recommendation.pattern}</Badge>
            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
          </div>
        </div>

        <Tabs defaultValue="frameworks">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="libraries">Libraries</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>
          <TabsContent value="frameworks" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              {recommendation.frameworks.map((framework, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{framework.name}</h4>
                    <p className="text-sm text-muted-foreground">{framework.description}</p>
                    <a 
                      href={framework.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-architect hover:underline"
                    >
                      Learn more
                    </a>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: framework.popularity }).map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-architect rounded-full"/>
                    ))}
                    {Array.from({ length: 10 - framework.popularity }).map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-muted rounded-full"/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="libraries" className="p-4 border rounded-md mt-2">
            <div className="grid grid-cols-2 gap-4">
              {recommendation.libraries.map((library, index) => (
                <div key={index} className="p-2 border rounded-md">
                  <h4 className="font-medium">{library.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{library.purpose}</p>
                  <a 
                    href={library.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-architect hover:underline"
                  >
                    Documentation
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="deployment" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              {recommendation.deployment.map((option, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{option.name}</h4>
                    <Badge variant="outline">{option.costEstimate}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  {index < recommendation.deployment.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="border p-4 rounded-md bg-muted/30">
          <h3 className="text-lg font-semibold mb-4">Architecture Visualization</h3>
          
          <Tabs value={diagramTab} onValueChange={setDiagramTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="pattern">Pattern Diagram</TabsTrigger>
              <TabsTrigger value="dynamic">Dynamic Diagrams</TabsTrigger>
            </TabsList>
            
            {diagramTab === "dynamic" && (
              <div className="mb-4">
                <TabsList className="w-full">
                  <TabsTrigger 
                    value="flowchart" 
                    className={diagramType === "flowchart" ? "bg-architect text-white" : ""}
                    onClick={() => setDiagramType("flowchart")}
                  >
                    Flowchart
                  </TabsTrigger>
                  <TabsTrigger 
                    value="usecase" 
                    className={diagramType === "usecase" ? "bg-architect text-white" : ""}
                    onClick={() => setDiagramType("usecase")}
                  >
                    Use Case
                  </TabsTrigger>
                  <TabsTrigger 
                    value="component" 
                    className={diagramType === "component" ? "bg-architect text-white" : ""}
                    onClick={() => setDiagramType("component")}
                  >
                    Component
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sequence" 
                    className={diagramType === "sequence" ? "bg-architect text-white" : ""}
                    onClick={() => setDiagramType("sequence")}
                  >
                    Sequence
                  </TabsTrigger>
                  <TabsTrigger 
                    value="class" 
                    className={diagramType === "class" ? "bg-architect text-white" : ""}
                    onClick={() => setDiagramType("class")}
                  >
                    Class
                  </TabsTrigger>
                </TabsList>
              </div>
            )}
            
            <div className="flex justify-center p-4 bg-white rounded border">
              <div className="w-full aspect-[16/9] bg-white">
                {renderDiagram()}
              </div>
            </div>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-md font-semibold mb-2 text-green-600">Pros</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {recommendation.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2 text-red-600">Cons</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {recommendation.cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline">Export as PDF</Button>
          <Button className="bg-architect hover:bg-architect-dark">
            Save Recommendation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArchitectureDisplay;
