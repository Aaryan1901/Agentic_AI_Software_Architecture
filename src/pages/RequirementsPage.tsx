import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";

// Define form schema using Zod
const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectType: z.enum(['web', 'mobile', 'desktop', 'api', 'ai', 'iot', 'other']),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  scale: z.enum(['small', 'medium', 'large']),
  budget: z.string().optional(),
  timeConstraints: z.string().optional(),
  security: z.string().optional(),
  customRequirements: z.string().optional(),
});

// Define the type for project requirements
export type ProjectRequirements = z.infer<typeof formSchema> & {
  features: string[];
};

const RequirementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = React.useState<string[]>([]);
  const [newFeature, setNewFeature] = React.useState<string>('');

  // Initialize form with useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "web",
      description: "",
      scale: "small",
      budget: "",
      timeConstraints: "",
      security: "",
      customRequirements: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Create form data object
    const formData = {
      projectName: data.projectName,
      projectType: data.projectType,
      description: data.description,
      scale: data.scale,
      budget: data.budget,
      timeConstraints: data.timeConstraints,
      security: data.security,
      scalability: data.scale, // Add this line to fix the TypeScript error
      features: features,
      customRequirements: data.customRequirements
    };

    // Store form data in session storage
    sessionStorage.setItem('projectRequirements', JSON.stringify(formData));

    // Navigate to the results page
    navigate('/results');
  };

  // Add a new feature to the list
  const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  // Remove a feature from the list
  const handleRemoveFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-architect mb-2">Project Requirements</h1>
          <p className="text-muted-foreground">Please provide detailed information about your project.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Project" {...field} className="hover-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-auto hover-input">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="web">Web Application</SelectItem>
                          <SelectItem value="mobile">Mobile Application</SelectItem>
                          <SelectItem value="desktop">Desktop Application</SelectItem>
                          <SelectItem value="api">API Service</SelectItem>
                          <SelectItem value="ai">AI/ML Project</SelectItem>
                          <SelectItem value="iot">IoT System</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project in detail..."
                          className="resize-none hover-input"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include the main goals, target audience, and key features of your project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Requirements</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="scale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Scale</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-auto hover-input">
                            <SelectValue placeholder="Select scale" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (Hundreds of users)</SelectItem>
                          <SelectItem value="medium">Medium (Thousands of users)</SelectItem>
                          <SelectItem value="large">Large (Millions of users)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Estimated budget for the project" className="hover-input" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide an estimated budget for the project, if available.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeConstraints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Constraints (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Any time constraints for the project" className="hover-input" {...field} />
                      </FormControl>
                      <FormDescription>
                        Specify any time constraints or deadlines for the project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="security"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Specific security requirements" className="hover-input" {...field} />
                      </FormControl>
                      <FormDescription>
                        Specify any specific security requirements for the project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Add a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="hover-input"
                  />
                  <Button type="button" variant="outline" onClick={handleAddFeature}>
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center justify-between rounded-md border px-3 py-1.5 shadow-sm">
                      <Label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                        {feature}
                      </Label>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFeature(feature)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="customRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional requirements or information"
                          className="resize-none hover-input"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Specify any custom requirements or additional information for the project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="bg-architect hover:bg-architect-dark shine">
              Generate Architecture Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-architect">
              <path d="M3 7h5l2 3h6l2-3h3l-4 9H7l-4-9Z" />
              <path d="M7 7 4.5 3h15L17 7" />
              <path d="m12 16-1 6h2l1-6" />
            </svg>
            <p className="text-sm text-muted-foreground">© 2025 DesignPanda. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-architect">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RequirementsPage;
