import React from 'react';
import { SeverityLevel } from '../types/incident';

interface AlertBadgeProps {
  severity: SeverityLevel;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ severity }) => {
  const getBadgeClasses = () => {
    const baseClasses = "px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center justify-center";
    
    switch (severity) {
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800 ring-1 ring-green-200`;
      case 'Medium':
        return `${baseClasses} bg-amber-100 text-amber-800 ring-1 ring-amber-200`;
      case 'High':
        return `${baseClasses} bg-red-100 text-red-800 ring-1 ring-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 ring-1 ring-gray-200`;
    }
  };

  return (
    <span className={getBadgeClasses()}>
      {severity}
    </span>
  );
};

export default AlertBadge;