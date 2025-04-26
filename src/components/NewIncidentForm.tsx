import React, { useState } from 'react';
import { Incident, SeverityLevel } from '../types/incident';
import { PlusCircle, X, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface NewIncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id'>) => void;
}

const NewIncidentForm: React.FC<NewIncidentFormProps> = ({ onSubmit }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('Medium');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSeverity('Medium');
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newIncident: Omit<Incident, 'id'> = {
        title,
        description,
        severity,
        reported_at: new Date().toISOString()
      };
      
      onSubmit(newIncident);
      resetForm();
      setIsFormVisible(false);
    }
  };

  const getSeverityIcon = (level: SeverityLevel) => {
    switch (level) {
      case 'High':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'Medium':
        return <AlertCircle size={16} className="text-amber-500" />;
      case 'Low':
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={toggleForm}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          isFormVisible
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
        }`}
      >
        {isFormVisible ? (
          <>
            <X size={18} />
            <span>Cancel</span>
          </>
        ) : (
          <>
            <PlusCircle size={18} />
            <span>Report New Incident</span>
          </>
        )}
      </button>
      
      {isFormVisible && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slideDown">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Report New AI Safety Incident</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Incident Title*
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.title ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow`}
                placeholder="Concise title describing the incident"
              />
              {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description*
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.description ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow`}
                placeholder="Detailed description of what happened, impact, and context"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level*
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['Low', 'Medium', 'High'] as SeverityLevel[]).map((level) => (
                  <label
                    key={level}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      severity === level
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={severity === level}
                      onChange={() => setSeverity(level)}
                      className="sr-only"
                    />
                    {getSeverityIcon(level)}
                    <span className={`font-medium ${severity === level ? 'text-blue-700' : 'text-gray-700'}`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all duration-200 hover:shadow"
              >
                Submit Incident
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewIncidentForm;