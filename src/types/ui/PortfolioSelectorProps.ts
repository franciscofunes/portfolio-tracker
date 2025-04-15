import { Portfolio } from '@/types/domain/portfolio';

type PortfolioDisplay = {
  id: Portfolio['id'];
  name: string;
  createdAt?: Portfolio['createdAt'];
};

export interface PortfolioSelectorProps {
  portfolios: PortfolioDisplay[];
  selectedId: string;
  onChange: (id: string) => void;
}