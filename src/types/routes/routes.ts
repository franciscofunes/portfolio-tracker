export type RouteParams<T extends Record<string, string>> = {
  params: T;
};

export type SymbolRouteParams = RouteParams<{ symbol: string }>;
export type IdRouteParams = RouteParams<{ id: string }>;