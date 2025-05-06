
export const formatProjectType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'web': 'Web Application',
    'webapp': 'Web Application',
    'mobile': 'Mobile Application',
    'api': 'API Service',
    'desktop': 'Desktop Application',
    'ai': 'AI/ML System',
    'iot': 'IoT System',
    'data': 'Data Pipeline',
    'ml': 'Machine Learning Project'
  };
  
  return typeMap[type] || type;
};

export const formatScale = (scale?: string): string => {
  const scaleMap: Record<string, string> = {
    'small': 'Small (Hundreds of users)',
    'low': 'Small (Hundreds of users)',
    'medium': 'Medium (Thousands of users)',
    'high': 'Large (Millions of users)',
    'enterprise': 'Enterprise (Global scale)'
  };
  
  return scale ? (scaleMap[scale] || scale) : 'Medium (Thousands of users)';
};

export interface DeploymentMetrics {
  performance: number;
  scalability: number;
  cost: number;
  maintenance: number;
  security: number;
  costEfficiency?: string;
  complexity?: string;
}

export interface DeploymentOption {
  name: string;
  description: string;
  costEstimate: string;
  metrics?: DeploymentMetrics;
}

export interface BackendResponse {
  architecture: string;
  uml_code?: string;
  image_data?: string;
  mime_type?: string;
}

export const generateDeploymentMetrics = (option: string): DeploymentMetrics => {
  // Generate some metrics based on the deployment option
  switch(option.toLowerCase()) {
    case 'aws elastic beanstalk':
      return {
        performance: 80,
        scalability: 85,
        cost: 60,
        maintenance: 75,
        security: 80
      };
    case 'heroku':
      return {
        performance: 75,
        scalability: 70,
        cost: 65,
        maintenance: 85,
        security: 75
      };
    case 'digital ocean':
      return {
        performance: 70,
        scalability: 75,
        cost: 80,
        maintenance: 70,
        security: 70
      };
    case 'aws ecs/eks':
      return {
        performance: 90,
        scalability: 95,
        cost: 50,
        maintenance: 60,
        security: 85
      };
    case 'google kubernetes engine':
      return {
        performance: 85,
        scalability: 90,
        cost: 55,
        maintenance: 65,
        security: 80
      };
    case 'azure app service':
      return {
        performance: 80,
        scalability: 80,
        cost: 60,
        maintenance: 75,
        security: 80
      };
    case 'vercel':
      return {
        performance: 85,
        scalability: 75,
        cost: 70,
        maintenance: 90,
        security: 75
      };
    case 'netlify':
      return {
        performance: 80,
        scalability: 70,
        cost: 75,
        maintenance: 90,
        security: 70
      };
    default:
      return {
        performance: 70,
        scalability: 70,
        cost: 70,
        maintenance: 70,
        security: 70
      };
  }
};
