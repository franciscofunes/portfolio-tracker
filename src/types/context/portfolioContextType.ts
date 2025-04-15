export type PortfolioContextType = {
    selectedPortfolioId: string | null;
    setSelectedPortfolioId: (id: string) => void;
    portfolios: any[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  };