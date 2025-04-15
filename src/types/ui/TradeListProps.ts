import { BackendTrade } from "../domain/trade";

export interface TradesListProps {
    trades: BackendTrade[];
    onTradeDelete?: (tradeId: string) => void;
    onTradeEdit?: () => void;
  }