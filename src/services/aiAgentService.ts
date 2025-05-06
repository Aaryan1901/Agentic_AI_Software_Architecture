
import { ProjectRequirements } from '@/components/RequirementsForm';
import { toast } from "sonner";

// Interface for the request to the Python backend
export interface AIAgentRequest {
  user_idea: string;
  project_type: string;
  project_description: string;
  scale: string;
  budget: string;
  project_duration: string;
  security_requirements: string;
  key_features: string[];
  additional_requirements: string;
}

// Interface for the response from the Python backend
export interface AIAgentResponse {
  architecture: string;
}

/**
 * Converts our frontend ProjectRequirements to the format expected by the AI agent backend
 */
export const convertToAIAgentRequest = (requirements: ProjectRequirements): AIAgentRequest => {
  // Map the project scale to the format expected by the backend
  const scaleMap: Record<string, string> = {
    'small': 'Small (Hundreds of users)',
    'medium': 'Medium (Thousands of users)',
    'large': 'Large (Millions of users)',
    'enterprise': 'Enterprise (Global scale)'
  };

  // Convert features array to strings if it's not already
  const features = requirements.features.map(feature => 
    typeof feature === 'string' ? feature : feature.toString()
  );

  return {
    user_idea: requirements.projectName,
    project_type: requirements.projectType,
    project_description: requirements.description || "No description provided",
    scale: scaleMap[requirements.scale] || requirements.scale,
    budget: requirements.budget || "Not specified",
    project_duration: requirements.timeConstraints || "Not specified", // Using timeConstraints instead of timeline
    security_requirements: requirements.security || "Standard security measures",
    key_features: features,
    additional_requirements: requirements.customRequirements || "None" // Using customRequirements instead of additionalRequirements
  };
};

/**
 * Sends project requirements to the AI agent backend and returns the architecture recommendation
 */
export const getAIAgentRecommendation = async (requirements: ProjectRequirements): Promise<string> => {
  try {
    // Convert requirements to the format expected by the backend
    const requestData = convertToAIAgentRequest(requirements);
    console.log("Sending to AI Agent backend:", requestData);
    
    // The URL of your local backend
    const BACKEND_URL = localStorage.getItem('backendUrl') || "http://localhost:8000";
    
    // Notify user about connecting to backend
    toast.info("Connecting to AI agent backend...");
    
    // Send request to the backend
    const response = await fetch(`${BACKEND_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json() as AIAgentResponse;
    console.log("Received from AI Agent backend:", data);
    
    toast.success("Architecture generated using AI agent backend");
    
    return data.architecture;
  } catch (error) {
    console.error("Error connecting to AI agent backend:", error);
    toast.error("Could not connect to AI backend. Using fallback architecture generation.");
    
    // Return null to indicate we should use fallback method
    return null;
  }
};
