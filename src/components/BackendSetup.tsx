
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BackendSetup: React.FC = () => {
  const [backendUrl, setBackendUrl] = useState<string>(() => {
    return localStorage.getItem('backendUrl') || 'http://localhost:8000';
  });
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if we can connect to the backend on component mount
    checkConnection();
  }, []);
  
  const saveBackendUrl = () => {
    localStorage.setItem('backendUrl', backendUrl);
    toast.success("Backend URL saved");
    checkConnection();
  };
  
  const checkConnection = async () => {
    try {
      const url = localStorage.getItem('backendUrl') || 'http://localhost:8000';
      
      // First try a simple GET request to the root endpoint
      toast.info("Testing connection to backend...");
      
      const response = await fetch(`${url}/`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setIsConnected(true);
        toast.success("Connected to AI Agent backend");
        return;
      }

      // If that fails, try the execute endpoint with minimal data
      const testPayload = {
        user_idea: "Test connection",
        project_type: "test",
        project_description: "Testing connection to backend",
        scale: "small",
        budget: "low",
        project_duration: "1",
        security_requirements: "standard",
        key_features: ["test"],
        additional_requirements: "None"
      };
      
      const executeResponse = await fetch(`${url}/execute`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload)
      });
      
      if (executeResponse.ok) {
        setIsConnected(true);
        toast.success("Connected to AI Agent backend");
      } else {
        setIsConnected(false);
        toast.error("Failed to connect to AI Agent backend");
      }
    } catch (error) {
      console.error("Failed to connect to backend:", error);
      setIsConnected(false);
      toast.error("Could not connect to AI Agent backend");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-architect">AI Agent Backend Setup</CardTitle>
        <CardDescription>
          Configure the connection to your Python AI Agent backend
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backendUrl">Backend URL</Label>
            <Input
              id="backendUrl"
              placeholder="http://localhost:8000"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the URL where your Python FastAPI backend is running.
              The URL should match the one shown in your terminal: {backendUrl}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-sm">
              {isConnected ? 'Connected to backend' : 'Not connected to backend'}
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Make sure your Python backend has CORS enabled to accept requests from this website.</p>
            <p>The backend should have these endpoints:</p>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>GET / - A simple health check endpoint</li>
              <li>POST /execute - The main endpoint that processes architecture requests</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={checkConnection}>
          Test Connection
        </Button>
        <Button className="bg-architect hover:bg-architect/90" onClick={saveBackendUrl}>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BackendSetup;
