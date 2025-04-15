import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import { AlertTriangle } from "lucide-react";
import PortfolioSelector from "../portfolio/PortfolioSelector";

const Header = () => {
  const {
    portfolios,
    selectedPortfolioId,
    setSelectedPortfolioId,
    isLoading,
    isError,
    error,
  } = usePortfolio();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-48 rounded-md" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching portfolios."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No Portfolios Found</AlertTitle>
        <AlertDescription>
          You have no portfolios. Please create one to get started.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <PortfolioSelector
        portfolios={portfolios.map((p) => ({
          id: p.id,
          name: p.title,
          createdAt: p.createdAt,
        }))}
        selectedId={selectedPortfolioId || ""}
        onChange={setSelectedPortfolioId}
      />
    </div>
  );
};

export default Header;
