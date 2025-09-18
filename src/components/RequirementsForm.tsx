
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
  // Basic Project Info
  projectName: string;
  projectType: string;
  description: string;
  
  // Functional Requirements
  userRoles: string[];
  coreProcesses: string[];
  businessLogic: string[];
  
  // Non-Functional Requirements
  expectedUsers: string;
  performanceNeeds: string[];
  securityRequirements: string[];
  usabilityNeeds: string[];
  complianceRequirements: string[];
  
  // System Constraints
  scalability: string;
  budget: string;
  timeConstraints: string;
  techRestrictions?: string;
  hardwareConstraints?: string;
  
  // Stakeholders & Priorities
  stakeholders: string[];
  topPriorities: string[];
  risksToAvoid: string[];
  
  // Deployment Preferences
  deploymentType: string;
  deploymentRegion?: string;
  cicdRequired: string;
  
  // Features & Approach
  features: string[];
  projectApproach: string;
  developmentMethodology: string;
  customRequirements?: string;
}

export interface RequirementsFormProps {
  children?: ReactNode;
  onSubmit: (data: ProjectRequirements) => void;
  initialDescription?: string;
}

const formSchema = z.object({
  // Basic Project Info
  projectName: z.string().min(2, { message: "Project name is required" }),
  projectType: z.string().min(1, { message: "Project type is required" }),
  description: z.string().min(10, { message: "Please provide a more detailed description" }),
  
  // Functional Requirements
  userRoles: z.array(z.string()).min(1, { message: "Select at least one user role" }),
  coreProcesses: z.array(z.string()).min(1, { message: "Select at least one core process" }),
  businessLogic: z.array(z.string()).default([]),
  
  // Non-Functional Requirements
  expectedUsers: z.string().min(1, { message: "Please specify expected user count" }),
  performanceNeeds: z.array(z.string()).default([]),
  securityRequirements: z.array(z.string()).default([]),
  usabilityNeeds: z.array(z.string()).default([]),
  complianceRequirements: z.array(z.string()).default([]),
  
  // System Constraints
  scalability: z.string().default("medium"),
  budget: z.string().min(1, { message: "Budget information is required" }),
  timeConstraints: z.string().min(1, { message: "Timeline information is required" }),
  techRestrictions: z.string().optional(),
  hardwareConstraints: z.string().optional(),
  
  // Stakeholders & Priorities
  stakeholders: z.array(z.string()).min(1, { message: "Select at least one stakeholder" }),
  topPriorities: z.array(z.string()).min(1, { message: "Select at least one priority" }),
  risksToAvoid: z.array(z.string()).default([]),
  
  // Deployment Preferences
  deploymentType: z.string().default("cloud"),
  deploymentRegion: z.string().optional(),
  cicdRequired: z.string().default("yes"),
  
  // Features & Approach
  features: z.array(z.string()).min(1, { message: "Select at least one feature" }),
  projectApproach: z.string().default("Object Oriented"),
  developmentMethodology: z.string().default("Agile"),
  customRequirements: z.string().optional(),
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

// Options for form fields
const userRoleOptions = [
  { id: "admin", label: "System Administrator" },
  { id: "manager", label: "Manager/Supervisor" },
  { id: "staff", label: "Staff/Employee" },
  { id: "customer", label: "Customer/Client" },
  { id: "guest", label: "Guest User" },
  { id: "analyst", label: "Data Analyst" },
];

const coreProcessOptions = [
  { id: "auth", label: "User Authentication & Authorization" },
  { id: "data-management", label: "Data Management & Storage" },
  { id: "reporting", label: "Reporting & Analytics" },
  { id: "workflow", label: "Business Workflow Management" },
  { id: "communication", label: "Communication & Notifications" },
  { id: "integration", label: "Third-party Integrations" },
  { id: "backup", label: "Backup & Recovery" },
  { id: "audit", label: "Audit & Compliance Tracking" },
];

const businessLogicOptions = [
  { id: "approval", label: "Approval Workflows" },
  { id: "notifications", label: "Automated Notifications" },
  { id: "scheduling", label: "Scheduling & Calendar" },
  { id: "billing", label: "Billing & Invoicing" },
  { id: "inventory", label: "Inventory Management" },
  { id: "crm", label: "Customer Relationship Management" },
];

const performanceOptions = [
  { id: "fast-response", label: "Fast Response Time (<2 seconds)" },
  { id: "high-availability", label: "High Availability (99.9% uptime)" },
  { id: "scalable", label: "Auto-scaling Capability" },
  { id: "concurrent", label: "High Concurrent User Support" },
  { id: "real-time", label: "Real-time Data Processing" },
];

const securityOptions = [
  { id: "encryption", label: "Data Encryption" },
  { id: "rbac", label: "Role-based Access Control" },
  { id: "audit-logs", label: "Audit Logging" },
  { id: "2fa", label: "Two-Factor Authentication" },
  { id: "data-privacy", label: "Data Privacy Protection" },
  { id: "secure-api", label: "Secure API Endpoints" },
];

const usabilityOptions = [
  { id: "mobile-friendly", label: "Mobile-Friendly Interface" },
  { id: "multilingual", label: "Multi-language Support" },
  { id: "accessibility", label: "Accessibility Compliance" },
  { id: "intuitive", label: "Intuitive User Interface" },
  { id: "responsive", label: "Responsive Design" },
];

const complianceOptions = [
  { id: "gdpr", label: "GDPR Compliance" },
  { id: "hipaa", label: "HIPAA Compliance" },
  { id: "pci-dss", label: "PCI DSS Compliance" },
  { id: "sox", label: "SOX Compliance" },
  { id: "iso27001", label: "ISO 27001" },
];

const stakeholderOptions = [
  { id: "end-users", label: "End Users" },
  { id: "admins", label: "System Administrators" },
  { id: "managers", label: "Business Managers" },
  { id: "developers", label: "Development Team" },
  { id: "customers", label: "External Customers" },
  { id: "vendors", label: "Third-party Vendors" },
];

const priorityOptions = [
  { id: "security", label: "Security" },
  { id: "performance", label: "Performance & Speed" },
  { id: "cost", label: "Cost Effectiveness" },
  { id: "scalability", label: "Scalability" },
  { id: "maintainability", label: "Maintainability" },
  { id: "usability", label: "User Experience" },
];

const riskOptions = [
  { id: "data-loss", label: "Data Loss" },
  { id: "downtime", label: "System Downtime" },
  { id: "security-breach", label: "Security Breach" },
  { id: "vendor-lock", label: "Vendor Lock-in" },
  { id: "cost-overrun", label: "Cost Overruns" },
  { id: "timeline-delay", label: "Timeline Delays" },
];

const deploymentOptions = [
  { label: "Cloud (AWS/Azure/GCP)", value: "cloud" },
  { label: "On-Premise", value: "on-premise" },
  { label: "Hybrid Cloud", value: "hybrid" },
  { label: "Edge Computing", value: "edge" },
];

const regionOptions = [
  { label: "North America", value: "na" },
  { label: "Europe", value: "eu" },
  { label: "Asia Pacific", value: "ap" },
  { label: "Global", value: "global" },
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
      // Basic Project Info
      projectName: "",
      projectType: "",
      description: "",
      
      // Functional Requirements
      userRoles: [],
      coreProcesses: [],
      businessLogic: [],
      
      // Non-Functional Requirements
      expectedUsers: "",
      performanceNeeds: [],
      securityRequirements: [],
      usabilityNeeds: [],
      complianceRequirements: [],
      
      // System Constraints
      scalability: "medium",
      budget: "",
      timeConstraints: "",
      techRestrictions: "",
      hardwareConstraints: "",
      
      // Stakeholders & Priorities
      stakeholders: [],
      topPriorities: [],
      risksToAvoid: [],
      
      // Deployment Preferences
      deploymentType: "cloud",
      deploymentRegion: "",
      cicdRequired: "yes",
      
      // Features & Approach
      features: [],
      projectApproach: "Object Oriented",
      developmentMethodology: "Agile",
      customRequirements: "",
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
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              
              {/* Section 1: Basic Project Information */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">1. Basic Project Information</h3>
                  <p className="text-sm text-muted-foreground">General details about your project</p>
                </div>
                
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
              </div>

              {/* Section 2: Functional Requirements */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">2. Functional Requirements</h3>
                  <p className="text-sm text-muted-foreground">What the system must do</p>
                </div>

                <FormField
                  control={form.control}
                  name="userRoles"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>User Roles</FormLabel>
                        <FormDescription>Select the types of users who will use this system</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userRoleOptions.map((role) => (
                          <FormField
                            key={role.id}
                            control={form.control}
                            name="userRoles"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, role.label])
                                        : field.onChange(field.value?.filter((value) => value !== role.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{role.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coreProcesses"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Core Business Processes</FormLabel>
                        <FormDescription>Select the business workflows you expect</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {coreProcessOptions.map((process) => (
                          <FormField
                            key={process.id}
                            control={form.control}
                            name="coreProcesses"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(process.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, process.label])
                                        : field.onChange(field.value?.filter((value) => value !== process.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{process.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessLogic"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Business Logic (Optional)</FormLabel>
                        <FormDescription>Advanced business logic requirements</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {businessLogicOptions.map((logic) => (
                          <FormField
                            key={logic.id}
                            control={form.control}
                            name="businessLogic"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(logic.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, logic.label])
                                        : field.onChange(field.value?.filter((value) => value !== logic.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{logic.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 3: Non-Functional Requirements */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">3. Non-Functional Requirements</h3>
                  <p className="text-sm text-muted-foreground">Quality attributes and performance needs</p>
                </div>

                <FormField
                  control={form.control}
                  name="expectedUsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Concurrent Users</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 100-500 users, 1000+ users, Unknown" 
                          {...field} 
                          className="hover-input"
                        />
                      </FormControl>
                      <FormDescription>How many users do you expect to use the system simultaneously?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="performanceNeeds"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Performance Requirements</FormLabel>
                        </div>
                        <div className="space-y-3">
                          {performanceOptions.map((performance) => (
                            <FormField
                              key={performance.id}
                              control={form.control}
                              name="performanceNeeds"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(performance.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, performance.label])
                                          : field.onChange(field.value?.filter((value) => value !== performance.label))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{performance.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securityRequirements"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Security Requirements</FormLabel>
                        </div>
                        <div className="space-y-3">
                          {securityOptions.map((security) => (
                            <FormField
                              key={security.id}
                              control={form.control}
                              name="securityRequirements"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(security.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, security.label])
                                          : field.onChange(field.value?.filter((value) => value !== security.label))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{security.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="usabilityNeeds"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Usability Requirements</FormLabel>
                        </div>
                        <div className="space-y-3">
                          {usabilityOptions.map((usability) => (
                            <FormField
                              key={usability.id}
                              control={form.control}
                              name="usabilityNeeds"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(usability.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, usability.label])
                                          : field.onChange(field.value?.filter((value) => value !== usability.label))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{usability.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="complianceRequirements"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Compliance Requirements</FormLabel>
                          <FormDescription>Does your project need to comply with industry regulations?</FormDescription>
                        </div>
                        <div className="space-y-3">
                          {complianceOptions.map((compliance) => (
                            <FormField
                              key={compliance.id}
                              control={form.control}
                              name="complianceRequirements"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(compliance.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, compliance.label])
                                          : field.onChange(field.value?.filter((value) => value !== compliance.label))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{compliance.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section 4: System Constraints */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">4. System Constraints</h3>
                  <p className="text-sm text-muted-foreground">Technical limitations and restrictions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Range</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., $10,000-50,000" 
                            {...field} 
                            className="hover-input"
                          />
                        </FormControl>
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
                            placeholder="e.g., 3-6 months" 
                            {...field} 
                            className="hover-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="techRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technology Restrictions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Must use AWS, Only open source, No specific frameworks..." 
                            className="min-h-[80px] hover-input"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>Any technology stack restrictions or preferences?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hardwareConstraints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hardware Constraints (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Must run on mobile devices, IoT compatibility..." 
                            className="min-h-[80px] hover-input"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>Any hardware limitations or requirements?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section 5: Stakeholders & Priorities */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">5. Stakeholders & Priorities</h3>
                  <p className="text-sm text-muted-foreground">Who's involved and what's most important</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="stakeholders"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Project Stakeholders</FormLabel>
                          <FormDescription>Select your stakeholders</FormDescription>
                        </div>
                        <div className="space-y-3">
                          {stakeholderOptions.map((stakeholder) => (
                            <FormField
                              key={stakeholder.id}
                              control={form.control}
                              name="stakeholders"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(stakeholder.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, stakeholder.label])
                                          : field.onChange(field.value?.filter((value) => value !== stakeholder.label))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{stakeholder.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="topPriorities"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Top Priorities</FormLabel>
                          <FormDescription>Rank your top priorities</FormDescription>
                        </div>
                        <div className="space-y-3">
                          {priorityOptions.map((priority) => (
                            <FormField
                              key={priority.id}
                              control={form.control}
                              name="topPriorities"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(priority.label)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, priority.label])
                                          : field.onChange(field.value?.filter((value) => value !== priority.label))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{priority.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="risksToAvoid"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Risks to Avoid (Optional)</FormLabel>
                        <FormDescription>What risks must be minimized?</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {riskOptions.map((risk) => (
                          <FormField
                            key={risk.id}
                            control={form.control}
                            name="risksToAvoid"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(risk.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, risk.label])
                                        : field.onChange(field.value?.filter((value) => value !== risk.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{risk.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 6: Deployment Preferences */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">6. Deployment Preferences</h3>
                  <p className="text-sm text-muted-foreground">How and where to deploy your system</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deploymentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deployment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover-input">
                              <SelectValue placeholder="Select deployment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {deploymentOptions.map((option) => (
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
                    name="deploymentRegion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deployment Region (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover-input">
                              <SelectValue placeholder="Select deployment region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {regionOptions.map((option) => (
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
                  name="cicdRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CI/CD Pipeline Required?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="hover-input">
                            <SelectValue placeholder="Do you want CI/CD pipelines?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes - Automated deployment needed</SelectItem>
                          <SelectItem value="no">No - Manual deployment is fine</SelectItem>
                          <SelectItem value="later">Maybe - Can be added later</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Automated testing and deployment pipelines</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 7: Features & Approach */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-foreground">7. Technical Features & Approach</h3>
                  <p className="text-sm text-muted-foreground">Technical features and development approach</p>
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Required Technical Features</FormLabel>
                        <FormDescription>Select all technical features your project will need</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {featureOptions.map((feature) => (
                          <FormField
                            key={feature.id}
                            control={form.control}
                            name="features"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(feature.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, feature.label])
                                        : field.onChange(field.value?.filter((value) => value !== feature.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{feature.label}</FormLabel>
                              </FormItem>
                            )}
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
                        <FormLabel>Programming Approach</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="hover-input">
                              <SelectValue placeholder="Choose programming approach" />
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
                        <FormDescription>Select the programming paradigm</FormDescription>
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
                        <FormDescription>Select the development approach</FormDescription>
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
                      <FormLabel>Additional Custom Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any other specific needs, constraints, or special requirements..." 
                          className="min-h-[100px] hover-input"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>Anything else we should know about your project?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  className="gradient-btn px-8 py-3 text-lg"
                >
                  Generate Professional Architecture
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
