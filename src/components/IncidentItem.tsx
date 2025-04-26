import React, { useState } from 'react';
import { Incident } from '../types/incident';
import { formatDate } from '../utils/dateUtils';
import AlertBadge from './AlertBadge';
import { ChevronDown, ChevronUp, Clock, AlertCircle, Trash2 } from 'lucide-react';

interface IncidentItemProps {
  incident: Incident;
  onDelete: (id: number) => void;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(incident.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden border border-gray-100 mb-4 transition-all duration-300 ${
        isExpanded ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 mt-1 ${
                incident.severity === 'High' ? 'text-red-500' :
                incident.severity === 'Medium' ? 'text-amber-500' :
                'text-green-500'
              }`} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{incident.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <AlertBadge severity={incident.severity} />
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{formatDate(incident.reported_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                showDeleteConfirm
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20'
                  : 'text-red-600 bg-red-50 hover:bg-red-100'
              }`}
            >
              <Trash2 size={16} />
              {showDeleteConfirm ? 'Confirm Delete' : 'Delete'}
            </button>
            <button
              onClick={toggleExpand}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  <span>Hide Details</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>View Details</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-6 pb-6 animate-fadeIn">
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed">{incident.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;