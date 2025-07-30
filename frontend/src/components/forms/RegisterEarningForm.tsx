import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterEarning } from '../../hooks/useIncomeStreams';
import Button from '../ui/Button';
import ErrorAlert from '../ui/ErrorAlert';
import { extractErrorMessage } from '../../lib/errorUtils';
import { useState } from 'react';

const registerEarningSchema = z.object({
  name: z.string().min(1, 'Earning description is required'),
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a valid number',
  }).min(0.01, 'Amount must be greater than 0'),
});

type RegisterEarningFormData = z.infer<typeof registerEarningSchema>;

interface RegisterEarningFormProps {
  incomeStreamId: string;
  incomeStreamName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function RegisterEarningForm({ incomeStreamId, incomeStreamName, onSuccess, onCancel }: RegisterEarningFormProps) {
  const registerEarningMutation = useRegisterEarning();
  const [apiError, setApiError] = useState<Awaited<ReturnType<typeof extractErrorMessage>> | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterEarningFormData>({
    resolver: zodResolver(registerEarningSchema),
  });

  const onSubmit = async (data: RegisterEarningFormData) => {
    setApiError(null); // Clear previous errors
    
    try {
      await registerEarningMutation.mutateAsync({
        incomeStreamId,
        earning: {
          name: data.name,
          amount: data.amount,
        },
      });
      reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to register earning:', error);
      const errorMessage = await extractErrorMessage(error);
      setApiError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 mb-4">
        <p className="text-sm text-purple-800">
          Adding earning to: <span className="font-semibold">{incomeStreamName}</span>
        </p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Earning Description
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g., Monthly Salary, Project Payment, Bonus"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
          Register Earning
        </Button>
      </div>
    </form>
  );
}