
import React from 'react';

// Architecture diagram template for Microservices
export const MicroservicesDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 500" className="overflow-visible">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
    </defs>

    {/* API Gateway */}
    <rect x="325" y="50" width="150" height="60" rx="4" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" />
    <text x="400" y="85" fontSize="14" textAnchor="middle" fill="white">API Gateway</text>

    {/* Microservices */}
    <rect x="100" y="180" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="160" y="215" fontSize="14" textAnchor="middle" fill="white">User Service</text>

    <rect x="250" y="180" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="310" y="215" fontSize="14" textAnchor="middle" fill="white">Auth Service</text>

    <rect x="400" y="180" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="460" y="215" fontSize="14" textAnchor="middle" fill="white">Product Service</text>

    <rect x="550" y="180" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="610" y="215" fontSize="14" textAnchor="middle" fill="white">Order Service</text>

    {/* Databases */}
    <rect x="100" y="310" width="120" height="60" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
    <text x="160" y="345" fontSize="14" textAnchor="middle" fill="white">User DB</text>

    <rect x="250" y="310" width="120" height="60" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
    <text x="310" y="345" fontSize="14" textAnchor="middle" fill="white">Auth DB</text>

    <rect x="400" y="310" width="120" height="60" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
    <text x="460" y="345" fontSize="14" textAnchor="middle" fill="white">Product DB</text>

    <rect x="550" y="310" width="120" height="60" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
    <text x="610" y="345" fontSize="14" textAnchor="middle" fill="white">Order DB</text>

    {/* Message Bus */}
    <rect x="100" y="410" width="570" height="40" rx="4" fill="#93c5fd" stroke="#60a5fa" strokeWidth="2" />
    <text x="385" y="435" fontSize="14" textAnchor="middle" fill="black">Message Bus / Event Stream</text>

    {/* Connection Lines */}
    <line x1="400" y1="110" x2="160" y2="180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="400" y1="110" x2="310" y2="180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="400" y1="110" x2="460" y2="180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="400" y1="110" x2="610" y2="180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

    <line x1="160" y1="240" x2="160" y2="310" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="310" y1="240" x2="310" y2="310" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="460" y1="240" x2="460" y2="310" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="610" y1="240" x2="610" y2="310" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

    <line x1="160" y1="370" x2="160" y2="410" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="310" y1="370" x2="310" y2="410" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="460" y1="370" x2="460" y2="410" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="610" y1="370" x2="610" y2="410" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
  </svg>
);

// Architecture diagram template for Monolithic MVC
export const MonolithicMVCDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 500" className="overflow-visible">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Client/Browser */}
    <rect x="325" y="50" width="150" height="60" rx="4" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" />
    <text x="400" y="85" fontSize="14" textAnchor="middle" fill="white">Client/Browser</text>

    {/* Monolithic App */}
    <rect x="200" y="180" width="400" height="180" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="400" y="210" fontSize="16" textAnchor="middle" fill="white">Monolithic Application</text>

    {/* MVC Components */}
    <rect x="240" y="230" width="100" height="50" rx="4" fill="#9ca3af" fillOpacity="0.5" stroke="white" strokeWidth="1" />
    <text x="290" y="260" fontSize="14" textAnchor="middle" fill="white">Controllers</text>

    <rect x="350" y="230" width="100" height="50" rx="4" fill="#9ca3af" fillOpacity="0.5" stroke="white" strokeWidth="1" />
    <text x="400" y="260" fontSize="14" textAnchor="middle" fill="white">Services</text>

    <rect x="460" y="230" width="100" height="50" rx="4" fill="#9ca3af" fillOpacity="0.5" stroke="white" strokeWidth="1" />
    <text x="510" y="260" fontSize="14" textAnchor="middle" fill="white">Models</text>

    <rect x="240" y="290" width="100" height="50" rx="4" fill="#9ca3af" fillOpacity="0.5" stroke="white" strokeWidth="1" />
    <text x="290" y="320" fontSize="14" textAnchor="middle" fill="white">Views</text>

    <rect x="350" y="290" width="100" height="50" rx="4" fill="#9ca3af" fillOpacity="0.5" stroke="white" strokeWidth="1" />
    <text x="400" y="320" fontSize="14" textAnchor="middle" fill="white">Utilities</text>

    <rect x="460" y="290" width="100" height="50" rx="4" fill="#9ca3af" fillOpacity="0.5" stroke="white" strokeWidth="1" />
    <text x="510" y="320" fontSize="14" textAnchor="middle" fill="white">Middleware</text>

    {/* Database */}
    <rect x="325" y="400" width="150" height="60" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
    <text x="400" y="435" fontSize="14" textAnchor="middle" fill="white">Database</text>

    {/* Connection Lines */}
    <line x1="400" y1="110" x2="400" y2="180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="400" y1="360" x2="400" y2="400" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
  </svg>
);

// Architecture diagram template for Clean Architecture
export const CleanArchitectureDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 500" className="overflow-visible">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Circular Layers */}
    <circle cx="400" cy="250" r="200" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="2" />
    <circle cx="400" cy="250" r="150" fill="#93c5fd" stroke="#60a5fa" strokeWidth="2" />
    <circle cx="400" cy="250" r="100" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <circle cx="400" cy="250" r="50" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />

    {/* Layer Labels */}
    <text x="400" y="250" fontSize="14" textAnchor="middle" fill="white">Entities</text>

    <text x="400" y="185" fontSize="14" textAnchor="middle" fill="white">Use Cases</text>
    <text x="400" y="315" fontSize="14" textAnchor="middle" fill="white">Interface Adapters</text>

    <text x="400" y="120" fontSize="14" textAnchor="middle" fill="black">Controllers</text>
    <text x="300" y="250" fontSize="14" textAnchor="middle" fill="black">Gateways</text>
    <text x="500" y="250" fontSize="14" textAnchor="middle" fill="black">Presenters</text>
    <text x="400" y="380" fontSize="14" textAnchor="middle" fill="black">Repositories</text>

    <text x="400" y="70" fontSize="14" textAnchor="middle" fill="black">UI</text>
    <text x="220" y="250" fontSize="14" textAnchor="middle" fill="black">External Services</text>
    <text x="580" y="250" fontSize="14" textAnchor="middle" fill="black">Web</text>
    <text x="400" y="430" fontSize="14" textAnchor="middle" fill="black">Database</text>

    {/* Dependency Flow Arrows */}
    <path d="M400,220 L400,180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
    <path d="M370,250 L330,250" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
    <path d="M430,250 L470,250" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
    <path d="M400,280 L400,320" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
  </svg>
);

// Architecture diagram template for Event-Driven Architecture
export const EventDrivenDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 500" className="overflow-visible">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Event Bus */}
    <rect x="100" y="220" width="600" height="60" rx="4" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" />
    <text x="400" y="255" fontSize="16" textAnchor="middle" fill="white">Event Bus / Message Queue</text>

    {/* Publishers */}
    <rect x="150" y="80" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="210" y="115" fontSize="14" textAnchor="middle" fill="white">Web UI</text>

    <rect x="320" y="80" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="380" y="115" fontSize="14" textAnchor="middle" fill="white">Mobile App</text>

    <rect x="490" y="80" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="550" y="115" fontSize="14" textAnchor="middle" fill="white">External System</text>

    {/* Subscribers */}
    <rect x="150" y="350" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="210" y="385" fontSize="14" textAnchor="middle" fill="white">Notification Service</text>

    <rect x="320" y="350" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="380" y="385" fontSize="14" textAnchor="middle" fill="white">Analytics Service</text>

    <rect x="490" y="350" width="120" height="60" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
    <text x="550" y="385" fontSize="14" textAnchor="middle" fill="white">Processing Service</text>

    {/* Connection Lines */}
    <line x1="210" y1="140" x2="210" y2="220" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="380" y1="140" x2="380" y2="220" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="550" y1="140" x2="550" y2="220" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

    <line x1="210" y1="280" x2="210" y2="350" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="380" y1="280" x2="380" y2="350" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <line x1="550" y1="280" x2="550" y2="350" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
  </svg>
);

// Map to get the diagram based on pattern name
export const getDiagramByPattern = (pattern: string) => {
  switch (pattern) {
    case 'Microservices':
      return <MicroservicesDiagram />;
    case 'Monolithic MVC':
      return <MonolithicMVCDiagram />;
    case 'Clean Architecture':
      return <CleanArchitectureDiagram />;
    case 'Event-Driven Architecture':
      return <EventDrivenDiagram />;
    default:
      return <MicroservicesDiagram />;
  }
};
