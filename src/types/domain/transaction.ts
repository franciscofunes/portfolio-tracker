import { Asset } from "./asset";
import { Portfolio } from "./portfolio";

export type Transaction = {
  id: string;
  type: string;
  quantity: number;
  price: number;
  date: string;
  portfolioId: string;
  assetId: string;
  createdAt: string;
};

export type TransactionWithAsset = Transaction & {
  asset: Asset;
  Portfolio: Portfolio;
};
