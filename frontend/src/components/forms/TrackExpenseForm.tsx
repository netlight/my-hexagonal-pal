import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTrackExpense } from '../../hooks/useBudgets';
import Button from '../ui/Button';
import ErrorAlert from '../ui/ErrorAlert';
import { extractErrorMessage } from '../../lib/errorUtils';
import { useState } from 'react';

const trackExpenseSchema = z.object({
  description: z.string().min(1, 'Expense description is required'),
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a valid number',
  }).min(0.01, 'Amount must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
});

type TrackExpenseFormData = z.infer<typeof trackExpenseSchema>;

interface TrackExpenseFormProps {
  budgetId: string;
  budgetName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TrackExpenseForm({ budgetId, budgetName, onSuccess, onCancel }: TrackExpenseFormProps) {
  const trackExpenseMutation = useTrackExpense();
  const [apiError, setApiError] = useState<Awaited<ReturnType<typeof extractErrorMessage>> | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TrackExpenseFormData>({
    resolver: zodResolver(trackExpenseSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // Today's date
    },
  });

  const onSubmit = async (data: TrackExpenseFormData) => {
    setApiError(null); // Clear previous errors
    
    try {
      // Create a proper Date object from the date string
      const expenseDate = new Date(data.date + 'T12:00:00.000Z'); // Set to noon UTC to avoid timezone issues
      
      await trackExpenseMutation.mutateAsync({
        budgetId,
        expense: {
          description: data.description,
          amount: data.amount,
          date: expenseDate, // Pass the Date object directly, not the ISO string
        },
      });
      reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to track expense:', error);
      const errorMessage = await extractErrorMessage(error);
      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 mb-4">
        <p className="text-sm text-indigo-800">
          Adding expense to: <span className="font-semibold">{budgetName}</span>
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
          Expense Description
        </label>
        <input
          id="description"
          type="text"
          {...register('description')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g., Lunch at restaurant, Gas station, Movie tickets"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
          Amount (€)
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          {...register('amount', { valueAsNumber: true })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
          Date
        </label>
        <input
          id="date"
          type="date"
          {...register('date')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
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
          Track Expense
        </Button>
      </div>
    </form>
  );
}