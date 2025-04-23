export type RouteParams<T extends Record<string, string>> = {
  params: Promise<T>;
};

export type SymbolRouteParams = RouteParams<{ symbol: string }>;
export type IdRouteParams = RouteParams<{ id: string }>;
export type PortfolioRouteParams = RouteParams<{ portfolioId: string }>;
export type PortfolioTradeRouteParams = RouteParams<{ portfolioId: string; tradeId: string }>;
