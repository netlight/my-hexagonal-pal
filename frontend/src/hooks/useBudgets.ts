import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetsApi, expensesApi } from '../lib/api';
import type { NewBudget, NewExpense } from '../generated/api/src';

// Hook to fetch all budgets - React Query automatically handles loading/error states
export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'], // Unique key for caching
    queryFn: () => budgetsApi.getBudgets(), // Function that returns the API call
  });
};

// Hook to fetch a specific budget by ID
export const useBudget = (budgetId: string) => {
  return useQuery({
    queryKey: ['budget', budgetId],
    queryFn: () => budgetsApi.findBudgetById({ budgetId }),
    enabled: !!budgetId, // Only run query if budgetId exists
  });
};

// Hook for creating a new budget - returns mutation function
export const useCreateBudget = () => {
  const queryClient = useQueryClient(); // Access to React Query cache
  
  return useMutation({
    mutationFn: (newBudget: NewBudget) => budgetsApi.createBudget({ newBudget }),
    onSuccess: () => {
      // Invalidate budgets cache so it refetches automatically
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

// Hook for tracking expenses - the main feature for your demo
export const useTrackExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ budgetId, expense }: { budgetId: string; expense: NewExpense }) =>
      expensesApi.trackExpense({ budgetId, newExpense: expense }),
    onSuccess: (_, variables) => {
      // Invalidate related caches to show updated data
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['budget', variables.budgetId] });
    },
  });
};