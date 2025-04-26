/**
 * Formats a date string into a more readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Compares two dates for sorting
 */
export const compareDates = (a: string, b: string, isNewest: boolean): number => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return isNewest ? dateB - dateA : dateA - dateB;
};