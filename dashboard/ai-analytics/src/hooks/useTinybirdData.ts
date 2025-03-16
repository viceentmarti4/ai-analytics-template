import { useQuery } from '@tanstack/react-query';
import { fetchLLMUsage, fetchGenericCounter, fetchLLMMessages } from '@/services/tinybird';
import { useTinybirdToken } from '@/providers/TinybirdProvider';

export function useLLMUsage(filters: Record<string, string>) {
  const { token } = useTinybirdToken();

  return useQuery({
    queryKey: ['llm-usage', filters],
    queryFn: () => fetchLLMUsage(token!, filters),
    enabled: !!token
  });
}

export function useGenericCounter(dimension: string, filters: Record<string, string>) {
  const { token } = useTinybirdToken();
  const allFilters = {
    ...filters,
    dimension
  };

  return useQuery({
    queryKey: ['generic-counter', dimension, filters],
    queryFn: () => fetchGenericCounter(token!, allFilters)
  });
}

export function useLLMMessages(filters: Record<string, string>) {
  const { token } = useTinybirdToken();

  return useQuery({
    queryKey: ['llm-messages', filters],
    queryFn: () => fetchLLMMessages(token!, filters),
    enabled: !!token
  });
} 