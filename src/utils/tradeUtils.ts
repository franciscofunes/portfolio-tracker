import { BackendTrade, TradeCardData } from "@/types/domain/trade";

export const mapTradeDataToCards = (trades: BackendTrade[]): TradeCardData[] => {
  const tradeCards: TradeCardData[] = [];
  
  trades.forEach((trade) => {
    console.log("Trade data to map:", trade.id, trade.exitPrice);
    let profit = 0;
    if (trade.exitPrice) {
      profit = (trade.exitPrice - trade.price) * trade.quantity;
    } else if (trade.type === "SELL") {
      profit = trade.price * trade.quantity;
    }
    
    tradeCards.push({
      id: trade.id,
      ticker: trade.asset.symbol,
      entry: trade.price,
      exit: trade.exitPrice || 0,
      quantity: trade.quantity,
      profit: profit,
      date: trade.date,
    });
  });
  
  return tradeCards.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};