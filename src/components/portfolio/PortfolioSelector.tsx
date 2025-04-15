"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PortfolioSelectorProps } from "@/types/ui/PortfolioSelectorProps";
import { format } from "date-fns";

export default function PortfolioSelector({
  portfolios,
  selectedId,
  onChange,
}: PortfolioSelectorProps) {
  return (
    <Select value={selectedId} onValueChange={onChange}>
      <SelectTrigger className="w-[220px] cursor-pointer">
        <SelectValue placeholder="Select a portfolio" />
      </SelectTrigger>
      <SelectContent>
        {portfolios.map((p) => {
          const sameName =
            portfolios.filter((other) => other.name === p.name).length > 1;
          return (
            <SelectItem key={p.id} value={p.id} className="cursor-pointer">
              {p.name}
              {sameName && (
                <span className="ml-2 text-xs px-1 py-0.5 bg-slate-200 text-slate-700 rounded">
                  {p.createdAt
                    ? format(new Date(p.createdAt), "MM/dd")
                    : "duplicate"}
                </span>
              )}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
