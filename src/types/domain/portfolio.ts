import { Transaction } from "./transaction";

export interface Portfolio {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  balance: number;
  transactions: Transaction[]; 
}
