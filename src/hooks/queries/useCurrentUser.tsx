import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await api.get('/current-user');
      return res.data;
    },
  });
}