import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioCardProps } from "@/types/ui/PortfolioCardProps";

export function PortfolioCard({ name, value, onClick }: PortfolioCardProps) {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Total Value</p>
        <p className="text-xl font-semibold">${value.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
