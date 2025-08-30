export interface GroqResponse {
  projectName?: string;
  projectType?: string;
  description?: string;
  scale?: string;
  budget?: string;
  timeline?: string;
  security?: string;
  projectApproach?: string;
  developmentMethodology?: string;
  suggestions: string;
}

export class GroqService {
  private static readonly API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getProjectSuggestions(projectDescription: string): Promise<GroqResponse> {
    const prompt = `Based on this project description: "${projectDescription}"

Please provide suggestions for a software project in the following JSON format:
{
  "projectName": "suggested project name",
  "projectType": "webapp|mobile|api|data|ml|iot",
  "description": "improved project description",
  "scale": "low|medium|high|enterprise", 
  "budget": "suggested budget range",
  "timeline": "suggested timeline",
  "security": "security recommendations",
  "projectApproach": "Object Oriented|Procedural|Functional|Service-Oriented|Event-Driven",
  "developmentMethodology": "Agile|Waterfall|Spiral|Prototyping|DevOps|V-Model",
  "suggestions": "detailed explanation and recommendations"
}

Provide practical, realistic suggestions based on the project description. Be specific and helpful.`;

    try {
      const response = await fetch(GroqService.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful software architecture consultant. Always respond with valid JSON format as requested.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response content from Groq API');
      }

      // Parse JSON response
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        } else {
          // Fallback if JSON parsing fails
          return {
            suggestions: content
          };
        }
      } catch (parseError) {
        return {
          suggestions: content
        };
      }
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw error;
    }
  }
}