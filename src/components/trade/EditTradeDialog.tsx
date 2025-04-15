"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import { EditTradeDialogProps } from "@/types/ui/EditTradeDialogProps";
import { EditTradeFormValues, editTradeSchema } from "@/validations/trade";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const EditTradeDialog = ({
  isOpen,
  onClose,
  tradeId,
  initialData,
  onSuccess,
}: EditTradeDialogProps) => {
  const { updateTrade } = usePortfolio();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTradeFormValues>({
    resolver: zodResolver(editTradeSchema),
    defaultValues: {
      ticker: initialData.ticker,
      quantity: initialData.quantity,
      entry: initialData.entry,
      exit: initialData.exit,
      date: new Date(initialData.date).toISOString().split('T')[0],
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        ticker: initialData.ticker,
        quantity: initialData.quantity,
        entry: initialData.entry,
        exit: initialData.exit,
        date: new Date(initialData.date).toISOString().split('T')[0],
      });
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data: EditTradeFormValues) => {
    if (!tradeId) {
      setErrorMessage("Missing trade ID");
      return;
    }
  
    setIsPending(true);
    
    try {
      await updateTrade(tradeId, data);
      setErrorMessage(null);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to update trade:", error);
      setErrorMessage(error?.message || "Failed to update trade");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Trade</DialogTitle>
        </DialogHeader>
        
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="ticker">Ticker</Label>
            <Input
              id="ticker"
              placeholder="e.g. AAPL"
              {...register("ticker")}
              className={errors.ticker ? "border-red-500" : ""}
            />
            {errors.ticker && (
              <p className="text-red-500 text-sm">{errors.ticker.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="e.g. 10"
              step="0.01"
              {...register("quantity", { valueAsNumber: true })}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="entry">Entry Price</Label>
            <Input
              id="entry"
              type="number"
              placeholder="e.g. 150.00"
              step="0.01"
              {...register("entry", { valueAsNumber: true })}
              className={errors.entry ? "border-red-500" : ""}
            />
            {errors.entry && (
              <p className="text-red-500 text-sm">{errors.entry.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="exit">Exit Price</Label>
            <Input
              id="exit"
              type="number"
              placeholder="e.g. 160.00"
              step="0.01"
              {...register("exit", { valueAsNumber: true })}
              className={errors.exit ? "border-red-500" : ""}
            />
            {errors.exit && (
              <p className="text-red-500 text-sm">{errors.exit.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className={errors.date ? "border-red-500" : ""}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};