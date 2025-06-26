
import { ProjectRequirements } from '@/components/RequirementsForm';
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';
import { searchProjectInformation } from './searchService';
import { generateDiagramFromRequirements, DiagramOptions } from './diagramService';
import { getAIAgentRecommendation } from './aiAgentService';

// Helper function to convert UML code to SVG (placeholder implementation)
const convertUMLToSVG = (umlCode: string): string => {
  // This would normally use a PlantUML service to convert UML to SVG
  // For now, we'll return a placeholder SVG with the UML code embedded
  return `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="12" fill="#495057">
        ${umlCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </text>
    </svg>
  `;
};

export const generateArchitectureRecommendation = async (
  requirements: ProjectRequirements
): Promise<ArchitectureRecommendation> => {
  try {
    // First, try to get recommendation from the AI agent backend
    const backendResponse = await getAIAgentRecommendation(requirements);
    
    if (backendResponse) {
      // If we got a response from the backend, use it
      const diagrams = {
        flowchart: {
          svgContent: convertUMLToSVG(backendResponse.uml_code),
          plantUmlCode: backendResponse.uml_code,
          diagramType: 'flowchart'
        },
        useCase: {
          svgContent: convertUMLToSVG(backendResponse.uml_code),
          plantUmlCode: backendResponse.uml_code,
          diagramType: 'usecase'
        },
        component: {
          svgContent: convertUMLToSVG(backendResponse.uml_code),
          plantUmlCode: backendResponse.uml_code,
          diagramType: 'component'
        },
        sequence: {
          svgContent: convertUMLToSVG(backendResponse.uml_code),
          plantUmlCode: backendResponse.uml_code,
          diagramType: 'sequence'
        },
        class: {
          svgContent: convertUMLToSVG(backendResponse.uml_code),
          plantUmlCode: backendResponse.uml_code,
          diagramType: 'class'
        }
      };

      return {
        pattern: extractPattern(backendResponse.architecture),
        description: backendResponse.architecture,
        frameworks: extractFrameworks(backendResponse.architecture),
        deployment: generateDeploymentOptions(requirements),
        diagrams: diagrams,
        searchResults: await searchProjectInformation(`${requirements.projectType} ${requirements.projectName}`)
      };
    }
    
    // Fallback to original logic if backend is not available
    return generateFallbackRecommendation(requirements);
    
  } catch (error) {
    console.error('Error generating architecture recommendation:', error);
    return generateFallbackRecommendation(requirements);
  }
};

// Helper function to extract pattern from architecture description
const extractPattern = (architecture: string): string => {
  if (architecture.toLowerCase().includes('microservice')) return 'Microservices';
  if (architecture.toLowerCase().includes('monolith')) return 'Monolithic';
  if (architecture.toLowerCase().includes('serverless')) return 'Serverless';
  if (architecture.toLowerCase().includes('layered')) return 'Layered Architecture';
  return 'Custom Architecture';
};

// Helper function to extract frameworks from architecture description
const extractFrameworks = (architecture: string): Array<{name: string, description: string, url: string, popularity: number}> => {
  const frameworks = [];
  
  if (architecture.toLowerCase().includes('react')) {
    frameworks.push({
      name: 'React', 
      description: 'Frontend framework for building user interfaces',
      url: 'https://reactjs.org/',
      popularity: 95
    });
  }
  if (architecture.toLowerCase().includes('node')) {
    frameworks.push({
      name: 'Node.js', 
      description: 'JavaScript runtime for backend development',
      url: 'https://nodejs.org/',
      popularity: 90
    });
  }
  if (architecture.toLowerCase().includes('python')) {
    frameworks.push({
      name: 'Python', 
      description: 'Backend programming language',
      url: 'https://python.org/',
      popularity: 88
    });
  }
  if (architecture.toLowerCase().includes('database')) {
    frameworks.push({
      name: 'Database', 
      description: 'Data storage and management system',
      url: 'https://www.postgresql.org/',
      popularity: 85
    });
  }
  
  // Add default frameworks if none detected
  if (frameworks.length === 0) {
    frameworks.push({
      name: 'Web Framework', 
      description: 'Modern web application framework',
      url: 'https://expressjs.com/',
      popularity: 80
    });
    frameworks.push({
      name: 'Database', 
      description: 'Scalable database solution',
      url: 'https://www.postgresql.org/',
      popularity: 85
    });
  }
  
  return frameworks;
};

// Generate deployment options based on requirements
const generateDeploymentOptions = (requirements: ProjectRequirements) => {
  const options = [];
  
  if (requirements.scale === 'small') {
    options.push({
      name: 'Shared Hosting',
      description: 'Cost-effective solution for small applications',
      costEstimate: '$10-50/month'
    });
  }
  
  if (requirements.scale === 'medium' || requirements.scale === 'large') {
    options.push({
      name: 'Cloud Platform',
      description: 'Scalable cloud infrastructure',
      costEstimate: '$100-500/month'
    });
  }
  
  options.push({
    name: 'Container Deployment',
    description: 'Docker-based deployment for flexibility',
    costEstimate: '$50-200/month'
  });
  
  return options;
};

// Fallback recommendation when backend is not available
const generateFallbackRecommendation = async (requirements: ProjectRequirements): Promise<ArchitectureRecommendation> => {
  const searchResults = await searchProjectInformation(`${requirements.projectType} ${requirements.projectName}`);
  
  let pattern = 'Layered Architecture';
  let description = `A ${requirements.projectType} application with a layered architecture approach.`;
  
  if (requirements.scale === 'large') {
    pattern = 'Microservices';
    description = `A scalable ${requirements.projectType} application using microservices architecture to handle large-scale operations.`;
  } else if (requirements.features.includes('realtime')) {
    pattern = 'Event-Driven Architecture';
    description = `A ${requirements.projectType} application with event-driven architecture for real-time features.`;
  }
  
  const frameworks = [
    { 
      name: 'Frontend Framework', 
      description: 'Modern reactive frontend framework',
      url: 'https://reactjs.org/',
      popularity: 90
    },
    { 
      name: 'Backend API', 
      description: 'RESTful API service layer',
      url: 'https://expressjs.com/',
      popularity: 85
    },
    { 
      name: 'Database', 
      description: 'Scalable database solution',
      url: 'https://www.postgresql.org/',
      popularity: 88
    }
  ];
  
  if (requirements.features.includes('auth')) {
    frameworks.push({ 
      name: 'Authentication Service', 
      description: 'Secure user authentication and authorization',
      url: 'https://auth0.com/',
      popularity: 80
    });
  }
  
  const deployment = generateDeploymentOptions(requirements);
  
  // Generate diagrams using the diagram service
  const diagramOptions: DiagramOptions = {
    type: 'flowchart',
    title: `${requirements.projectName} Architecture`,
    description: description,
    elements: frameworks.map(f => f.name),
    actors: ['User', 'Admin']
  };
  
  const flowchartDiagram = await generateDiagramFromRequirements(requirements, diagramOptions);
  const useCaseDiagram = await generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'usecase' });
  const componentDiagram = await generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'component' });
  
  const diagrams = {
    flowchart: flowchartDiagram,
    useCase: useCaseDiagram,
    component: componentDiagram,
    sequence: await generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'sequence' }),
    class: await generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'class' })
  };
  
  return {
    pattern,
    description,
    frameworks,
    deployment,
    diagrams,
    searchResults
  };
};
