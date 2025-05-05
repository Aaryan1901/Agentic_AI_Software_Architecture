// This service connects to LLMs for intelligent project searches
import { getGroqApiKey, getSerperApiKey, getTavilyApiKey, getGoogleApiKey } from '@/utils/apiKeys';

export interface SearchResult {
  title: string;
  summary: string;
  source: string;
  relevanceScore: number;
  url?: string;
}

// Model definitions for the LLMs we can use
export type LLMModel = 'deepseek-coder' | 'llama-3' | 'default' | 'groq';

export const searchProjectInformation = async (
  query: string, 
  model: LLMModel = 'default'
): Promise<SearchResult[]> => {
  console.log(`Searching for project information using ${model}:`, query);
  
  // Check if we have API keys for external services
  const groqApiKey = getGroqApiKey();
  const serperApiKey = getSerperApiKey();
  const tavilyApiKey = getTavilyApiKey();
  
  // If we have the GROQ API key and the model is groq, use the GROQ API
  if (groqApiKey && model === 'groq') {
    try {
      console.log("Using GROQ API for search...");
      return await searchWithGroq(query, groqApiKey);
    } catch (error) {
      console.error("Error with GROQ search:", error);
      // Fall back to default if there's an error
    }
  }
  
  // If we have Serper or Tavily API keys, try to use them for enhanced search results
  if (serperApiKey || tavilyApiKey) {
    try {
      if (serperApiKey) {
        console.log("Using Serper API for search...");
        return await searchWithSerper(query, serperApiKey);
      } else if (tavilyApiKey) {
        console.log("Using Tavily API for search...");
        return await searchWithTavily(query, tavilyApiKey);
      }
    } catch (error) {
      console.error("Error with external search API:", error);
      // Fall back to default if there's an error
    }
  }

  console.log("Using mock search data since no APIs are available or there were errors...");
  // Simulate network delay for the search operation when using mock data
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a production implementation, this would call an actual LLM API
  // For demonstration purposes, we're simulating different responses based on the model
  
  if (model === 'deepseek-coder') {
    return generateDeepseekCoderResults(query);
  } else if (model === 'llama-3') {
    return generateLlama3Results(query);
  } else {
    return generateDefaultResults(query);
  }
};

// Function to search using GROQ API
const searchWithGroq = async (query: string, apiKey: string): Promise<SearchResult[]> => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'You are a software architecture expert. Generate 3-5 search results about software architecture patterns and best practices related to the user query. Format each result with a title, summary, source, and relevance score between 0 and 1. Make the results highly relevant to the query.'
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error(`GROQ API request failed with status ${response.status}`);
  }

  const data = await response.json();
  
  try {
    // Parse the response content to extract search results
    const content = data.choices[0].message.content;
    console.log("GROQ API response:", content);
    
    // Simple parsing logic - in production you would want more robust parsing
    const results: SearchResult[] = [];
    const sections = content.split(/\n\n|\r\n\r\n/);
    
    for (const section of sections) {
      if (!section.trim()) continue;
      
      const titleMatch = section.match(/Title: (.+)/i);
      const summaryMatch = section.match(/Summary: (.+)/i);
      const sourceMatch = section.match(/Source: (.+)/i);
      const scoreMatch = section.match(/Relevance(?:\s+|)Score: ([0-9.]+)/i);
      const urlMatch = section.match(/URL: (.+)/i);
      
      if (titleMatch && summaryMatch) {
        results.push({
          title: titleMatch[1],
          summary: summaryMatch[1],
          source: sourceMatch ? sourceMatch[1] : 'GROQ AI Analysis',
          relevanceScore: scoreMatch ? parseFloat(scoreMatch[1]) : 0.9,
          url: urlMatch ? urlMatch[1] : undefined
        });
      }
    }
    
    if (results.length === 0) {
      // If parsing failed, create a default result with the content
      results.push({
        title: 'Architecture Analysis',
        summary: content.substring(0, 200) + '...',
        source: 'GROQ AI Analysis',
        relevanceScore: 0.85
      });
    }
    
    return results;
  } catch (error) {
    console.error("Error parsing GROQ results:", error);
    throw error;
  }
};

// Function to search using Serper API
const searchWithSerper = async (query: string, apiKey: string): Promise<SearchResult[]> => {
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: `software architecture patterns for ${query}`,
      num: 5
    })
  });

  if (!response.ok) {
    throw new Error(`Serper API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log("Serper API response:", data);
  
  const results: SearchResult[] = [];
  
  // Parse organic search results
  if (data.organic && Array.isArray(data.organic)) {
    data.organic.forEach((result: any, index: number) => {
      results.push({
        title: result.title,
        summary: result.snippet,
        source: result.source || result.domain || 'Google Search',
        relevanceScore: 0.95 - (index * 0.05),
        url: result.link
      });
    });
  }
  
  return results;
};

// Function to search using Tavily API
const searchWithTavily = async (query: string, apiKey: string): Promise<SearchResult[]> => {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify({
      query: `software architecture patterns for ${query}`,
      search_depth: 'advanced',
      max_results: 5
    })
  });

  if (!response.ok) {
    throw new Error(`Tavily API request failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log("Tavily API response:", data);
  
  const results: SearchResult[] = [];
  
  if (data.results && Array.isArray(data.results)) {
    data.results.forEach((result: any, index: number) => {
      results.push({
        title: result.title,
        summary: result.content.substring(0, 200) + '...',
        source: result.source || new URL(result.url).hostname,
        relevanceScore: 0.95 - (index * 0.05),
        url: result.url
      });
    });
  }
  
  return results;
};

// Generate results using simulated DeepSeek Coder model
const generateDeepseekCoderResults = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  
  // DeepSeek-coder specializes in code-related results
  if (queryLower.includes("web") || queryLower.includes("website") || queryLower.includes("webapp")) {
    results.push({
      title: "Modern Frontend Architecture with React and GraphQL",
      summary: "DeepSeek analysis of component-based architecture patterns using React, GraphQL, and state management solutions.",
      source: "DeepSeek Code Analysis Repository",
      relevanceScore: 0.97,
      url: "https://example.com/deepseek-web-architecture"
    });
    
    results.push({
      title: "Backend Service Design for Web Applications",
      summary: "Optimized service architecture for web backends with focus on microservices and API gateway patterns.",
      source: "DeepSeek Architecture Database",
      relevanceScore: 0.92,
      url: "https://example.com/deepseek-backend-design"
    });
  }
  
  if (queryLower.includes("ml") || queryLower.includes("machine learning") || queryLower.includes("ai")) {
    results.push({
      title: "ML Pipeline Implementation for Production Applications",
      summary: "Source code examples and architecture for production-grade machine learning pipelines with focus on MLOps.",
      source: "DeepSeek ML Engineering Resources",
      relevanceScore: 0.98,
      url: "https://example.com/deepseek-ml-pipelines"
    });
  }
  
  // Always add code-specific results
  results.push({
    title: "Code Repository Structure Best Practices",
    summary: "DeepSeek's analysis of optimal code organization for maintainability and collaboration.",
    source: "DeepSeek Code Architecture Guide",
    relevanceScore: 0.89,
    url: "https://example.com/deepseek-repo-structure"
  });
  
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// Generate results using simulated Llama-3 model
const generateLlama3Results = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  
  // Llama-3 provides broader knowledge with more focus on documentation
  if (queryLower.includes("web") || queryLower.includes("website") || queryLower.includes("webapp")) {
    results.push({
      title: "Web Application Architecture Trends 2025",
      summary: "Analysis of emerging architecture patterns for modern web applications including JAMstack and serverless.",
      source: "Llama Knowledge Database",
      relevanceScore: 0.96,
      url: "https://example.com/llama3-web-trends"
    });
  }
  
  if (queryLower.includes("mobile") || queryLower.includes("app") || queryLower.includes("ios") || queryLower.includes("android")) {
    results.push({
      title: "Cross-Platform vs. Native Mobile Architecture",
      summary: "Comprehensive comparison of architecture approaches for mobile application development with performance benchmarks.",
      source: "Llama Mobile Dev Insights",
      relevanceScore: 0.94,
      url: "https://example.com/llama3-mobile-architecture"
    });
  }
  
  // Add some ML-specific results
  if (queryLower.includes("ml") || queryLower.includes("machine learning") || queryLower.includes("ai")) {
    results.push({
      title: "Machine Learning Architecture for Enterprise Applications",
      summary: "Enterprise-grade ML system design with distributed training and inference optimization.",
      source: "Llama AI Systems Guide",
      relevanceScore: 0.98,
      url: "https://example.com/llama3-ml-enterprise"
    });
    
    results.push({
      title: "Data Pipeline Design for ML Training",
      summary: "Efficient data pipelines for ML model training with ETL best practices and optimization techniques.",
      source: "Llama Data Engineering Handbook",
      relevanceScore: 0.95,
      url: "https://example.com/llama3-data-pipelines"
    });
  }
  
  // Always include general architecture insights
  results.push({
    title: "System Design Principles for Scalable Applications",
    summary: "Foundational principles for designing highly scalable and resilient software architectures.",
    source: "Llama Systems Architecture Guide",
    relevanceScore: 0.90,
    url: "https://example.com/llama3-system-design"
  });
  
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// The original default search results
const generateDefaultResults = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  
  // Add results for web applications
  if (queryLower.includes("web") || queryLower.includes("website") || queryLower.includes("webapp")) {
    results.push({
      title: "Modern Web Application Architecture Patterns",
      summary: "Overview of current best practices for web application architecture including SPA, PWA, and serverless approaches.",
      source: "Web Development Journal",
      relevanceScore: 0.95,
      url: "https://example.com/web-architecture"
    });
  }
  
  // Add results for mobile applications
  if (queryLower.includes("mobile") || queryLower.includes("app") || queryLower.includes("ios") || queryLower.includes("android")) {
    results.push({
      title: "Mobile App Architecture: Native vs Cross-platform",
      summary: "Comparative analysis of native app development versus cross-platform frameworks like React Native and Flutter.",
      source: "Mobile Dev Weekly",
      relevanceScore: 0.92,
      url: "https://example.com/mobile-architecture"
    });
  }
  
  // Add results for specific features
  if (queryLower.includes("authentication") || queryLower.includes("auth") || queryLower.includes("login")) {
    results.push({
      title: "Authentication Strategies for Modern Applications",
      summary: "Comprehensive guide to implementing secure authentication including OAuth, JWT, and biometric options.",
      source: "Security Engineering Blog",
      relevanceScore: 0.88,
      url: "https://example.com/auth-patterns"
    });
  }
  
  if (queryLower.includes("payment") || queryLower.includes("ecommerce") || queryLower.includes("shop")) {
    results.push({
      title: "E-commerce Payment Processing Architecture",
      summary: "Best practices for implementing secure and scalable payment systems in e-commerce applications.",
      source: "Fintech Architecture Review",
      relevanceScore: 0.9,
      url: "https://example.com/payment-systems"
    });
  }
  
  // General architecture results for any query
  results.push({
    title: "Scalable Software Architecture Fundamentals",
    summary: "Core principles of building scalable software architectures that can handle growth and changing requirements.",
    source: "Software Architecture Journal",
    relevanceScore: 0.85,
    url: "https://example.com/scalable-architecture"
  });
  
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};
