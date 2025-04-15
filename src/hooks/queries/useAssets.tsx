import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Asset } from "@/types/domain/asset";

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await api.get("/assets");
      return response.data as Asset[];
    },
  });
}
