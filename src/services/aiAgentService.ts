import { ProjectRequirements } from '@/components/RequirementsForm';
import { toast } from "sonner";

export interface AIAgentRequest {
  user_idea: string;
  hospital_name: string;
  hospital_type: string;
  project_description: string;
  hospital_size: string;
  budget: string;
  project_duration: number;
  compliance_requirements: string;
  key_modules: string[];
  additional_requirements: string;
}

export interface BackendResponse {
  architecture: string;
  uml_code: string;
  image_data: string;  // base64 encoded image (may be empty)
  mime_type: string;   // e.g. "image/png" or empty
}

export interface BackendError {
  detail?: string;
  error?: string;
  message?: string;
}

export const convertToAIAgentRequest = (requirements: ProjectRequirements): AIAgentRequest => {
  const sizeMap: Record<string, string> = {
    'small': 'Small Clinic',
    'medium': 'Medium Hospital',
    'large': 'Large Hospital',
    'enterprise': 'Multi-facility Healthcare System'
  };

  const duration = requirements.timeline 
    ? parseInt(requirements.timeline) 
    : 12; // default 12 months for hospital systems

  return {
    user_idea: requirements.hospitalName,
    hospital_name: requirements.hospitalName,
    hospital_type: requirements.hospitalType,
    project_description: requirements.description || "No description provided",
    hospital_size: sizeMap[requirements.hospitalSize] || requirements.hospitalSize,
    budget: requirements.budget || "Not specified",
    project_duration: duration,
    compliance_requirements: requirements.complianceRequirements || "HIPAA compliance required",
    key_modules: requirements.selectedModules,
    additional_requirements: `Patient Capacity: ${requirements.patientCapacity}, Departments: ${requirements.departmentCount}, Staff Size: ${requirements.staffSize}`
  };
};

export const getAIAgentRecommendation = async (
  requirements: ProjectRequirements
): Promise<BackendResponse | null> => {
  try {
    const requestData = convertToAIAgentRequest(requirements);
    console.log("Sending to AI Agent backend:", requestData);
    
    const BACKEND_URL = localStorage.getItem('backendUrl') || "http://127.0.0.1:8000";
    
    toast.info("Connecting to AI agent backend...");
    
    const response = await fetch(`${BACKEND_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      const errorData: BackendError = await response.json().catch(() => ({}));
      console.error("Backend error response:", errorData);
      
      // Special handling for PlantUML errors
      if (errorData.detail?.includes('PlantUML')) {
        const partialResponse = await response.json();
        toast.warning("Diagram generation failed, but architecture was created");
        return {
          ...partialResponse,
          image_data: "",
          mime_type: ""
        };
      }
      
      throw new Error(errorData.detail || `Backend error: ${response.status}`);
    }
    
    const data: BackendResponse = await response.json();
    
    // Handle case where architecture was generated but image failed
    if ((!data.image_data || data.image_data === "") && data.architecture && data.uml_code) {
      toast.warning("Architecture created but diagram generation failed");
      return {
        ...data,
        image_data: "",
        mime_type: ""
      };
    }
    
    if (!data.architecture || !data.uml_code) {
      throw new Error("Invalid response format from backend");
    }
    
    toast.success("Architecture generated successfully");
    return data;
    
  } catch (error) {
    console.error("Error connecting to AI agent backend:", error);
    
    let errorMessage = "Could not connect to AI backend";
    if (error instanceof Error) {
      errorMessage = error.message;
      // Special handling for PlantUML errors
      if (error.message.includes('PlantUML')) {
        errorMessage = "Diagram generation failed (but architecture was created)";
      }
    }
    
    toast.error(`${errorMessage}. Using fallback method...`);
    return null;
  }
};