import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteTrade } from "@/hooks/mutations/useDeleteTrade";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { TradeCardProps } from "@/types/ui/TradeCardProps";

import { format, parseISO } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { EditTradeDialog } from "./EditTradeDialog";
import { usePortfolio } from "@/Contexts/PortfolioContext";

export const TradeCard = ({
  ticker,
  entry,
  exit,
  qty,
  profit,
  date,
  id,
  onDelete,
  onEdit,
}: TradeCardProps) => {
  const { selectedPortfolioId } = usePortfolio();
  const { mutate: deleteTrade, isPending: isDeleting } = useDeleteTrade();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    if (id && selectedPortfolioId) {
      deleteTrade({ portfolioId: selectedPortfolioId, tradeId: id }, {
        onSuccess: () => {
          if (onDelete) onDelete();
        },
      });
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">{ticker}</div>
              {id && (
                <div className="flex space-x-2 sm:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEdit}
                    title="Edit Trade"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        title="Delete Trade"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this trade record. This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-red-500 hover:bg-red-700"
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 mt-2">
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground">Quantity</div>
                <div className="font-medium">{qty}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground">Entry</div>
                <div className="font-medium">${entry.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground">Exit</div>
                <div className="font-medium">${exit.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-muted-foreground">Profit</div>
                <div
                  className={`font-medium ${profit >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ${profit.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">
              {format(parseISO(date), "MMM d, yyyy")}
            </div>
          </div>

          {id && (
            <div className="hidden sm:flex sm:items-start space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEdit}
                title="Edit Trade"
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    title="Delete Trade"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this trade record. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </CardContent>

      {id && (
        <EditTradeDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          tradeId={id}
          initialData={{
            ticker,
            entry,
            exit,
            quantity: qty,
            date,
          }}
          onSuccess={() => {
            setIsEditOpen(false);
            if (onEdit) onEdit();
          }}
        />
      )}
    </Card>
  );
};