import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incomeApi } from '../lib/api';
import type { NewIncomeStream, NewEarning } from '../generated/api/src';

// Hook to fetch all income streams
export const useIncomeStreams = () => {
  return useQuery({
    queryKey: ['income-streams'],
    queryFn: () => incomeApi.getAllIncomeStreams(),
  });
};

// Hook for creating a new income stream
export const useCreateIncomeStream = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newIncomeStream: NewIncomeStream) => 
      incomeApi.createIncomeStream({ newIncomeStream }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-streams'] });
    },
  });
};

// Hook for registering earnings to an income stream
export const useRegisterEarning = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ incomeStreamId, earning }: { incomeStreamId: string; earning: NewEarning }) =>
      incomeApi.registerEarning({ incomeStreamId, newEarning: earning }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-streams'] });
    },
  });
};