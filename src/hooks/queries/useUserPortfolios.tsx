import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function useUserPortfolios(userId?: string) {
  return useQuery({
    queryKey: ['portfolios', userId],
    queryFn: async () => {
      const res = await api.get('/portfolios');
      return res.data;
    },
  });
}