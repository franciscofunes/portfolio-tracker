export interface EditTradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: string;
  initialData: {
    ticker: string;
    entry: number;
    exit: number;
    quantity: number;
    date: string;
  };
  onSuccess?: () => void;
}