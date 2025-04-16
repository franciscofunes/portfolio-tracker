"use client"

import { usePortfolio } from "@/Contexts/PortfolioContext";
import { useTrades } from "@/hooks/queries/useTrades";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton";
import { PnlChartProps } from "@/types/ui/PnlChartProps";

export default function PnlChart({ trades }: PnlChartProps) {
  const { selectedPortfolioId } = usePortfolio();
  const { data, isLoading } = useTrades(selectedPortfolioId || "");
  
  const tradesData = trades || data || [];

  if (isLoading && !trades) {
    return <Skeleton className="w-full h-[300px] rounded-md" />;
  }

  if (!tradesData.length) {
    return (
      <div className="w-full h-[300px] bg-white rounded border p-4 flex items-center justify-center">
        <p className="text-muted-foreground">No trade data available for this portfolio</p>
      </div>
    );
  }

  const chartData = [];
  let cumulativePnl = 0;
  
  const sortedData = [...tradesData].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  for (let i = 0; i < sortedData.length; i++) {
    const item = sortedData[i];
    
    if (item && typeof item === 'object') {
      if (item.type === "BUY" && typeof item.price === 'number' && typeof item.quantity === 'number') {
        cumulativePnl -= item.price * item.quantity;
      } 
      else if (item.type === "SELL" && typeof item.price === 'number' && typeof item.quantity === 'number') {
        cumulativePnl += item.price * item.quantity;
      }
      
      if (item.date) {
        const dateObj = new Date(item.date);
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const day = dateObj.getDate();
        
        chartData.push({
          date: `${month} ${day}`,
          pnl: cumulativePnl
        });
      }
    }
  }

  return (
    <div className="w-full h-[300px] bg-white rounded border p-4">
      <h3 className="font-semibold text-lg mb-2">Cumulative PnL</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pnl" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}