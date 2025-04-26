import React from 'react';
import { Incident, FilterType, SortDirection } from '../types/incident';
import IncidentItem from './IncidentItem';
import { compareDates } from '../utils/dateUtils';

interface IncidentListProps {
  incidents: Incident[];
  filter: FilterType;
  sortDirection: SortDirection;
  onDelete: (id: number) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, filter, sortDirection, onDelete }) => {
  const filteredAndSortedIncidents = React.useMemo(() => {
    const filtered = filter === 'All' 
      ? incidents 
      : incidents.filter(incident => incident.severity === filter);
    
    return [...filtered].sort((a, b) => 
      compareDates(a.reported_at, b.reported_at, sortDirection === 'newest')
    );
  }, [incidents, filter, sortDirection]);

  if (filteredAndSortedIncidents.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500">No incidents found matching the current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAndSortedIncidents.map(incident => (
        <IncidentItem 
          key={incident.id} 
          incident={incident} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default IncidentList;