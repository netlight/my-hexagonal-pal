import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateBudget } from '../../hooks/useBudgets';
import Button from '../ui/Button';
import ErrorAlert from '../ui/ErrorAlert';
import { extractErrorMessage } from '../../lib/errorUtils';
import { useState } from 'react';

const createBudgetSchema = z.object({
  name: z.string().min(1, 'Budget name is required'),
  limit: z.number({
    required_error: 'Budget limit is required',
    invalid_type_error: 'Budget limit must be a valid number',
  }).min(0.01, 'Budget limit must be greater than 0'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type CreateBudgetFormData = z.infer<typeof createBudgetSchema>;

interface CreateBudgetFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateBudgetForm({ onSuccess, onCancel }: CreateBudgetFormProps) {
  const createBudgetMutation = useCreateBudget();
  const [apiError, setApiError] = useState<Awaited<ReturnType<typeof extractErrorMessage>> | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateBudgetFormData>({
    resolver: zodResolver(createBudgetSchema),
  });

  const onSubmit = async (data: CreateBudgetFormData) => {
    setApiError(null); // Clear previous errors
    
    try {
      // Convert date strings to Date objects if provided
      const startDate = data.startDate ? new Date(data.startDate + 'T00:00:00.000Z') : undefined;
      const endDate = data.endDate ? new Date(data.endDate + 'T23:59:59.999Z') : undefined;
      
      await createBudgetMutation.mutateAsync({
        name: data.name,
        limit: data.limit,
        startDate,
        endDate,
      });
      reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to create budget:', error);
      const errorMessage = await extractErrorMessage(error);
      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Budget Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g., Groceries, Entertainment, Travel"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="limit" className="block text-sm font-medium text-slate-700 mb-1">
          Budget Limit (€)
        </label>
        <input
          id="limit"
          type="number"
          step="0.01"
          min="0"
          {...register('limit', { valueAsNumber: true })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="0.00"
        />
        {errors.limit && (
          <p className="mt-1 text-sm text-red-600">{errors.limit.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
            Start Date (Optional)
          </label>
          <input
            id="startDate"
            type="date"
            {...register('startDate')}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
            End Date (Optional)
          </label>
          <input
            id="endDate"
            type="date"
            {...register('endDate')}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
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
          Create Budget
        </Button>
      </div>
    </form>
  );
}