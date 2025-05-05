
export const formatProjectType = (type: string): string => {
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

export const formatScale = (scale: string): string => {
  const scales: Record<string, string> = {
    'small': 'Small (Hundreds of users)',
    'medium': 'Medium (Thousands of users)',
    'large': 'Large (Millions of users)'
  };
  return scales[scale] || scale;
};

// Define the DeploymentMetrics interface
export interface DeploymentMetrics {
  costEfficiency?: string;
  scalability?: string;
  complexity?: string;
}

// Define the DeploymentOption interface to include metrics
export interface DeploymentOption {
  name: string;
  description: string;
  costEstimate: string;
  metrics?: DeploymentMetrics;
}
