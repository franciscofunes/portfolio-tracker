export interface Position {
    quantity: number;
    price: number;
    date: string;
    tradeId: string;
  }
  
  export interface OpenPosition {
    assetId: string;
    symbol: string;
    name: string;
    quantity: number;
    averagePrice: number;
    currentValue?: number;
    positions: Position[];
  }