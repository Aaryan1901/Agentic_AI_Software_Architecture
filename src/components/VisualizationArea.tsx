
import React from 'react';

interface NodeData {
  id: string;
  label: string;
  type: 'frontend' | 'backend' | 'database' | 'service' | 'infrastructure';
}

interface EdgeData {
  source: string;
  target: string;
  label?: string;
}

interface VisualizationAreaProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({ nodes, edges }) => {
  // This is a placeholder for an actual visualization library integration
  // In a real implementation, you would integrate a library like React Flow, D3.js, etc.
  
  const getNodeColor = (type: NodeData['type']) => {
    switch (type) {
      case 'frontend': return '#60a5fa'; // architect-highlight
      case 'backend': return '#3b82f6'; // architect
      case 'database': return '#1e40af'; // architect-dark
      case 'service': return '#93c5fd'; // lighter blue
      case 'infrastructure': return '#bfdbfe'; // lightest blue
      default: return '#3b82f6'; // architect
    }
  };

  return (
    <div className="w-full h-[400px] border rounded-md p-4 bg-white">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-semibold">Architecture Visualization</h3>
        <div className="flex gap-2">
          <button className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80">Zoom In</button>
          <button className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80">Zoom Out</button>
          <button className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80">Reset</button>
        </div>
      </div>

      <div className="w-full h-[320px] overflow-hidden relative bg-architect-light/20 rounded-md flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 800 600" className="overflow-visible">
          {/* Sample Legend - In a real implementation this would be dynamic */}
          <g transform="translate(20, 20)">
            <rect width="15" height="15" fill="#60a5fa" rx="2" />
            <text x="20" y="12" fontSize="12">Frontend</text>
            
            <rect y="20" width="15" height="15" fill="#3b82f6" rx="2" />
            <text x="20" y="32" fontSize="12">Backend</text>
            
            <rect y="40" width="15" height="15" fill="#1e40af" rx="2" />
            <text x="20" y="52" fontSize="12">Database</text>
            
            <rect y="60" width="15" height="15" fill="#93c5fd" rx="2" />
            <text x="20" y="72" fontSize="12">Service</text>
            
            <rect y="80" width="15" height="15" fill="#bfdbfe" rx="2" />
            <text x="20" y="92" fontSize="12">Infrastructure</text>
          </g>
          
          {/* This would be replaced with actual nodes and edges based on the data */}
          <g transform="translate(400, 300)">
            <rect x="-60" y="-200" width="120" height="50" rx="4" fill="#60a5fa" />
            <text x="0" y="-175" fontSize="14" textAnchor="middle" fill="white">Frontend</text>
            
            <rect x="-60" y="-100" width="120" height="50" rx="4" fill="#3b82f6" />
            <text x="0" y="-75" fontSize="14" textAnchor="middle" fill="white">Backend API</text>
            
            <rect x="-150" y="0" width="100" height="50" rx="4" fill="#1e40af" />
            <text x="-100" y="25" fontSize="14" textAnchor="middle" fill="white">Database</text>
            
            <rect x="50" y="0" width="100" height="50" rx="4" fill="#93c5fd" />
            <text x="100" y="25" fontSize="14" textAnchor="middle" fill="white">Services</text>
            
            <rect x="-60" y="100" width="120" height="50" rx="4" fill="#bfdbfe" />
            <text x="0" y="125" fontSize="14" textAnchor="middle" fill="black">Infrastructure</text>
            
            {/* Sample connections */}
            <line x1="0" y1="-150" x2="0" y2="-100" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="-50" x2="-100" y2="0" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="-50" x2="100" y2="0" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-100" y1="50" x2="0" y2="100" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="50" x2="0" y2="100" stroke="#94a3b8" strokeWidth="2" />
          </g>
        </svg>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Note: This is a simplified visualization. In a real implementation, this would be an interactive diagram.
      </div>
    </div>
  );
};

export default VisualizationArea;
