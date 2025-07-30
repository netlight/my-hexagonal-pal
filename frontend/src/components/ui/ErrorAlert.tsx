import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import type { ApiErrorResponse } from '../../lib/errorUtils';

interface ErrorAlertProps {
  error: ApiErrorResponse;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorAlert({ error, onDismiss, className = '' }: ErrorAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={`rounded-lg bg-red-50 border border-red-200 p-4 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{error.message}</p>
          
          {error.details && error.details.length > 0 && (
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
              {error.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="ml-3 flex-shrink-0 text-red-400 hover:text-red-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}