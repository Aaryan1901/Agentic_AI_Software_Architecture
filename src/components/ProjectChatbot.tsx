import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GroqService, GroqResponse } from '@/services/groqService';
import { Bot, User, Loader2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  suggestions?: GroqResponse;
  timestamp: Date;
}

interface ProjectChatbotProps {
  initialDescription?: string;
  onSuggestionsReceived?: (suggestions: GroqResponse) => void;
}

const ProjectChatbot = ({ initialDescription, onSuggestionsReceived }: ProjectChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [groqService, setGroqService] = useState<GroqService | null>(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([{
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m your Healthcare IT assistant. I specialize in hospital management systems and can help you plan your healthcare technology implementation. Please enter your Groq API key first, then describe your hospital\'s requirements!',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    if (initialDescription && groqService) {
      handleGetSuggestions(initialDescription);
    }
  }, [initialDescription, groqService]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setGroqService(new GroqService(apiKey));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Great! API key set. Now tell me about your hospital or clinic and I\'ll provide tailored suggestions for your management system.',
        timestamp: new Date()
      }]);
    }
  };

  const handleGetSuggestions = async (description: string) => {
    if (!groqService) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Please set your Groq API key first.',
        timestamp: new Date()
      }]);
      return;
    }

    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: description,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const suggestions = await groqService.getHospitalSystemSuggestions(description);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: suggestions.suggestions || 'Here are my suggestions for your hospital management system:',
        suggestions,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      if (onSuggestionsReceived) {
        onSuggestionsReceived(suggestions);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Error: ${errorMessage}. Please check your API key and try again.`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="bg-gradient-to-r from-architect-light to-architect text-white">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Hospital Management System Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        {!groqService && (
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-sm mb-2">Enter your Groq API Key:</p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="gsk_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit} size="sm">
                Set Key
              </Button>
            </div>
          </div>
        )}
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-3 pt-3 border-t border-muted-foreground/20">
                        <div className="space-y-2 text-xs">
                          {message.suggestions.hospitalName && (
                            <div><strong>Hospital Name:</strong> {message.suggestions.hospitalName}</div>
                          )}
                          {message.suggestions.hospitalType && (
                            <div><strong>Type:</strong> {message.suggestions.hospitalType}</div>
                          )}
                          {message.suggestions.hospitalSize && (
                            <div><strong>Size:</strong> {message.suggestions.hospitalSize}</div>
                          )}
                          {message.suggestions.systemArchitecture && (
                            <div><strong>Architecture:</strong> {message.suggestions.systemArchitecture}</div>
                          )}
                          {message.suggestions.implementationApproach && (
                            <div><strong>Implementation:</strong> {message.suggestions.implementationApproach}</div>
                          )}
                          {message.suggestions.patientCapacity && (
                            <div><strong>Patient Capacity:</strong> {message.suggestions.patientCapacity}</div>
                          )}
                          {message.suggestions.complianceRequirements && (
                            <div><strong>Compliance:</strong> {message.suggestions.complianceRequirements}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProjectChatbot;