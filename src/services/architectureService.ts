import { ProjectRequirements } from '@/components/RequirementsForm';
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';
import { searchProjectInformation } from './searchService';
import { generateDiagramFromRequirements, DiagramOptions } from './diagramService';
import { getAIAgentRecommendation, BackendResponse } from './aiAgentService';
import { toast } from 'sonner';

const createImageFromBase64 = (base64Data: string, mimeType: string): string => {
  return base64Data ? `data:${mimeType};base64,${base64Data}` : "";
};

const createDiagramsFromBackendResponse = (response: BackendResponse) => {
  const imageUrl = createImageFromBase64(response.image_data, response.mime_type);
  
  return {
    flowchart: {
      svgContent: imageUrl,
      plantUmlCode: response.uml_code,
      diagramType: 'flowchart'
    },
    useCase: {
      svgContent: imageUrl,
      plantUmlCode: response.uml_code,
      diagramType: 'usecase'
    },
    component: {
      svgContent: imageUrl,
      plantUmlCode: response.uml_code,
      diagramType: 'component'
    },
    sequence: {
      svgContent: imageUrl,
      plantUmlCode: response.uml_code,
      diagramType: 'sequence'
    },
    class: {
      svgContent: imageUrl,
      plantUmlCode: response.uml_code,
      diagramType: 'class'
    }
  };
};

export const generateArchitectureRecommendation = async (
  requirements: ProjectRequirements
): Promise<ArchitectureRecommendation> => {
  try {
    toast.info("Generating architecture recommendation...");
    const backendResponse = await getAIAgentRecommendation(requirements);
    
    if (backendResponse) {
      const diagrams = createDiagramsFromBackendResponse(backendResponse);
      const searchQuery = `${requirements.hospitalType} ${requirements.hospitalName} hospital management system`;

      const recommendation: ArchitectureRecommendation = {
        pattern: extractPattern(backendResponse.architecture),
        description: backendResponse.architecture,
        frameworks: extractFrameworks(backendResponse.architecture),
        libraries: [], // Added empty array for libraries
        deployment: generateDeploymentOptions(requirements),
        diagram: "", // Added empty string for diagram
        pros: [], // Added empty array for pros
        cons: [], // Added empty array for cons
        diagrams: diagrams,
        searchResults: await searchProjectInformation(searchQuery),
        source: 'ai-backend'
      };

      if (!backendResponse.image_data) {
        toast.warning("Diagram could not be generated, showing architecture details");
      } else {
        toast.success("AI-generated architecture created successfully");
      }
      return recommendation;
    }
    
    toast.warning("Using fallback recommendation method");
    return await generateFallbackRecommendation(requirements);
    
  } catch (error) {
    console.error('Error generating architecture recommendation:', error);
    toast.error("Failed to generate recommendation. Using fallback method...");
    return await generateFallbackRecommendation(requirements);
  }
};

// Helper function to extract pattern from architecture description
const extractPattern = (architecture: string): string => {
  const lowerArch = architecture.toLowerCase();
  if (lowerArch.includes('microservice')) return 'Microservices';
  if (lowerArch.includes('monolith')) return 'Monolithic';
  if (lowerArch.includes('serverless')) return 'Serverless';
  if (lowerArch.includes('layered')) return 'Layered Architecture';
  if (lowerArch.includes('event-driven')) return 'Event-Driven';
  if (lowerArch.includes('soa')) return 'Service-Oriented';
  return 'Custom Architecture';
};

// Helper function to extract frameworks from architecture description
const extractFrameworks = (architecture: string) => {
  const frameworks = [];
  const lowerArch = architecture.toLowerCase();
  
  // Frontend frameworks
  if (lowerArch.includes('react')) {
    frameworks.push(createFramework('React', 'Frontend library for building UIs', 'https://reactjs.org/', 95));
  } 
  if (lowerArch.includes('angular')) {
    frameworks.push(createFramework('Angular', 'Frontend framework', 'https://angular.io/', 85));
  } 
  if (lowerArch.includes('vue')) {
    frameworks.push(createFramework('Vue.js', 'Progressive JavaScript framework', 'https://vuejs.org/', 88));
  } 
  if (lowerArch.includes('flutter')) {
    frameworks.push(createFramework('Flutter', 'UI toolkit for mobile apps', 'https://flutter.dev/', 82));
  }
  if (lowerArch.includes('svelte')) {
    frameworks.push(createFramework('Svelte', 'Cybernetically enhanced web apps', 'https://svelte.dev/', 75));
  }

  // Backend frameworks
  if (lowerArch.includes('node')) {
    frameworks.push(createFramework('Node.js', 'JavaScript runtime', 'https://nodejs.org/', 90));
  }
  if (lowerArch.includes('django')) {
    frameworks.push(createFramework('Django', 'Python web framework', 'https://www.djangoproject.com/', 85));
  }
  if (lowerArch.includes('flask')) {
    frameworks.push(createFramework('Flask', 'Python microframework', 'https://flask.palletsprojects.com/', 80));
  }
  if (lowerArch.includes('spring')) {
    frameworks.push(createFramework('Spring', 'Java framework', 'https://spring.io/', 88));
  }
  if (lowerArch.includes('laravel')) {
    frameworks.push(createFramework('Laravel', 'PHP framework', 'https://laravel.com/', 85));
  }

  // Databases
  if (lowerArch.includes('postgres') || lowerArch.includes('postgre')) {
    frameworks.push(createFramework('PostgreSQL', 'Relational database', 'https://www.postgresql.org/', 92));
  }
  if (lowerArch.includes('mongodb')) {
    frameworks.push(createFramework('MongoDB', 'NoSQL database', 'https://www.mongodb.com/', 90));
  }
  if (lowerArch.includes('mysql')) {
    frameworks.push(createFramework('MySQL', 'Relational database', 'https://www.mysql.com/', 88));
  }
  if (lowerArch.includes('redis')) {
    frameworks.push(createFramework('Redis', 'In-memory data store', 'https://redis.io/', 85));
  }

  // Add default frameworks if none detected
  if (frameworks.length === 0) {
    frameworks.push(
      createFramework('Web Framework', 'Modern web application framework', 'https://expressjs.com/', 80),
      createFramework('Database', 'Scalable database solution', 'https://www.postgresql.org/', 85)
    );
  }
  
  return frameworks;
};

const createFramework = (
  name: string, 
  description: string, 
  url: string, 
  popularity: number
) => {
  return { 
    name, 
    description, 
    url, 
    popularity,
    tags: [] as string[]
  };
};

// Generate deployment options based on requirements
const generateDeploymentOptions = (requirements: ProjectRequirements) => {
  const options = [];
  
  if (requirements.scale === 'small') {
    options.push({
      name: 'Shared Hosting',
      description: 'Cost-effective solution for small applications',
      costEstimate: '$10-50/month',
      recommended: true,
      tags: ['budget-friendly', 'simple']
    });
    
    options.push({
      name: 'VPS',
      description: 'Virtual private server for more control',
      costEstimate: '$20-100/month',
      recommended: false,
      tags: ['scalable', 'flexible']
    });
  }
  
  if (requirements.hospitalSize === 'medium') {
    options.push({
      name: 'Cloud Platform (AWS/GCP)',
      description: 'Scalable cloud infrastructure with pay-as-you-go pricing',
      costEstimate: '$100-500/month',
      recommended: true,
      tags: ['scalable', 'reliable']
    });
    
    options.push({
      name: 'Managed Kubernetes',
      description: 'Simplified container orchestration',
      costEstimate: '$200-800/month',
      recommended: false,
      tags: ['containers', 'scalable']
    });
  }
  
  if (requirements.hospitalSize === 'large' || requirements.hospitalSize === 'enterprise') {
    options.push({
      name: 'Kubernetes Cluster',
      description: 'Container orchestration for large-scale applications',
      costEstimate: '$500+/month',
      recommended: true,
      tags: ['scalable', 'high-availability']
    });
    
    options.push({
      name: 'Hybrid Cloud',
      description: 'Combination of on-premises and cloud infrastructure',
      costEstimate: 'Custom pricing',
      recommended: false,
      tags: ['flexible', 'enterprise']
    });
  }
  
  // Always available options
  options.push({
    name: 'Container Deployment',
    description: 'Docker-based deployment for flexibility',
    costEstimate: '$50-200/month',
    recommended: requirements.scale !== 'enterprise',
    tags: ['containers', 'portable']
  });
  
  options.push({
    name: 'Serverless',
    description: 'Event-driven compute service',
    costEstimate: '$0-300/month (pay-per-use)',
    recommended: requirements.projectType.toLowerCase().includes('serverless'),
    tags: ['scalable', 'cost-efficient']
  });
  
  return options;
};

// Fallback recommendation when backend is not available
const generateFallbackRecommendation = async (
  requirements: ProjectRequirements
): Promise<ArchitectureRecommendation> => {
  try {
    const searchResults = await searchProjectInformation(
      `${requirements.projectType} ${requirements.projectName}`
    );
    
    let pattern = 'Layered Architecture';
    let description = `A ${requirements.projectType} application with a layered architecture approach.`;
    
    if (requirements.hospitalSize === 'large' || requirements.hospitalSize === 'enterprise') {
      pattern = 'Microservices';
      description = `A scalable ${requirements.projectType} application using microservices architecture to handle large-scale operations.`;
    } else if (requirements.features.includes('realtime')) {
      pattern = 'Event-Driven Architecture';
      description = `A ${requirements.projectType} application with event-driven architecture for real-time features.`;
    } else if (requirements.projectType.toLowerCase().includes('serverless')) {
      pattern = 'Serverless';
      description = `A ${requirements.projectType} application built using serverless architecture for cost efficiency.`;
    }
    
    // Generate diagrams using the diagram service
    const diagramOptions: DiagramOptions = {
      type: 'flowchart',
      title: `${requirements.projectName} Architecture`,
      description: description,
      elements: [],
      actors: ['User', 'Admin']
    };
    
    const frameworks = extractFrameworks(description);
    const deployment = generateDeploymentOptions(requirements);
    
    const [
      flowchartDiagram,
      useCaseDiagram,
      componentDiagram,
      sequenceDiagram,
      classDiagram
    ] = await Promise.all([
      generateDiagramFromRequirements(requirements, diagramOptions),
      generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'usecase' }),
      generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'component' }),
      generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'sequence' }),
      generateDiagramFromRequirements(requirements, { ...diagramOptions, type: 'class' })
    ]);
    
    return {
      pattern,
      description,
      frameworks,
      libraries: [], // Added empty array for libraries
      deployment,
      diagram: "", // Added empty string for diagram
      pros: [], // Added empty array for pros
      cons: [], // Added empty array for cons
      diagrams: {
        flowchart: flowchartDiagram,
        useCase: useCaseDiagram,
        component: componentDiagram,
        sequence: sequenceDiagram,
        class: classDiagram
      },
      searchResults,
      source: 'fallback'
    };
  } catch (error) {
    console.error('Error generating fallback recommendation:', error);
    throw new Error('Failed to generate fallback recommendation');
  }
};