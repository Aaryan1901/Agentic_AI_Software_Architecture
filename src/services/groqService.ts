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

    console.log('Making Groq API call with description:', projectDescription);
    console.log('Using API key:', this.apiKey ? 'API key is set' : 'NO API KEY');

    try {
      // Use a CORS proxy to handle the API call
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(GroqService.API_URL)}`;
      
      const requestBody = {
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
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response content from Groq API');
      }

      // Parse JSON response
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log('Parsed response:', parsed);
          return parsed;
        } else {
          // Fallback if JSON parsing fails
          console.log('Fallback response:', content);
          return {
            suggestions: content
          };
        }
      } catch (parseError) {
        console.error('JSON Parse error:', parseError);
        return {
          suggestions: content
        };
      }
    } catch (error) {
      console.error('Error calling Groq API:', error);
      
      // More specific error handling
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to Groq API. This might be a CORS issue or network connectivity problem.');
      } else if (error.message.includes('401')) {
        throw new Error('Authentication error: Please check your Groq API key.');
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded: Please try again later.');
      } else {
        throw error;
      }
    }
  }
}