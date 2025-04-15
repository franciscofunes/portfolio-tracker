import { NewPortfolioDialog } from "../portfolio/NewPortfolioDialog";
import { NewTradeDialog } from "../trade/NewTradeDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import { AlertTriangle } from "lucide-react";
import PortfolioSelector from "../portfolio/PortfolioSelector";

export const TopBar = () => {
  const {
    portfolios,
    selectedPortfolioId,
    setSelectedPortfolioId,
    isLoading,
    isError,
    error,
  } = usePortfolio();

  const calculatePortfolioValue = (transactions: any[]) => {
    return transactions.reduce((total, transaction) => {
      return total + transaction.quantity * transaction.price;
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <NewTradeDialog />
          <NewPortfolioDialog />
        </div>
        <Skeleton className="h-8 w-48 rounded-md" />
      </div>
    );
  }

  if (isError || !portfolios) {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <NewTradeDialog />
          <NewPortfolioDialog />
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred while fetching portfolios."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const selectedPortfolio = selectedPortfolioId
    ? portfolios.find((p) => p.id === selectedPortfolioId)
    : portfolios[0];

  const portfolioValue = selectedPortfolio?.transactions
    ? calculatePortfolioValue(selectedPortfolio.transactions)
    : 0;

  const portfolioName = selectedPortfolio?.title || "Unknown";

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-x-2">
        <NewTradeDialog />
        <NewPortfolioDialog />
      </div>
      <div className="font-semibold border rounded px-4 py-2 flex items-center space-x-3">
        <PortfolioSelector
          portfolios={portfolios.map((p) => ({ id: p.id, name: p.title }))}
          selectedId={selectedPortfolioId || portfolios[0]?.id || ""}
          onChange={setSelectedPortfolioId}
        />
        <span className="font-mono">${portfolioValue.toFixed(2)}</span>
      </div>
    </div>
  );
};
