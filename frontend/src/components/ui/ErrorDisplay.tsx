import { useEffect, useState } from 'react';
import ErrorAlert from './ErrorAlert';
import { extractErrorMessage, type ApiErrorResponse } from '../../lib/errorUtils';

interface ErrorDisplayProps {
  error: unknown;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorDisplay({ error, onDismiss, className }: ErrorDisplayProps) {
  const [errorMessage, setErrorMessage] = useState<ApiErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processError = async () => {
      try {
        const processedError = await extractErrorMessage(error);
        setErrorMessage(processedError);
      } catch (processingError) {
        console.error('Error processing error message:', processingError);
        setErrorMessage({
          message: 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    processError();
  }, [error]);

  if (isLoading) {
    return (
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
        <div className="text-sm text-gray-600">Loading error details...</div>
      </div>
    );
  }

  if (!errorMessage) {
    return null;
  }

  return (
    <ErrorAlert 
      error={errorMessage} 
      onDismiss={onDismiss}
      className={className}
    />
  );
}