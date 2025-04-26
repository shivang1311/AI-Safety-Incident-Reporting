import React, { useState, useEffect } from 'react';
import { Incident, SortDirection, FilterType } from '../types/incident';
import { mockIncidents } from '../data/mockData';
import FilterControls from './FilterControls';
import IncidentList from './IncidentList';
import NewIncidentForm from './NewIncidentForm';
import { Shield, AlertTriangle, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');
  const [sortDirection, setSortDirection] = useState<SortDirection>('newest');

  useEffect(() => {
    const storedIncidents = localStorage.getItem('incidents');
    if (storedIncidents) {
      setIncidents(JSON.parse(storedIncidents));
    } else {
      setIncidents(mockIncidents);
      localStorage.setItem('incidents', JSON.stringify(mockIncidents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }, [incidents]);

  const handleNewIncident = (newIncident: Omit<Incident, 'id'>) => {
    const newId = Math.max(...incidents.map(inc => inc.id), 0) + 1;
    const incidentWithId: Incident = {
      ...newIncident,
      id: newId
    };
    setIncidents([incidentWithId, ...incidents]);
  };

  const handleDeleteIncident = (id: number) => {
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  const incidentCounts = {
    total: incidents.length,
    high: incidents.filter(inc => inc.severity === 'High').length,
    medium: incidents.filter(inc => inc.severity === 'Medium').length,
    low: incidents.filter(inc => inc.severity === 'Low').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg shadow-blue-500/20">
              <Shield size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">AI Safety Incident Dashboard</h1>
              <p className="text-lg text-gray-600 mt-2">Monitor and manage AI safety incidents across all systems</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Incidents</p>
                <p className="text-3xl font-bold text-gray-900">{incidentCounts.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border-l-4 border-red-500 transform hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">High Severity</p>
                <p className="text-3xl font-bold text-gray-900">{incidentCounts.high}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Medium Severity</p>
                <p className="text-3xl font-bold text-gray-900">{incidentCounts.medium}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Low Severity</p>
                <p className="text-3xl font-bold text-gray-900">{incidentCounts.low}</p>
              </div>
            </div>
          </div>
        </div>

        <NewIncidentForm onSubmit={handleNewIncident} />
        
        <FilterControls
          currentFilter={filter}
          setFilter={setFilter}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        
        {incidentCounts.high > 0 && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 animate-pulse shadow-sm">
            <AlertTriangle size={24} className="text-red-500 flex-shrink-0" />
            <div>
              <span className="font-semibold">Active High-Severity Incidents</span>
              <p className="text-sm text-red-600 mt-1">
                {incidentCounts.high} high-severity {incidentCounts.high === 1 ? 'incident requires' : 'incidents require'} immediate attention.
              </p>
            </div>
          </div>
        )}
        
        <IncidentList 
          incidents={incidents} 
          filter={filter} 
          sortDirection={sortDirection}
          onDelete={handleDeleteIncident}
        />
      </div>
    </div>
  );
};

export default Dashboard;