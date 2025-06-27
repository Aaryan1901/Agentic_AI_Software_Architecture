
export interface DiagramOptions {
  type: 'flowchart' | 'usecase' | 'component' | 'sequence' | 'class';
  title: string;
  description?: string;
  elements?: string[];
  relationships?: DiagramRelationship[];
  actors?: string[];
}

export interface DiagramRelationship {
  from: string;
  to: string;
  label?: string;
  type?: 'association' | 'inheritance' | 'composition' | 'aggregation' | 'dependency';
}

export interface GeneratedDiagram {
  plantUmlCode: string;
  svgContent: string;
  diagramType: string;
}

// This service would connect to an LLM API in production
// Currently implemented with pre-defined templates for demonstration
export const generateDiagramFromRequirements = async (
  requirements: any, 
  options: DiagramOptions
): Promise<GeneratedDiagram> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("Generating diagram:", options.type);
  
  let plantUmlCode = '';
  let svgContent = '';
  
  switch (options.type) {
    case 'flowchart':
      return generateFlowchartDiagram(requirements, options);
    case 'usecase':
      return generateUseCaseDiagram(requirements, options);
    case 'component':
      return generateComponentDiagram(requirements, options);
    case 'sequence':
      return generateSequenceDiagram(requirements, options);
    case 'class':
      return generateClassDiagram(requirements, options);
    default:
      return generateFlowchartDiagram(requirements, options);
  }
};

// Generate a flowchart diagram based on project requirements
const generateFlowchartDiagram = (requirements: any, options: DiagramOptions): GeneratedDiagram => {
  // Dynamic generation based on project type
  let plantUmlCode = `@startuml
!theme plain
skinparam BackgroundColor transparent
skinparam componentStyle rectangle

title ${options.title || 'System Flow Diagram'}

start
if (User Authentication?) then (yes)
  :Authenticate User;
  if (Valid Credentials?) then (yes)
    :Load User Profile;
  else (no)
    :Show Error Message;
    stop
  endif
else (no)
  :Continue as Guest;
endif

:Process Request;

`;

  // Add elements based on project features
  if (requirements.features && requirements.features.includes('Database Storage')) {
    plantUmlCode += `:Store Data in Database;
`;
  }

  if (requirements.features && requirements.features.includes('API Integration')) {
    plantUmlCode += `:Call External API;
:Process API Response;
`;
  }

  if (requirements.features && requirements.features.includes('File Upload')) {
    plantUmlCode += `:Upload File;
:Process File;
`;
  }

  plantUmlCode += `:Return Response;
stop

@enduml`;

  // This would be actual SVG in production, generated from the PlantUML code
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="none" />
    <text x="300" y="30" text-anchor="middle" font-size="16" font-weight="bold">${options.title || 'System Flow Diagram'}</text>
    <rect x="250" y="50" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="80" text-anchor="middle" fill="white">Start</text>
    <path d="M300,100 L300,130" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
    <rect x="250" y="130" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="160" text-anchor="middle" fill="white">Process Request</text>
    <path d="M300,180 L300,210" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
    <rect x="250" y="210" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="240" text-anchor="middle" fill="white">Return Response</text>
    <path d="M300,260 L300,290" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
    <rect x="250" y="290" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="320" text-anchor="middle" fill="white">Stop</text>
  </svg>`;

  return {
    plantUmlCode,
    svgContent,
    diagramType: 'flowchart'
  };
};

// Generate a use case diagram based on project requirements
const generateUseCaseDiagram = (requirements: any, options: DiagramOptions): GeneratedDiagram => {
  let actors = options.actors || ['User', 'Admin', 'System'];
  let useCases: string[] = [];
  
  // Generate use cases based on features
  if (requirements.features) {
    if (requirements.features.includes('Authentication')) {
      useCases.push('Login');
      useCases.push('Register');
      useCases.push('Reset Password');
    }
    
    if (requirements.features.includes('Database Storage')) {
      useCases.push('Store Data');
      useCases.push('Retrieve Data');
      useCases.push('Update Data');
    }
    
    if (requirements.features.includes('File Upload')) {
      useCases.push('Upload File');
      useCases.push('Download File');
    }
    
    if (requirements.features.includes('API Integration')) {
      useCases.push('Connect to External API');
    }
    
    if (requirements.features.includes('Search Functionality')) {
      useCases.push('Search Content');
    }
  }
  
  // Default use cases if none are generated
  if (useCases.length === 0) {
    useCases = ['Use System', 'View Dashboard', 'Manage Settings'];
  }
  
  // Generate PlantUML code
  let plantUmlCode = `@startuml
!theme plain
skinparam BackgroundColor transparent
skinparam actorStyle awesome

title ${options.title || 'Use Case Diagram'}

`;

  // Add actors
  actors.forEach(actor => {
    plantUmlCode += `actor "${actor}" as ${actor.replace(/\s/g, '')}\n`;
  });
  
  plantUmlCode += '\n';
  
  // Add use cases
  useCases.forEach(useCase => {
    plantUmlCode += `usecase "${useCase}" as ${useCase.replace(/\s/g, '')}\n`;
  });
  
  plantUmlCode += '\n';
  
  // Add relationships
  if (actors.includes('User')) {
    useCases.forEach(useCase => {
      plantUmlCode += `User --> ${useCase.replace(/\s/g, '')}\n`;
    });
  }
  
  if (actors.includes('Admin')) {
    plantUmlCode += `Admin --> ${useCases[0].replace(/\s/g, '')}\n`;
    if (useCases.length > 2) {
      plantUmlCode += `Admin --> ${useCases[2].replace(/\s/g, '')}\n`;
    }
  }
  
  plantUmlCode += '@enduml';

  // This would be actual SVG in production, generated from the PlantUML code
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="none" />
    <text x="300" y="30" text-anchor="middle" font-size="16" font-weight="bold">${options.title || 'Use Case Diagram'}</text>
    
    <!-- Actor: User -->
    <circle cx="100" cy="100" r="20" fill="#60a5fa" stroke="#3b82f6" />
    <line x1="100" y1="120" x2="100" y2="170" stroke="#3b82f6" stroke-width="2" />
    <line x1="70" y1="140" x2="130" y2="140" stroke="#3b82f6" stroke-width="2" />
    <line x1="100" y1="170" x2="70" y2="200" stroke="#3b82f6" stroke-width="2" />
    <line x1="100" y1="170" x2="130" y2="200" stroke="#3b82f6" stroke-width="2" />
    <text x="100" y="230" text-anchor="middle">User</text>
    
    <!-- Actor: Admin -->
    <circle cx="500" cy="100" r="20" fill="#60a5fa" stroke="#3b82f6" />
    <line x1="500" y1="120" x2="500" y2="170" stroke="#3b82f6" stroke-width="2" />
    <line x1="470" y1="140" x2="530" y2="140" stroke="#3b82f6" stroke-width="2" />
    <line x1="500" y1="170" x2="470" y2="200" stroke="#3b82f6" stroke-width="2" />
    <line x1="500" y1="170" x2="530" y2="200" stroke="#3b82f6" stroke-width="2" />
    <text x="500" y="230" text-anchor="middle">Admin</text>
    
    <!-- Use Cases -->
    <ellipse cx="300" cy="120" rx="80" ry="30" fill="#93c5fd" stroke="#3b82f6" />
    <text x="300" y="125" text-anchor="middle">Login</text>
    
    <ellipse cx="300" cy="200" rx="80" ry="30" fill="#93c5fd" stroke="#3b82f6" />
    <text x="300" y="205" text-anchor="middle">Store Data</text>
    
    <ellipse cx="300" cy="280" rx="80" ry="30" fill="#93c5fd" stroke="#3b82f6" />
    <text x="300" y="285" text-anchor="middle">Search Content</text>
    
    <!-- Lines connecting actors to use cases -->
    <line x1="120" y1="100" x2="220" y2="120" stroke="#94a3b8" stroke-width="1" />
    <line x1="120" y1="140" x2="220" y2="200" stroke="#94a3b8" stroke-width="1" />
    <line x1="120" y1="180" x2="220" y2="280" stroke="#94a3b8" stroke-width="1" />
    
    <line x1="480" y1="100" x2="380" y2="120" stroke="#94a3b8" stroke-width="1" />
    <line x1="480" y1="180" x2="380" y2="280" stroke="#94a3b8" stroke-width="1" />
  </svg>`;

  return {
    plantUmlCode,
    svgContent,
    diagramType: 'usecase'
  };
};

// Generate a component diagram based on project requirements
const generateComponentDiagram = (requirements: any, options: DiagramOptions): GeneratedDiagram => {
  // Simple component diagram based on project type
  let components: string[] = [];
  
  // Base components
  components.push('Frontend');
  components.push('Backend');
  
  // Add components based on project type
  if (requirements.projectType === 'webapp') {
    components.push('Web Server');
    components.push('Browser Client');
  } else if (requirements.projectType === 'mobile') {
    components.push('Mobile Client');
    components.push('API Gateway');
  } else if (requirements.projectType === 'ml') {
    components.push('Data Pipeline');
    components.push('Training Service');
    components.push('Inference Service');
  }
  
  // Add components based on features
  if (requirements.features) {
    if (requirements.features.includes('Authentication')) {
      components.push('Auth Service');
    }
    
    if (requirements.features.includes('Database Storage')) {
      components.push('Database');
    }
    
    if (requirements.features.includes('File Upload')) {
      components.push('Storage Service');
    }
  }
  
  // Generate PlantUML code
  let plantUmlCode = `@startuml
!theme plain
skinparam BackgroundColor transparent
skinparam componentStyle rectangle

title ${options.title || 'Component Diagram'}

`;

  // Add components
  components.forEach(component => {
    plantUmlCode += `[${component}]\n`;
  });
  
  plantUmlCode += '\n';
  
  // Add relationships
  if (components.includes('Browser Client')) {
    plantUmlCode += `[Browser Client] --> [Frontend]\n`;
  }
  
  if (components.includes('Mobile Client')) {
    plantUmlCode += `[Mobile Client] --> [API Gateway]\n`;
    plantUmlCode += `[API Gateway] --> [Backend]\n`;
  } else {
    plantUmlCode += `[Frontend] --> [Backend]\n`;
  }
  
  if (components.includes('Auth Service')) {
    plantUmlCode += `[Backend] --> [Auth Service]\n`;
  }
  
  if (components.includes('Database')) {
    plantUmlCode += `[Backend] --> [Database]\n`;
  }
  
  if (components.includes('Storage Service')) {
    plantUmlCode += `[Backend] --> [Storage Service]\n`;
  }
  
  if (components.includes('Data Pipeline')) {
    plantUmlCode += `[Backend] --> [Data Pipeline]\n`;
    plantUmlCode += `[Data Pipeline] --> [Training Service]\n`;
    plantUmlCode += `[Training Service] --> [Inference Service]\n`;
  }
  
  plantUmlCode += '@enduml';

  // This would be actual SVG in production, generated from the PlantUML code
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="none" />
    <text x="300" y="30" text-anchor="middle" font-size="16" font-weight="bold">${options.title || 'Component Diagram'}</text>
    
    <!-- Components -->
    <rect x="250" y="50" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="80" text-anchor="middle" fill="white">Frontend</text>
    
    <rect x="250" y="150" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="180" text-anchor="middle" fill="white">Backend</text>
    
    <rect x="100" y="150" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="150" y="180" text-anchor="middle" fill="white">Auth Service</text>
    
    <rect x="400" y="150" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="450" y="180" text-anchor="middle" fill="white">Storage Service</text>
    
    <rect x="250" y="250" width="100" height="50" rx="5" fill="#60a5fa" stroke="#3b82f6" />
    <text x="300" y="280" text-anchor="middle" fill="white">Database</text>
    
    <!-- Connections -->
    <path d="M300,100 L300,150" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M250,175 L200,175" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M350,175 L400,175" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
    <path d="M300,200 L300,250" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />
  </svg>`;

  return {
    plantUmlCode,
    svgContent,
    diagramType: 'component'
  };
};

// Generate a sequence diagram based on project requirements
const generateSequenceDiagram = (requirements: any, options: DiagramOptions): GeneratedDiagram => {
  // Build sequence diagram based on project type
  let plantUmlCode = `@startuml
!theme plain
skinparam BackgroundColor transparent

title ${options.title || 'Sequence Diagram'}

actor User
participant "Frontend" as FE
participant "Backend" as BE
`;

  // Add additional participants based on features
  if (requirements.features) {
    if (requirements.features.includes('Authentication')) {
      plantUmlCode += 'participant "Auth Service" as AUTH\n';
    }
    
    if (requirements.features.includes('Database Storage')) {
      plantUmlCode += 'database "Database" as DB\n';
    }

    if (requirements.features.includes('API Integration')) {
      plantUmlCode += 'participant "External API" as API\n';
    }
  }

  plantUmlCode += '\n';
  
  // Basic flow
  plantUmlCode += `User -> FE: Request
FE -> BE: API Call
`;

  // Add sequence based on features
  if (requirements.features) {
    if (requirements.features.includes('Authentication')) {
      plantUmlCode += `BE -> AUTH: Validate Token
AUTH --> BE: Token Valid
`;
    }
    
    if (requirements.features.includes('Database Storage')) {
      plantUmlCode += `BE -> DB: Query Data
DB --> BE: Return Data
`;
    }

    if (requirements.features.includes('API Integration')) {
      plantUmlCode += `BE -> API: External Request
API --> BE: Response
`;
    }
  }

  // Complete the sequence
  plantUmlCode += `BE --> FE: Response
FE --> User: Display Result
`;

  plantUmlCode += '@enduml';

  // This would be actual SVG in production, generated from the PlantUML code
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 700 400">
    <rect width="100%" height="100%" fill="none" />
    <text x="350" y="30" text-anchor="middle" font-size="16" font-weight="bold">${options.title || 'Sequence Diagram'}</text>
    
    <!-- Participants -->
    <circle cx="100" cy="70" r="20" fill="#60a5fa" stroke="#3b82f6" />
    <line x1="100" y1="90" x2="100" y2="350" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" />
    <text x="100" y="110" text-anchor="middle">User</text>
    
    <rect x="230" y="50" width="80" height="30" fill="#60a5fa" stroke="#3b82f6" />
    <line x1="270" y1="80" x2="270" y2="350" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" />
    <text x="270" y="70" text-anchor="middle" fill="white">Frontend</text>
    
    <rect x="390" y="50" width="80" height="30" fill="#60a5fa" stroke="#3b82f6" />
    <line x1="430" y1="80" x2="430" y2="350" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" />
    <text x="430" y="70" text-anchor="middle" fill="white">Backend</text>
    
    <rect x="550" y="50" width="80" height="30" fill="#60a5fa" stroke="#3b82f6" />
    <line x1="590" y1="80" x2="590" y2="350" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4" />
    <text x="590" y="70" text-anchor="middle" fill="white">Database</text>
    
    <!-- Messages -->
    <line x1="100" y1="140" x2="270" y2="140" stroke="#000" stroke-width="1" marker-end="url(#arrow)" />
    <text x="185" y="135" text-anchor="middle" font-size="12">Request</text>
    
    <line x1="270" y1="180" x2="430" y2="180" stroke="#000" stroke-width="1" marker-end="url(#arrow)" />
    <text x="350" y="175" text-anchor="middle" font-size="12">API Call</text>
    
    <line x1="430" y1="220" x2="590" y2="220" stroke="#000" stroke-width="1" marker-end="url(#arrow)" />
    <text x="510" y="215" text-anchor="middle" font-size="12">Query Data</text>
    
    <line x1="590" y1="260" x2="430" y2="260" stroke="#000" stroke-width="1" stroke-dasharray="2" marker-end="url(#arrow)" />
    <text x="510" y="255" text-anchor="middle" font-size="12">Return Data</text>
    
    <line x1="430" y1="300" x2="270" y2="300" stroke="#000" stroke-width="1" stroke-dasharray="2" marker-end="url(#arrow)" />
    <text x="350" y="295" text-anchor="middle" font-size="12">Response</text>
    
    <line x1="270" y1="340" x2="100" y2="340" stroke="#000" stroke-width="1" stroke-dasharray="2" marker-end="url(#arrow)" />
    <text x="185" y="335" text-anchor="middle" font-size="12">Display Result</text>
  </svg>`;

  return {
    plantUmlCode,
    svgContent,
    diagramType: 'sequence'
  };
};

// Generate a class diagram based on project requirements
const generateClassDiagram = (requirements: any, options: DiagramOptions): GeneratedDiagram => {
  // Generate a class diagram based on project type
  let plantUmlCode = `@startuml
!theme plain
skinparam BackgroundColor transparent

title ${options.title || 'Class Diagram'}

`;

  // Add basic classes
  plantUmlCode += `class User {
  +id: String
  +name: String
  +email: String
  +login(): Boolean
  +logout(): void
}

class Application {
  +version: String
  +initialize(): void
  +shutdown(): void
}

`;

  // Add classes based on project type
  if (requirements.projectType === 'webapp') {
    plantUmlCode += `class WebPage {
  +url: String
  +title: String
  +render(): void
}

class ApiClient {
  +baseUrl: String
  +get(path: String): Response
  +post(path: String, data: Object): Response
}

User "1" -- "*" WebPage: views
Application "1" -- "1..*" WebPage: contains
Application "1" -- "1" ApiClient: uses
`;
  } else if (requirements.projectType === 'mobile') {
    plantUmlCode += `class Screen {
  +name: String
  +render(): void
  +navigate(to: Screen): void
}

class ApiClient {
  +baseUrl: String
  +get(path: String): Response
  +post(path: String, data: Object): Response
}

User "1" -- "*" Screen: interacts with
Application "1" -- "1..*" Screen: contains
Application "1" -- "1" ApiClient: uses
`;
  } else if (requirements.projectType === 'ml') {
    plantUmlCode += `class Model {
  +name: String
  +version: String
  +train(data: Dataset): void
  +predict(input: Input): Prediction
}

class Dataset {
  +name: String
  +features: List<Feature>
  +labels: List<Label>
  +load(): void
  +split(): TrainTestSplit
}

class Pipeline {
  +steps: List<Step>
  +execute(): Result
}

User "1" -- "*" Model: uses
Application "1" -- "1..*" Model: runs
Model "1" -- "1..*" Dataset: trained on
Application "1" -- "1" Pipeline: executes
`;
  }

  // Add classes based on features
  if (requirements.features) {
    if (requirements.features.includes('Authentication')) {
      plantUmlCode += `class AuthService {
  +login(credentials: Credentials): Token
  +register(user: User): Result
  +validateToken(token: String): Boolean
}

User "1" -- "1" AuthService: authenticates through
Application "1" -- "1" AuthService: uses
`;
    }
    
    if (requirements.features.includes('Database Storage')) {
      plantUmlCode += `class Database {
  +connection: Connection
  +connect(): Boolean
  +query(sql: String): Result
  +close(): void
}

class Repository {
  +find(id: String): Entity
  +findAll(): List<Entity>
  +save(entity: Entity): Entity
  +delete(id: String): Boolean
}

Application "1" -- "1" Database: connects to
Repository "1" -- "1" Database: uses
`;
    }
  }

  plantUmlCode += '@enduml';

  // This would be actual SVG in production, generated from the PlantUML code
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 700 500">
    <rect width="100%" height="100%" fill="none" />
    <text x="350" y="30" text-anchor="middle" font-size="16" font-weight="bold">${options.title || 'Class Diagram'}</text>
    
    <!-- User class -->
    <rect x="100" y="50" width="150" height="120" fill="#93c5fd" stroke="#3b82f6" />
    <line x1="100" y1="80" x2="250" y2="80" stroke="#3b82f6" />
    <line x1="100" y1="150" x2="250" y2="150" stroke="#3b82f6" />
    <text x="175" y="70" text-anchor="middle" font-weight="bold">User</text>
    <text x="110" y="100" font-size="12">+id: String</text>
    <text x="110" y="120" font-size="12">+name: String</text>
    <text x="110" y="140" font-size="12">+email: String</text>
    <text x="110" y="170" font-size="12">+login(): Boolean</text>
    
    <!-- Application class -->
    <rect x="400" y="50" width="150" height="100" fill="#93c5fd" stroke="#3b82f6" />
    <line x1="400" y1="80" x2="550" y2="80" stroke="#3b82f6" />
    <line x1="400" y1="120" x2="550" y2="120" stroke="#3b82f6" />
    <text x="475" y="70" text-anchor="middle" font-weight="bold">Application</text>
    <text x="410" y="100" font-size="12">+version: String</text>
    <text x="410" y="140" font-size="12">+initialize(): void</text>
    
    <!-- WebPage class -->
    <rect x="400" y="220" width="150" height="100" fill="#93c5fd" stroke="#3b82f6" />
    <line x1="400" y1="250" x2="550" y2="250" stroke="#3b82f6" />
    <line x1="400" y1="290" x2="550" y2="290" stroke="#3b82f6" />
    <text x="475" y="240" text-anchor="middle" font-weight="bold">WebPage</text>
    <text x="410" y="270" font-size="12">+url: String</text>
    <text x="410" y="310" font-size="12">+render(): void</text>
    
    <!-- Repository class -->
    <rect x="100" y="220" width="150" height="110" fill="#93c5fd" stroke="#3b82f6" />
    <line x1="100" y1="250" x2="250" y2="250" stroke="#3b82f6" />
    <line x1="100" y1="270" x2="250" y2="270" stroke="#3b82f6" />
    <text x="175" y="240" text-anchor="middle" font-weight="bold">Repository</text>
    <text x="110" y="290" font-size="12">+find(id: String): Entity</text>
    <text x="110" y="310" font-size="12">+findAll(): List&lt;Entity&gt;</text>
    
    <!-- Connections -->
    <path d="M250,110 L400,110" stroke="#94a3b8" stroke-width="1" />
    <path d="M175,170 L175,220" stroke="#94a3b8" stroke-width="1" />
    <path d="M475,150 L475,220" stroke="#94a3b8" stroke-width="1" />
  </svg>`;

  return {
    plantUmlCode,
    svgContent,
    diagramType: 'class'
  };
};
