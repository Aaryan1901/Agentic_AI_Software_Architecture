
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
    // Set in process.env for the current session
    (window as any).process = (window as any).process || {};
    (window as any).process.env = (window as any).process.env || {};
    (window as any).process.env.BACKEND_URL = backendUrl;
    
    toast.success("Backend URL saved");
    
    // Check connection
    checkConnection();
  };
  
  const checkConnection = async () => {
    try {
      const url = localStorage.getItem('backendUrl') || 'http://localhost:8000';
      const response = await fetch(`${url}/health`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
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
              By default, FastAPI runs on http://localhost:8000
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-sm">
              {isConnected ? 'Connected to backend' : 'Not connected to backend'}
            </p>
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
