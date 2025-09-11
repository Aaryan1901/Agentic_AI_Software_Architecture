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
  hospitalName: string;
  hospitalType: string;
  description: string;
  hospitalSize: string;
  budget: string;
  timeline: string;
  complianceRequirements: string;
  systemArchitecture: string;
  implementationApproach: string;
  selectedModules: string[];
  patientCapacity: string;
  departmentCount: string;
  staffSize: string;
}

export interface RequirementsFormProps {
  children?: ReactNode;
  onSubmit: (data: ProjectRequirements) => void;
  initialDescription?: string;
}

const formSchema = z.object({
  hospitalName: z.string().min(1, "Hospital name is required"),
  hospitalType: z.string().min(1, "Hospital type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  hospitalSize: z.string().min(1, "Hospital size is required"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  complianceRequirements: z.string().min(1, "Compliance requirements are required"),
  systemArchitecture: z.string().min(1, "System architecture is required"),
  implementationApproach: z.string().min(1, "Implementation approach is required"),
  selectedModules: z.array(z.string()).min(1, "At least one module must be selected"),
  patientCapacity: z.string().min(1, "Patient capacity is required"),
  departmentCount: z.string().min(1, "Department count is required"),
  staffSize: z.string().min(1, "Staff size is required"),
});

// Options for hospital management system
const hospitalTypes = [
  { value: "general", label: "General Hospital" },
  { value: "specialty", label: "Specialty Hospital" },
  { value: "clinic", label: "Medical Clinic" },
  { value: "emergency", label: "Emergency Care Center" },
  { value: "rehabilitation", label: "Rehabilitation Center" },
  { value: "maternity", label: "Maternity Hospital" },
];

const hospitalSizeOptions = [
  { value: "small", label: "Small Clinic (1-50 beds)" },
  { value: "medium", label: "Medium Hospital (50-200 beds)" },
  { value: "large", label: "Large Hospital (200-500 beds)" },
  { value: "enterprise", label: "Multi-facility Healthcare System (500+ beds)" },
];

const systemArchitectureOptions = [
  { value: "cloud", label: "Cloud-based" },
  { value: "onpremise", label: "On-premise" },
  { value: "hybrid", label: "Hybrid Cloud" },
  { value: "saas", label: "Software as a Service (SaaS)" },
  { value: "microservices", label: "Microservices Architecture" },
];

const implementationApproachOptions = [
  { value: "phased", label: "Phased Implementation" },
  { value: "bigbang", label: "Big Bang Implementation" },
  { value: "pilot", label: "Pilot Program" },
  { value: "parallel", label: "Parallel Implementation" },
  { value: "modular", label: "Module-by-Module" },
];

const hospitalModules = [
  { id: "patient", label: "Patient Management", description: "Patient registration, demographics, medical history" },
  { id: "emr", label: "Electronic Medical Records", description: "Digital patient records and clinical documentation" },
  { id: "appointment", label: "Appointment Scheduling", description: "Schedule and manage patient appointments" },
  { id: "billing", label: "Billing & Insurance", description: "Patient billing, insurance claims, and financial management" },
  { id: "pharmacy", label: "Pharmacy Management", description: "Drug inventory, prescription management, dispensing" },
  { id: "laboratory", label: "Laboratory Information System", description: "Lab tests, results, and reporting" },
  { id: "radiology", label: "Radiology & Imaging", description: "Medical imaging, DICOM, and radiology workflows" },
  { id: "inventory", label: "Inventory Management", description: "Medical supplies, equipment tracking" },
  { id: "hr", label: "Human Resources", description: "Staff management, scheduling, payroll" },
  { id: "reporting", label: "Reports & Analytics", description: "Clinical and administrative reporting" },
  { id: "emergency", label: "Emergency Department", description: "Emergency care workflows and triage" },
  { id: "icu", label: "ICU Management", description: "Intensive care unit monitoring and management" },
];

const RequirementsForm = ({ onSubmit, initialDescription }: RequirementsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalName: "",
      hospitalType: "",
      description: initialDescription || "",
      hospitalSize: "",
      budget: "",
      timeline: "",
      complianceRequirements: "",
      systemArchitecture: "",
      implementationApproach: "",
      selectedModules: [],
      patientCapacity: "",
      departmentCount: "",
      staffSize: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as ProjectRequirements);
  };

  const handleSuggestionsReceived = (suggestions: GroqResponse) => {
    // Auto-populate form fields based on AI suggestions
    if (suggestions.hospitalName) {
      form.setValue('hospitalName', suggestions.hospitalName);
    }
    if (suggestions.hospitalType) {
      form.setValue('hospitalType', suggestions.hospitalType);
    }
    if (suggestions.hospitalSize) {
      form.setValue('hospitalSize', suggestions.hospitalSize);
    }
    if (suggestions.systemArchitecture) {
      form.setValue('systemArchitecture', suggestions.systemArchitecture);
    }
    if (suggestions.implementationApproach) {
      form.setValue('implementationApproach', suggestions.implementationApproach);
    }
    if (suggestions.description) {
      form.setValue('description', suggestions.description);
    }
    if (suggestions.patientCapacity) {
      form.setValue('patientCapacity', suggestions.patientCapacity);
    }
    if (suggestions.departmentCount) {
      form.setValue('departmentCount', suggestions.departmentCount);
    }
    if (suggestions.staffSize) {
      form.setValue('staffSize', suggestions.staffSize);
    }
    if (suggestions.budget) {
      form.setValue('budget', suggestions.budget);
    }
    if (suggestions.timeline) {
      form.setValue('timeline', suggestions.timeline);
    }
    if (suggestions.complianceRequirements) {
      form.setValue('complianceRequirements', suggestions.complianceRequirements);
    }
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
            <CardTitle className="text-2xl font-bold">Hospital Management System Requirements</CardTitle>
            <CardDescription className="text-white/80">
              Tell us about your healthcare facility to get tailored system recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="hospitalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital/Clinic Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hospital or clinic name" {...field} className="hover-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hospitalType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="hover-input">
                            <SelectValue placeholder="Select hospital type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hospitalTypes.map((type) => (
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital Management System Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your hospital's specific needs, current challenges, workflow requirements, and any special features needed for your healthcare facility..."
                          className="min-h-[100px] hover-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hospitalSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover-input">
                              <SelectValue placeholder="Select hospital size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hospitalSizeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
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
                        <FormLabel>Implementation Budget</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., $50,000 - $500,000" {...field} className="hover-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Implementation Timeline</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 6-12 months" {...field} className="hover-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patientCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Patient Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 100-500 patients/day" {...field} className="hover-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departmentCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Departments</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10-15 departments" {...field} className="hover-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="staffSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Staff Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 50-200 staff members" {...field} className="hover-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="complianceRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compliance Requirements</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., HIPAA, HITECH, Local Healthcare Regulations" {...field} className="hover-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="systemArchitecture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Architecture</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover-input">
                              <SelectValue placeholder="Select system architecture" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {systemArchitectureOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="implementationApproach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Implementation Approach</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover-input">
                              <SelectValue placeholder="Select implementation approach" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {implementationApproachOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
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
                  name="selectedModules"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Hospital Management Modules</FormLabel>
                        <FormDescription>
                          Select the modules you need for your hospital management system
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hospitalModules.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="selectedModules"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="font-medium">
                                      {item.label}
                                    </FormLabel>
                                    <FormDescription className="text-sm text-muted-foreground">
                                      {item.description}
                                    </FormDescription>
                                  </div>
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

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="gradient-btn px-8"
                  >
                    Generate Hospital System Architecture
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