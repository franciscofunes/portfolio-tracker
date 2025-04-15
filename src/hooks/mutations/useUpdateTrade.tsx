import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      portfolioId: string;
      tradeId: string;
      ticker: string;
      quantity: number;
      entry: number;
      exit: number;
      date: string;
    }) => {
      const { portfolioId, tradeId, ticker, quantity, entry, date, exit } = data;

      const assetRes = await api.get(`assets/symbol/${ticker}`);
      const asset = assetRes.data;

      if (!asset?.id) {
        throw new Error("Asset not found for ticker: " + ticker);
      }

      const payload = {
        type: "BUY",
        quantity,
        price: entry,
        exitPrice: exit,
        date,
        assetId: asset.id,
        portfolioId
      };      

      return api.put(`trades/${portfolioId}/${tradeId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-trades"] });
    },
  });
}