
import { ReactNode, useState } from 'react';
import ProjectChatbot from './ProjectChatbot';
import { GroqResponse } from '@/services/groqService';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

export interface ProjectRequirements {
  projectName: string;
  projectType: string;
  description: string;
  scale?: string;
  budget?: string;
  timeConstraints?: string;
  security?: string;
  features: string[];
  customRequirements?: string;
  scalability?: string;
  timeline?: string;    
  additionalRequirements?: string;
  projectApproach?: string;
  developmentMethodology?: string;
}

export interface RequirementsFormProps {
  children?: ReactNode;
  onSubmit: (data: ProjectRequirements) => void;
  initialDescription?: string;
}

const formSchema = z.object({
  projectName: z.string().min(2, { message: "Project name is required" }),
  projectType: z.string().min(1, { message: "Project type is required" }),
  description: z.string().min(10, { message: "Please provide a more detailed description" }),
  scalability: z.string().default("medium"),
  budget: z.string().optional(),
  timeConstraints: z.string().optional(),
  security: z.string().optional(),
  features: z.array(z.string()).min(1, { message: "Select at least one feature" }),
  customRequirements: z.string().optional(),
  projectApproach: z.string().default("Object Oriented"),
  developmentMethodology: z.string().default("Agile"),
});

const projectTypes = [
  { label: "Web Application", value: "webapp" },
  { label: "Mobile App", value: "mobile" },
  { label: "API Service", value: "api" },
  { label: "Data Pipeline", value: "data" },
  { label: "Machine Learning Project", value: "ml" },
  { label: "IoT System", value: "iot" },
];

const scalabilityOptions = [
  { label: "Low (Personal project)", value: "low" },
  { label: "Medium (Small business)", value: "medium" },
  { label: "High (Enterprise)", value: "high" },
  { label: "Enterprise (Global scale)", value: "enterprise" },
];

const projectApproachOptions = [
  { label: "Object Oriented", value: "Object Oriented" },
  { label: "Procedural", value: "Procedural" },
  { label: "Functional", value: "Functional" },
  { label: "Service-Oriented", value: "Service-Oriented" },
  { label: "Event-Driven", value: "Event-Driven" },
];

const developmentMethodologyOptions = [
  { label: "Agile", value: "Agile" },
  { label: "Waterfall", value: "Waterfall" },
  { label: "Spiral", value: "Spiral" },
  { label: "Prototyping", value: "Prototyping" },
  { label: "DevOps", value: "DevOps" },
  { label: "V-Model", value: "V-Model" },
];

const featureOptions = [
  { id: "auth", label: "Authentication" },
  { id: "db", label: "Database Storage" },
  { id: "api", label: "API Integration" },
  { id: "real-time", label: "Real-time Updates" },
  { id: "file", label: "File Upload" },
  { id: "search", label: "Search Functionality" },
  { id: "analytics", label: "Analytics" },
  { id: "payment", label: "Payment Processing" },
];

const RequirementsForm = ({ onSubmit, initialDescription }: RequirementsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      description: "",
      scalability: "medium",
      budget: "",
      timeConstraints: "",
      features: [],
      customRequirements: "",
      projectApproach: "Object Oriented",
      developmentMethodology: "Agile",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as ProjectRequirements);
  };

  const handleSuggestionsReceived = (suggestions: GroqResponse) => {
    // Update form with AI suggestions
    if (suggestions.projectName) form.setValue('projectName', suggestions.projectName);
    if (suggestions.projectType) form.setValue('projectType', suggestions.projectType);
    if (suggestions.description) form.setValue('description', suggestions.description);
    if (suggestions.scale) form.setValue('scalability', suggestions.scale);
    if (suggestions.budget) form.setValue('budget', suggestions.budget);
    if (suggestions.timeline) form.setValue('timeConstraints', suggestions.timeline);
    if (suggestions.projectApproach) form.setValue('projectApproach', suggestions.projectApproach);
    if (suggestions.developmentMethodology) form.setValue('developmentMethodology', suggestions.developmentMethodology);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-gradient">
        <CardHeader className="bg-gradient-to-r from-architect-light via-architect to-architect-vibrant text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Project Requirements</CardTitle>
          <CardDescription className="text-white/80">
            Tell us about your project to get tailored architecture recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <SelectTrigger className="hover-input">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your project goals, users, and key functionality..." 
                        className="min-h-[100px] hover-input"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scalability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Scale</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="hover-input">
                          <SelectValue placeholder="Select expected scale" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {scalabilityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This helps us recommend appropriate architecture patterns
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your budget (e.g., $10,000)" 
                          {...field} 
                          className="hover-input"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your project budget
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
                      <FormLabel>Timeline</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter timeline (e.g., 3 months)" 
                          {...field} 
                          className="hover-input"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your project timeline
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Required Features</FormLabel>
                      <FormDescription>
                        Select all features your project will need
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {featureOptions.map((feature) => (
                        <FormField
                          key={feature.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={feature.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(feature.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, feature.label])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== feature.label
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {feature.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                 )}
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                   control={form.control}
                   name="projectApproach"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Project Approach</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="hover-input">
                             <SelectValue placeholder="Choose project approach" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           {projectApproachOptions.map((option) => (
                             <SelectItem key={option.value} value={option.value}>
                               {option.label}
                             </SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                       <FormDescription>
                         Select the programming paradigm for your project
                       </FormDescription>
                       <FormMessage />
                     </FormItem>
                   )}
                 />

                 <FormField
                   control={form.control}
                   name="developmentMethodology"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Development Methodology</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="hover-input">
                             <SelectValue placeholder="Choose development methodology" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           {developmentMethodologyOptions.map((option) => (
                             <SelectItem key={option.value} value={option.value}>
                               {option.label}
                             </SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                       <FormDescription>
                         Select the development approach for your project
                       </FormDescription>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>

               <FormField
                control={form.control}
                name="customRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other specific needs or constraints..." 
                        className="min-h-[80px] hover-input"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="gradient-btn px-8"
                >
                  Generate Architecture
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* AI Chatbot */}
      <div className="lg:sticky lg:top-6">
        <ProjectChatbot 
          initialDescription={initialDescription}
          onSuggestionsReceived={handleSuggestionsReceived}
        />
      </div>
      </div>
    </motion.div>
  );
};

export default RequirementsForm;
