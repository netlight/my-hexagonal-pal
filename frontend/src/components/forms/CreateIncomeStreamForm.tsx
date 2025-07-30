import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateIncomeStream } from '../../hooks/useIncomeStreams';
import Button from '../ui/Button';
import ErrorAlert from '../ui/ErrorAlert';
import { extractErrorMessage } from '../../lib/errorUtils';
import { useState } from 'react';

const createIncomeStreamSchema = z.object({
  name: z.string().min(1, 'Income stream name is required'),
});

type CreateIncomeStreamFormData = z.infer<typeof createIncomeStreamSchema>;

interface CreateIncomeStreamFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateIncomeStreamForm({ onSuccess, onCancel }: CreateIncomeStreamFormProps) {
  const createIncomeStreamMutation = useCreateIncomeStream();
  const [apiError, setApiError] = useState<Awaited<ReturnType<typeof extractErrorMessage>> | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateIncomeStreamFormData>({
    resolver: zodResolver(createIncomeStreamSchema),
  });

  const onSubmit = async (data: CreateIncomeStreamFormData) => {
    setApiError(null); // Clear previous errors
    
    try {
      await createIncomeStreamMutation.mutateAsync({
        name: data.name,
      });
      reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to create income stream:', error);
      const errorMessage = await extractErrorMessage(error);
      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Income Stream Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g., Full-time Salary, Freelance Work, Side Business"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {apiError && (
        <ErrorAlert 
          error={apiError} 
          onDismiss={() => setApiError(null)}
        />
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Income Stream
        </Button>
      </div>
    </form>
  );
}