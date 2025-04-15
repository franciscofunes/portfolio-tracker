import { TradesListProps } from "@/types/ui/TradeListProps";
import { mapTradeDataToCards } from "@/utils/tradeUtils";
import { TradeCard } from "./TradeCard";

export const TradeList: React.FC<TradesListProps> = ({
  trades,
  onTradeDelete,
  onTradeEdit,
}) => {
  const tradeCards: Array<{
    id: string;
    ticker: string;
    entry: number;
    exit: number;
    quantity: number;
    profit: number;
    date: string;
  }> = trades && trades.length > 0 ? mapTradeDataToCards(trades) : [];

  const handleDelete = (tradeId: string) => {
    onTradeDelete?.(tradeId);
  };

  const handleEdit = () => {
    onTradeEdit?.();
  };

  return (
    <div className="space-y-4">
      {tradeCards.length > 0 ? (
        tradeCards.map((trade) => (
          <TradeCard
            key={trade.id}
            id={trade.id}
            ticker={trade.ticker}
            entry={trade.entry}
            exit={trade.exit}
            qty={trade.quantity}
            profit={trade.profit}
            date={trade.date}
            onDelete={() => handleDelete(trade.id)}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No trades found. Add your first trade to get started.
        </div>
      )}
    </div>
  );
};
