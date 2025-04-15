import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useTrades(portfolioId: string | undefined) {
  return useQuery({
    queryKey: ["trades", portfolioId],
    queryFn: async () => {
      if (!portfolioId) return [];
      const res = await api.get(`/portfolios/${portfolioId}/trades`);
      return res.data;
    },
    enabled: !!portfolioId,
  });
}
