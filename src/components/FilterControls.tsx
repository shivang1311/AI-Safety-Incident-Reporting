import React from 'react';
import { SortDirection, FilterType } from '../types/incident';
import { SortAsc, SortDesc } from 'lucide-react';

interface FilterControlsProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  currentFilter,
  setFilter,
  sortDirection,
  setSortDirection
}) => {
  const filterOptions: FilterType[] = ['All', 'Low', 'Medium', 'High'];
  
  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Filter by Severity
        </label>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentFilter === option
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Sort by Date
        </label>
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              sortDirection === 'newest'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortDirection('newest')}
          >
            <SortDesc size={16} />
            Newest First
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              sortDirection === 'oldest'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSortDirection('oldest')}
          >
            <SortAsc size={16} />
            Oldest First
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;