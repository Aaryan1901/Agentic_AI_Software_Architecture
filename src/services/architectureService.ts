
import { ProjectRequirements } from '@/components/RequirementsForm';
import { ArchitectureRecommendation } from '@/components/ArchitectureDisplay';
import { searchProjectInformation, SearchResult, LLMModel } from './searchService';
import { generateDiagramFromRequirements } from './diagramService';

// This is a mock service that would be replaced with actual AI logic or API calls
export const generateArchitectureRecommendation = async (
  requirements: ProjectRequirements
): Promise<ArchitectureRecommendation> => {
  console.log("Generating architecture recommendation for:", requirements);
  
  // Get the selected LLM model from localStorage, or default if not set
  const selectedModel = (localStorage.getItem('selectedLLM') as LLMModel) || 'default';
  console.log("Using LLM model:", selectedModel);
  
  // First, search for relevant information about the project using the selected LLM
  const searchQuery = `${requirements.projectType} application with ${requirements.features.join(', ')} features`;
  const searchResults = await searchProjectInformation(searchQuery, selectedModel);
  
  // Simulate API call delay for the actual recommendation generation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Use the search results to influence the recommendation
  // In a real implementation, this would use more sophisticated AI logic
  let pattern = 'Microservices';
  let description = 'A microservices architecture with distributed components';
  
  // Adjust recommendation based on search results and requirements
  if (requirements.projectType === 'webapp' && requirements.scalability === 'low') {
    pattern = 'Monolithic MVC';
    description = 'A traditional monolithic application with Model-View-Controller pattern';
  } else if (requirements.projectType === 'mobile') {
    pattern = 'Clean Architecture';
    description = 'Domain-driven design with clean separation of concerns';
  } else if (requirements.features.includes('Real-time Updates')) {
    pattern = 'Event-Driven Architecture';
    description = 'Reactive system based on events and message queues';
  }

  // Generate frameworks based on project type
  const frameworks = getFrameworksByProjectType(requirements.projectType);
  
  // Generate libraries based on features
  const libraries = getLibrariesByFeatures(requirements.features);
  
  // Generate deployment options based on scalability
  const deployment = getDeploymentByScalability(requirements.scalability);

  // Map the pros and cons
  const pros = getProsForPattern(pattern);
  const cons = getConsForPattern(pattern);
  
  // Generate diagrams using our new diagram service
  const flowchartDiagram = await generateDiagramFromRequirements(requirements, {
    type: 'flowchart',
    title: `${requirements.projectName} Flow Diagram`
  });
  
  const useCaseDiagram = await generateDiagramFromRequirements(requirements, {
    type: 'usecase',
    title: `${requirements.projectName} Use Case Diagram`
  });

  return {
    pattern,
    description,
    frameworks,
    libraries,
    deployment,
    diagram: 'placeholder', // No longer used directly, we have specific diagrams now
    pros,
    cons,
    searchResults, // Include the search results in the recommendation
    diagrams: {
      flowchart: flowchartDiagram,
      useCase: useCaseDiagram
    }
  };
};

// Helper functions to generate recommendations
const getFrameworksByProjectType = (projectType: string) => {
  const frameworks = [
    {
      name: 'Spring Boot',
      description: 'Java-based framework for building enterprise applications',
      url: 'https://spring.io/projects/spring-boot',
      popularity: 9
    },
    {
      name: 'React',
      description: 'JavaScript library for building user interfaces',
      url: 'https://reactjs.org',
      popularity: 10
    },
    {
      name: 'Django',
      description: 'High-level Python web framework',
      url: 'https://www.djangoproject.com',
      popularity: 7
    }
  ];

  if (projectType === 'mobile') {
    return [
      {
        name: 'React Native',
        description: 'Framework for building native apps with React',
        url: 'https://reactnative.dev',
        popularity: 8
      },
      {
        name: 'Flutter',
        description: 'Google\'s UI toolkit for building natively compiled applications',
        url: 'https://flutter.dev',
        popularity: 9
      },
      {
        name: 'Native Android/iOS',
        description: 'Native development using Swift/Kotlin',
        url: 'https://developer.apple.com/swift',
        popularity: 7
      }
    ];
  }

  if (projectType === 'api') {
    return [
      {
        name: 'Express.js',
        description: 'Fast, unopinionated web framework for Node.js',
        url: 'https://expressjs.com',
        popularity: 9
      },
      {
        name: 'FastAPI',
        description: 'Modern, fast web framework for Python APIs',
        url: 'https://fastapi.tiangolo.com',
        popularity: 8
      },
      ...frameworks.filter(f => f.name === 'Spring Boot')
    ];
  }

  if (projectType === 'ml') {
    return [
      {
        name: 'TensorFlow',
        description: 'Open-source machine learning framework',
        url: 'https://www.tensorflow.org',
        popularity: 10
      },
      {
        name: 'PyTorch',
        description: 'Open source machine learning library',
        url: 'https://pytorch.org',
        popularity: 9
      },
      {
        name: 'scikit-learn',
        description: 'Machine learning library for Python',
        url: 'https://scikit-learn.org',
        popularity: 8
      }
    ];
  }

  return frameworks;
};

const getLibrariesByFeatures = (features: string[]) => {
  const libraryMap: Record<string, { name: string; purpose: string; url: string }> = {
    'Authentication': {
      name: 'Auth0',
      purpose: 'Authentication and authorization platform',
      url: 'https://auth0.com'
    },
    'Database Storage': {
      name: 'Prisma',
      purpose: 'Next-generation ORM for Node.js and TypeScript',
      url: 'https://www.prisma.io'
    },
    'API Integration': {
      name: 'Axios',
      purpose: 'Promise-based HTTP client',
      url: 'https://axios-http.com'
    },
    'Real-time Updates': {
      name: 'Socket.IO',
      purpose: 'Real-time bidirectional event-based communication',
      url: 'https://socket.io'
    },
    'File Upload': {
      name: 'Multer',
      purpose: 'Middleware for handling multipart/form-data',
      url: 'https://github.com/expressjs/multer'
    },
    'Search Functionality': {
      name: 'Elasticsearch',
      purpose: 'Distributed search and analytics engine',
      url: 'https://www.elastic.co'
    },
    'Analytics': {
      name: 'Google Analytics',
      purpose: 'Web analytics service',
      url: 'https://analytics.google.com'
    },
    'Payment Processing': {
      name: 'Stripe',
      purpose: 'Online payment processing',
      url: 'https://stripe.com'
    }
  };

  const additionalLibraries = [
    {
      name: 'Lodash',
      purpose: 'JavaScript utility library',
      url: 'https://lodash.com'
    },
    {
      name: 'Redis',
      purpose: 'In-memory data structure store',
      url: 'https://redis.io'
    },
    {
      name: 'Jest',
      purpose: 'JavaScript testing framework',
      url: 'https://jestjs.io'
    },
    {
      name: 'Docker',
      purpose: 'Containerization platform',
      url: 'https://www.docker.com'
    }
  ];

  const selectedLibraries = features
    .filter(feature => libraryMap[feature])
    .map(feature => libraryMap[feature]);
  
  // Add some general libraries
  return [...selectedLibraries, ...additionalLibraries.slice(0, 2)];
};

const getDeploymentByScalability = (scalability: string) => {
  switch (scalability) {
    case 'low':
      return [
        {
          name: 'Shared Hosting',
          description: 'Traditional web hosting with shared resources',
          costEstimate: '$5-20/month'
        },
        {
          name: 'Vercel',
          description: 'Platform for frontend frameworks and static sites',
          costEstimate: 'Free to $20+/month'
        },
        {
          name: 'Netlify',
          description: 'Platform for modern web projects',
          costEstimate: 'Free to $45+/month'
        }
      ];
    case 'medium':
      return [
        {
          name: 'AWS Elastic Beanstalk',
          description: 'Easy to use service for deploying and scaling web applications',
          costEstimate: '$20-100/month'
        },
        {
          name: 'Heroku',
          description: 'Cloud platform that lets you build, deliver, monitor and scale apps',
          costEstimate: '$25-500/month'
        },
        {
          name: 'Digital Ocean',
          description: 'Cloud infrastructure provider',
          costEstimate: '$5-200/month'
        }
      ];
    case 'high':
      return [
        {
          name: 'AWS ECS/EKS',
          description: 'Container orchestration services',
          costEstimate: '$100-1,000/month'
        },
        {
          name: 'Google Kubernetes Engine',
          description: 'Managed Kubernetes service',
          costEstimate: '$100-1,000/month'
        },
        {
          name: 'Azure App Service',
          description: 'Fully managed platform for building web apps',
          costEstimate: '$50-500/month'
        }
      ];
    case 'enterprise':
      return [
        {
          name: 'Multi-Cloud Kubernetes',
          description: 'Distributed across multiple cloud providers',
          costEstimate: '$1,000-10,000+/month'
        },
        {
          name: 'Custom Data Center',
          description: 'On-premise or colocation solutions',
          costEstimate: '$10,000+/month'
        },
        {
          name: 'AWS Global Accelerator + CloudFront',
          description: 'Global network and content delivery service',
          costEstimate: '$1,000-5,000+/month'
        }
      ];
    default:
      return [
        {
          name: 'AWS Elastic Beanstalk',
          description: 'Easy to use service for deploying and scaling web applications',
          costEstimate: '$20-100/month'
        },
        {
          name: 'Heroku',
          description: 'Cloud platform that lets you build, deliver, monitor and scale apps',
          costEstimate: '$25-500/month'
        },
        {
          name: 'Digital Ocean',
          description: 'Cloud infrastructure provider',
          costEstimate: '$5-200/month'
        }
      ];
  }
};

const getProsForPattern = (pattern: string) => {
  switch (pattern) {
    case 'Microservices':
      return [
        'Independent deployment of services',
        'Easier to scale specific components',
        'Technology diversity for different services',
        'Improved fault isolation',
        'Better aligned with business domains'
      ];
    case 'Monolithic MVC':
      return [
        'Simpler development process',
        'Easier to test and debug',
        'Less operational complexity',
        'Lower initial development costs',
        'Simplified deployment'
      ];
    case 'Clean Architecture':
      return [
        'Strong separation of concerns',
        'Highly testable code',
        'Independent of frameworks',
        'Independent of UI',
        'Independent of database'
      ];
    case 'Event-Driven Architecture':
      return [
        'Highly scalable and responsive',
        'Loose coupling between components',
        'Better real-time capabilities',
        'Easy to add new subscribers',
        'Improved resilience'
      ];
    default:
      return [
        'Modular and maintainable',
        'Scalable design',
        'Follows industry best practices',
        'Well-documented patterns',
        'Strong community support'
      ];
  }
};

const getConsForPattern = (pattern: string) => {
  switch (pattern) {
    case 'Microservices':
      return [
        'Increased operational complexity',
        'Network latency between services',
        'Data consistency challenges',
        'Higher initial development cost',
        'More difficult to debug across services'
      ];
    case 'Monolithic MVC':
      return [
        'Harder to scale as application grows',
        'Technology stack is fixed',
        'Reduced fault isolation',
        'More difficult to understand as size grows',
        'Harder to maintain over time'
      ];
    case 'Clean Architecture':
      return [
        'More boilerplate code initially',
        'Steeper learning curve',
        'Can be overkill for simple applications',
        'Requires discipline to maintain boundaries',
        'More initial planning required'
      ];
    case 'Event-Driven Architecture':
      return [
        'Eventual consistency challenges',
        'More difficult to test',
        'Harder to track event flows',
        'Potential for event storms',
        'Requires careful event design'
      ];
    default:
      return [
        'Implementation complexity',
        'Requires careful planning',
        'May need refactoring as requirements change',
        'Training required for team members',
        'Integration challenges with legacy systems'
      ];
  }
};
