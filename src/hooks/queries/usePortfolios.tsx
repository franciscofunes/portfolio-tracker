import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function usePortfolios() {
  return useQuery({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const res = await api.get('/portfolios');
      return res.data;
    },
  });
}
