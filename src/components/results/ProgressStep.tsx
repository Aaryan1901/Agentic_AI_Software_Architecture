
import React from 'react';

interface ProgressStepProps {
  step: number;
  title: string;
  description: string;
  isActive: boolean;
  isComplete: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ 
  step, 
  title, 
  description, 
  isActive, 
  isComplete 
}) => (
  <div className="flex items-start gap-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isComplete ? 'bg-green-100 text-green-600' : 
      isActive ? 'bg-architect text-white' : 
      'bg-muted text-muted-foreground'
    }`}>
      {step}
    </div>
    <div>
      <h3 className={`font-medium ${isActive ? 'text-architect' : ''}`}>{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default ProgressStep;
