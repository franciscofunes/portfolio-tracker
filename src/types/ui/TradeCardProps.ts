export interface TradeCardProps {
  ticker: string;
  entry: number;
  exit: number;
  qty: number;
  profit: number;
  date: string;
  id?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}