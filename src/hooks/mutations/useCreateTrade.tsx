import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { TradeFormValues } from "@/validations/trade";

export function useCreateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTrade: TradeFormValues) => {
      const res = await api.post(`/portfolios/${newTrade.portfolioId}/trades`, newTrade);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["trades", variables.portfolioId] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ["trades"]
      });
    },
  });
}