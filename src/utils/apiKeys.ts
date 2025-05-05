
// API Keys utility
// Note: In production, these should be stored in environment variables or a secure backend

// Store keys in localStorage with encryption for basic protection
const storeApiKey = (keyName: string, value: string): void => {
  if (!value) return;
  // Basic obfuscation (not actual encryption, just to avoid plain text)
  const obfuscated = btoa(value);
  localStorage.setItem(`designpanda_${keyName}`, obfuscated);
};

const getApiKey = (keyName: string): string | null => {
  const value = localStorage.getItem(`designpanda_${keyName}`);
  if (!value) return null;
  try {
    // Decode the obfuscated value
    return atob(value);
  } catch (e) {
    console.error('Failed to decode API key', e);
    return null;
  }
};

export const initializeApiKeys = (keys: Record<string, string>): void => {
  Object.entries(keys).forEach(([key, value]) => {
    if (value) {
      storeApiKey(key, value);
    }
  });
};

export const getGroqApiKey = (): string | null => getApiKey('GROQ_API_KEY');
export const getLangchainApiKey = (): string | null => getApiKey('LANGCHAIN_API_KEY');
export const getLangchainProject = (): string | null => getApiKey('LANGCHAIN_PROJECT');
export const getSerperApiKey = (): string | null => getApiKey('SERPER_API_KEY');
export const getGoogleApiKey = (): string | null => getApiKey('GOOGLE_API_KEY');
export const getTavilyApiKey = (): string | null => getApiKey('TAVILY_API_KEY');

export const API_KEYS = {
  GROQ_API_KEY: 'GROQ_API_KEY',
  LANGCHAIN_API_KEY: 'LANGCHAIN_API_KEY',
  LANGCHAIN_PROJECT: 'LANGCHAIN_PROJECT',
  SERPER_API_KEY: 'SERPER_API_KEY',
  GOOGLE_API_KEY: 'GOOGLE_API_KEY',
  TAVILY_API_KEY: 'TAVILY_API_KEY'
};
