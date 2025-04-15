import { z } from "zod";

export const tradeFormSchema = z.object({
  type: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive(),
  price: z.number().positive(),
  exitPrice: z.number().optional().nullable(),
  date: z.string(),
  assetId: z.string().min(1, "Asset ID is required"),
  portfolioId: z.string().uuid(),
});

export type TradeFormValues = z.infer<typeof tradeFormSchema>;

export const editTradeSchema = z.object({
  ticker: z.string().min(1, "Ticker is required"),
  quantity: z.number().positive("Quantity must be positive"),
  entry: z.number().positive("Entry price must be positive"),
  exit: z.number().positive("Exit price must be positive"),
  date: z.string().min(1, "Date is required"),
});

export type EditTradeFormValues = z.infer<typeof editTradeSchema>;
