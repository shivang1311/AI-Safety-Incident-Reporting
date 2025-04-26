export type SeverityLevel = 'Low' | 'Medium' | 'High';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: SeverityLevel;
  reported_at: string;
}

export type SortDirection = 'newest' | 'oldest';
export type FilterType = 'All' | SeverityLevel;