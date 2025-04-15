'use client';

import { useUserPortfolios } from '@/hooks/queries/useUserPortfolios';
import { PortfolioContextType } from '@/types/context/portfolioContextType';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const PortfolioContext = createContext<PortfolioContextType>({
  selectedPortfolioId: null,
  setSelectedPortfolioId: () => {},
  portfolios: [],
  isLoading: false,
  isError: false,
  error: null,
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const { data: portfolios, isLoading, isError, error } = useUserPortfolios();

  useEffect(() => {
    if (portfolios && portfolios.length > 0 && !selectedPortfolioId) {
      setSelectedPortfolioId(portfolios[0].id);
    }
  }, [portfolios, selectedPortfolioId]);

  return (
    <PortfolioContext.Provider 
      value={{ 
        selectedPortfolioId, 
        setSelectedPortfolioId, 
        portfolios, 
        isLoading, 
        isError, 
        error 
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);