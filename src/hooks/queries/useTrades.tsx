import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Trade } from "@/types/domain/trade";

export function useTrades(portfolioId: string) {
  return useQuery({
    queryKey: ["trades", portfolioId],
    queryFn: async (): Promise<Trade[]> => {
      if (!portfolioId) {
        return [];
      }
      const res = await api.get(`/portfolios/${portfolioId}/trades`);
      return res.data;
    },
    enabled: !!portfolioId,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}