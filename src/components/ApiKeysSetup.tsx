
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializeApiKeys, API_KEYS } from '@/utils/apiKeys';
import { toast } from 'sonner';

interface ApiKeysSetupProps {
  onComplete?: () => void;
}

const ApiKeysSetup = ({ onComplete }: ApiKeysSetupProps) => {
  const [apiKeys, setApiKeys] = useState({
    [API_KEYS.GROQ_API_KEY]: '',
    [API_KEYS.LANGCHAIN_API_KEY]: '',
    [API_KEYS.LANGCHAIN_PROJECT]: '',
    [API_KEYS.SERPER_API_KEY]: '',
    [API_KEYS.GOOGLE_API_KEY]: '',
    [API_KEYS.TAVILY_API_KEY]: '',
  });

  useEffect(() => {
    // Prefill with the provided API keys
    const prefilledKeys = {
      [API_KEYS.GROQ_API_KEY]: "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",
      [API_KEYS.LANGCHAIN_API_KEY]: "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",
      [API_KEYS.LANGCHAIN_PROJECT]: "langgraph-prerequisites",
      [API_KEYS.SERPER_API_KEY]: "6dd728c1740ec52e6cd4d36bebbdaa461998061d",
      [API_KEYS.GOOGLE_API_KEY]: "AIzaSyAqhsgKxPnwZkDFWua2nJT42ZRXYVHlL3M",
      [API_KEYS.TAVILY_API_KEY]: "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",
    };
    
    setApiKeys(prefilledKeys);
  }, []);

  const handleChange = (key: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSave = () => {
    try {
      initializeApiKeys(apiKeys);
      toast.success("API keys saved successfully!");
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error saving API keys", error);
      toast.error("Failed to save API keys");
    }
  };
  
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">API Keys Setup</CardTitle>
        <CardDescription>
          Configure your API keys to enable enhanced functionality in DesignPanda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(apiKeys).map(([key, value]) => (
          <div key={key} className="grid gap-2">
            <Label htmlFor={key}>{key.replace(/_/g, ' ')}</Label>
            <Input
              id={key}
              type="password"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={`Enter your ${key.replace(/_/g, ' ').toLowerCase()}`}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="gradient-btn w-full">
          Save API Keys
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeysSetup;
