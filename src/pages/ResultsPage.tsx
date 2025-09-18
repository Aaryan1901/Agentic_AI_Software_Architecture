import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Download, Save, Share2 } from "lucide-react";
import { generateArchitectureRecommendation } from '@/services/architectureService';
import { ProjectRequirements } from '@/components/RequirementsForm';
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';
import { Progress } from '@/components/ui/progress';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Import refactored components
import OverviewTab from '@/components/results/OverviewTab';
import DiagramsTab from '@/components/results/DiagramsTab';
import TechStackTab from '@/components/results/TechStackTab';
import ProgressStep from '@/components/results/ProgressStep';
import { formatProjectType, formatScale } from '@/components/results/ResultsHelpers';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [requirements, setRequirements] = useState<ProjectRequirements | null>(null);
  const [recommendation, setRecommendation] = useState<ArchitectureRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [diagramTab, setDiagramTab] = useState<string>("flowchart");

  useEffect(() => {
    // Get requirements from session storage
    const storedRequirements = sessionStorage.getItem('projectRequirements');
    if (!storedRequirements) {
      setError("No project requirements found. Please start over.");
      setLoading(false);
      return;
    }

    try {
      const parsedRequirements = JSON.parse(storedRequirements) as ProjectRequirements;
      setRequirements(parsedRequirements);

      // Start progress animation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 950);

      // Generate architecture recommendation
      generateArchitectureRecommendation(parsedRequirements)
        .then((result) => {
          setRecommendation(result);
          setLoading(false);
          clearInterval(interval);
          setProgress(100);
        })
        .catch((err) => {
          setError("Failed to generate architecture recommendation. Please try again.");
          setLoading(false);
          clearInterval(interval);
        });

      return () => clearInterval(interval);
    } catch (err) {
      setError("Invalid project requirements. Please start over.");
      setLoading(false);
    }
  }, []);

  const handleExport = () => {
    toast.success("Architecture plan exported as PDF");
  };

  const handleSave = () => {
    toast.success("Architecture plan saved to your account");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const renderDiagram = () => {
    if (!recommendation?.diagrams) return null;
    
    let diagram;
    switch (diagramTab) {
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
    
    if (!diagram) return null;
    
    return (
      <div className="flex flex-col gap-4">
        <div 
          className="w-full border p-4 rounded bg-white"
          dangerouslySetInnerHTML={{ __html: diagram.svgContent }} 
        />
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-16 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="mb-6">{error}</p>
            <Button onClick={() => navigate('/')} className="bg-architect hover:bg-architect-dark">
              Back to Start
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-16 flex flex-col items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Generating Architecture Plan</h2>
            <Progress value={progress} className="mb-4" />
            <div className="space-y-6">
             <ProgressStep 
                step={1}
                title="Analyzing requirements"
                description="Evaluating project constraints and needs"
                isActive={progress < 30}
                isComplete={progress >= 30}
              />
              <ProgressStep 
                step={2}
                title="Researching solutions"
                description="Searching for best practices and patterns"
                isActive={progress >= 30 && progress < 60}
                isComplete={progress >= 60}
              />
              <ProgressStep 
                step={3}
                title="Designing architecture"
                description="Creating optimal component structure"
                isActive={progress >= 60 && progress < 85}
                isComplete={progress >= 85}
              />
              <ProgressStep 
                step={4}
                title="Generating diagrams"
                description="Visualizing the recommended architecture"
                isActive={progress >= 85 && progress < 100}
                isComplete={progress >= 100}
              />
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!requirements || !recommendation) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-16 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="mb-6">Failed to generate architecture plan. Please try again.</p>
            <Button onClick={() => navigate('/')} className="bg-architect hover:bg-architect-dark">
              Back to Start
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-architect">{requirements.projectName}</h1>
            <p className="text-muted-foreground mt-1">Architecture Recommendation Plan</p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={() => navigate('/requirements')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Edit Requirements
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
        </div>
        
        <div className="bg-muted/20 border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Project Type</h3>
              <p className="font-medium">{formatProjectType(requirements?.projectType || '')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Expected Scale</h3>
              <p className="font-medium">{formatScale(requirements?.scalability)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Architecture Pattern</h3>
              <p className="font-medium">{recommendation?.pattern}</p>
            </div>
            {requirements?.budget && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Budget</h3>
                <p className="font-medium">{requirements.budget}</p>
              </div>
            )}
            {requirements?.timeConstraints && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                <p className="font-medium">{requirements.timeConstraints}</p>
              </div>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="pt-4">
            <OverviewTab recommendation={recommendation} renderDiagram={renderDiagram} />
          </TabsContent>
          
          {/* Diagrams Tab */}
          <TabsContent value="diagrams" className="pt-4">
            <DiagramsTab 
              recommendation={recommendation} 
              diagramTab={diagramTab} 
              setDiagramTab={setDiagramTab} 
              renderDiagram={renderDiagram}
            />
          </TabsContent>
          
          {/* Tech Stack Tab */}
          <TabsContent value="tech-stack" className="pt-4">
            <TechStackTab recommendation={recommendation} />
          </TabsContent>
        </Tabs>
        
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => navigate('/requirements')} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/requirements">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/results" isActive>3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8dd62d7e-13f6-43a5-9e18-e60a61d7e086.png" 
              alt="DesignPanda Logo" 
              className="h-8 w-8 object-contain" 
            />
            <p className="text-sm text-muted-foreground">© 2025 DesignPanda. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
