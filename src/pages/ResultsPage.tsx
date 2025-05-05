
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
          return prev + 5;
        });
      }, 300);

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

  const renderDiagram = () => {
    if (!recommendation.diagrams) return null;
    
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
              <p className="font-medium">{formatProjectType(requirements.projectType)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Expected Scale</h3>
              <p className="font-medium">{formatScale(requirements.scale)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Architecture Pattern</h3>
              <p className="font-medium">{recommendation.pattern}</p>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="pt-4">
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
                      {recommendation.diagrams && renderDiagram()}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-lg font-bold mb-4">Pros & Cons</h2>
                    <div className="mb-4">
                      <h3 className="text-md font-semibold mb-2 text-green-600">Advantages</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {recommendation.pros.map((pro, index) => (
                          <li key={index} className="text-muted-foreground">{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold mb-2 text-red-600">Limitations</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {recommendation.cons.map((con, index) => (
                          <li key={index} className="text-muted-foreground">{con}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
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
          </TabsContent>
          
          {/* Diagrams Tab */}
          <TabsContent value="diagrams" className="pt-4">
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
                    {renderDiagram()}
                  </div>
                </div>
                
                {recommendation.diagrams && recommendation.diagrams[diagramTab as keyof typeof recommendation.diagrams] && (
                  <div className="mt-6 border p-3 rounded-md bg-gray-50">
                    <h4 className="text-sm font-medium mb-2">PlantUML Code</h4>
                    <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
                      {recommendation.diagrams[diagramTab as keyof typeof recommendation.diagrams]?.plantUmlCode}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tech Stack Tab */}
          <TabsContent value="tech-stack" className="pt-4">
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
          </TabsContent>
          
          {/* Deployment Tab */}
          <TabsContent value="deployment" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Deployment Options</h2>
                <div className="space-y-6">
                  {recommendation.deployment.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{option.name}</h3>
                        <Badge variant="outline" className="text-lg">{option.costEstimate}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-2">{option.description}</p>
                      
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium">Scalability</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {Array.from({ length: Math.floor(Math.random() * 5) + 3 }).map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-architect rounded-full"/>
                            ))}
                            {Array.from({ length: 10 - (Math.floor(Math.random() * 5) + 3) }).map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-muted rounded-full"/>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Complexity</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {Array.from({ length: Math.floor(Math.random() * 5) + 2 }).map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-amber-500 rounded-full"/>
                            ))}
                            {Array.from({ length: 10 - (Math.floor(Math.random() * 5) + 2) }).map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-muted rounded-full"/>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Maintenance</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-red-500 rounded-full"/>
                            ))}
                            {Array.from({ length: 10 - (Math.floor(Math.random() * 5) + 1) }).map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-muted rounded-full"/>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Deployment Steps</h3>
                  <ol className="list-decimal list-inside space-y-3">
                    <li className="text-muted-foreground">
                      <span className="font-medium text-foreground">Set up infrastructure</span>: Create servers or cloud resources according to the selected deployment option.
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-foreground">Configure environment</span>: Install necessary software and dependencies.
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-foreground">Set up CI/CD pipeline</span>: Automate the build and deployment process.
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-foreground">Deploy application</span>: Deploy the application to production.
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-foreground">Configure monitoring</span>: Set up logging, alerting, and performance monitoring.
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Risk Analysis</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Potential Risks</h3>
                  <div className="space-y-4">
                    <RiskItem 
                      title="Scalability Challenges"
                      description="The architecture may face performance issues with unexpected growth."
                      severity="medium"
                      mitigation="Implement horizontal scaling and caching strategies early."
                    />
                    <RiskItem 
                      title="Technology Learning Curve"
                      description="Team may need time to adapt to some of the recommended technologies."
                      severity="low"
                      mitigation="Plan for training and start with simpler components."
                    />
                    <RiskItem 
                      title="Integration Complexity"
                      description="Multiple systems integration may cause unforeseen issues."
                      severity="high"
                      mitigation="Create detailed integration tests and fallback mechanisms."
                    />
                    <RiskItem 
                      title="Security Vulnerabilities"
                      description="The selected stack may have security issues if not properly configured."
                      severity="medium"
                      mitigation="Implement security best practices and regular audits."
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Timeline Estimate</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Minimal Viable Product</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm font-medium">1-2 months</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Core Features</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">3-4 months</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Complete Solution</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-full" style={{ width: '90%' }}></div>
                        </div>
                        <span className="text-sm font-medium">6+ months</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Alternative Approaches</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Microservices Architecture</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex">
                          <span className="text-green-600 font-medium w-20">Pros:</span>
                          <span className="text-muted-foreground">Better scalability, independent services</span>
                        </div>
                        <div className="flex">
                          <span className="text-red-600 font-medium w-20">Cons:</span>
                          <span className="text-muted-foreground">Higher complexity, deployment overhead</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Serverless Architecture</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex">
                          <span className="text-green-600 font-medium w-20">Pros:</span>
                          <span className="text-muted-foreground">Lower operational costs, automatic scaling</span>
                        </div>
                        <div className="flex">
                          <span className="text-red-600 font-medium w-20">Cons:</span>
                          <span className="text-muted-foreground">Cold starts, vendor lock-in risks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-architect">
              <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
              <path d="M7 7 4.5 3h15L17 7" />
              <path d="m12 16-1 6h2l1-6" />
            </svg>
            <p className="text-sm text-muted-foreground">© 2025 ArchitectAI. All rights reserved.</p>
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

// Helper components
const ProgressStep = ({ 
  step, 
  title, 
  description, 
  isActive, 
  isComplete 
}: { 
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isComplete: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isComplete ? 'bg-green-100 text-green-600' : 
      isActive ? 'bg-architect text-white' : 
      'bg-muted text-muted-foreground'
    }`}>
      {step}
    </div>
    <div>
      <h3 className={`font-medium ${isActive ? 'text-architect' : ''}`}>{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const RiskItem = ({ 
  title, 
  description, 
  severity,
  mitigation 
}: { 
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  mitigation: string;
}) => {
  const severityColor = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700'
  };
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <h4 className="font-medium">{title}</h4>
        <Badge className={severityColor[severity]}>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-2 text-sm">
        <span className="font-medium">Mitigation: </span>
        <span className="text-muted-foreground">{mitigation}</span>
      </div>
    </div>
  );
};

// Helper functions
const formatProjectType = (type: string): string => {
  const types: Record<string, string> = {
    'web': 'Web Application',
    'mobile': 'Mobile Application',
    'desktop': 'Desktop Application',
    'api': 'API Service',
    'ai': 'AI/ML Project',
    'iot': 'IoT System',
    'other': 'Other'
  };
  return types[type] || type;
};

const formatScale = (scale: string): string => {
  const scales: Record<string, string> = {
    'small': 'Small (Hundreds of users)',
    'medium': 'Medium (Thousands of users)',
    'large': 'Large (Millions of users)'
  };
  return scales[scale] || scale;
};

export default ResultsPage;
