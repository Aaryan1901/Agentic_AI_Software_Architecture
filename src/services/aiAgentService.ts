
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
    'low': 'Small (Hundreds of users)',
    'medium': 'Medium (Thousands of users)',
    'high': 'Large (Millions of users)',
    'enterprise': 'Enterprise (Global scale)'
  };

  return {
    user_idea: requirements.projectName,
    project_type: requirements.projectType,
    project_description: requirements.description || "No description provided",
    scale: scaleMap[requirements.scale] || requirements.scale,
    budget: requirements.budget || "Not specified",
    project_duration: requirements.timeline || "Not specified",
    security_requirements: requirements.security || "Standard security measures",
    key_features: requirements.features || [],
    additional_requirements: requirements.additionalRequirements || "None"
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
    
    // The URL of your FastAPI backend
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
    
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
    
    return data.architecture;
  } catch (error) {
    console.error("Error connecting to AI agent backend:", error);
    toast.error("Could not connect to AI backend. Using fallback architecture generation.");
    
    // Return null to indicate we should use fallback method
    return null;
  }
};
