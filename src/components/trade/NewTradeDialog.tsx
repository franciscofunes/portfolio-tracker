"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateTrade } from "@/hooks/mutations/useCreateTrade";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { tradeFormSchema, TradeFormValues } from "@/validations/trade";
import { usePortfolio } from "@/Contexts/PortfolioContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssets } from "@/hooks/queries/useAssets";
import { useQueryClient } from "@tanstack/react-query";

export const NewTradeDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateTrade();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { selectedPortfolioId } = usePortfolio();
  const queryClient = useQueryClient();
  const {
    data: assets = [],
    isLoading: isLoadingAssets,
    error: assetsError,
  } = useAssets();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TradeFormValues>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      type: "BUY",
      quantity: 0,
      price: 0,
      exitPrice: 0,
      date: new Date().toISOString().split("T")[0],
      assetId: "",
      portfolioId: selectedPortfolioId || "",
    },
  });

  const formPortfolioId = watch("portfolioId");

  useEffect(() => {
    if (selectedPortfolioId) {
      setValue("portfolioId", selectedPortfolioId);
    }
  }, [selectedPortfolioId, setValue]);

  useEffect(() => {
    if (open && selectedPortfolioId) {
      setValue("portfolioId", selectedPortfolioId);
    }
  }, [open, selectedPortfolioId, setValue]);

  useEffect(() => {
    if (assets.length > 0 && open) {
      setValue("assetId", assets[0].id);
    }
  }, [assets, open, setValue]);

  useEffect(() => {
    if (assetsError) {
      setErrorMessage("Failed to load assets");
    }
  }, [assetsError]);

  const onSubmit = (data: TradeFormValues) => {
    if (!data.portfolioId || data.portfolioId !== selectedPortfolioId) {
      console.warn(
        "Portfolio ID mismatch or missing! Form:",
        data.portfolioId,
        "Context:",
        selectedPortfolioId
      );

      data.portfolioId = selectedPortfolioId || "";

      if (!data.portfolioId) {
        setErrorMessage("No portfolio selected");
        return;
      }
    }

    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
        setErrorMessage(null);

        queryClient.invalidateQueries({
          queryKey: ["trades", data.portfolioId],
        });
        queryClient.refetchQueries({ queryKey: ["trades", data.portfolioId] });
      },
      onError: (error: any) => {
        console.error("Failed to create trade:", error);
        setErrorMessage(
          error?.response?.data?.error || "Failed to create trade"
        );
      },
    });
  };

  useEffect(() => {
    if (!open) {
      reset({
        type: "BUY",
        quantity: 0,
        price: 0,
        exitPrice: 0,
        date: new Date().toISOString().split("T")[0],
        assetId: "",
        portfolioId: selectedPortfolioId || "",
      });
      setErrorMessage(null);
    }
  }, [open, reset, selectedPortfolioId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Trade</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Trade</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="type">Trade Type</Label>
            <Select
              defaultValue="BUY"
              onValueChange={(value) =>
                setValue("type", value as "BUY" | "SELL")
              }
            >
              <SelectTrigger
                id="type"
                className={errors.type ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select trade type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUY">Buy</SelectItem>
                <SelectItem value="SELL">Sell</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assetId">Asset</Label>
            <Select
              onValueChange={(value) => setValue("assetId", value)}
              defaultValue={assets[0]?.id}
              disabled={isLoadingAssets}
            >
              <SelectTrigger
                id="assetId"
                className={errors.assetId ? "border-red-500" : ""}
              >
                {isLoadingAssets ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading assets...
                  </div>
                ) : (
                  <SelectValue placeholder="Select an asset" />
                )}
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assetId && (
              <p className="text-red-500 text-sm">{errors.assetId.message}</p>
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
            <Label htmlFor="price">Entry Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g. 150.00"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="exitPrice">Exit Price</Label>
            <Input
              id="exitPrice"
              type="number"
              placeholder="e.g. 160.00"
              step="0.01"
              {...register("exitPrice", { valueAsNumber: true })}
              className={errors.exitPrice ? "border-red-500" : ""}
            />
            {errors.exitPrice && (
              <p className="text-red-500 text-sm">{errors.exitPrice.message}</p>
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

          <input
            type="hidden"
            {...register("portfolioId")}
            data-portfolio-id={selectedPortfolioId}
          />

          {errorMessage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isPending || isLoadingAssets || !selectedPortfolioId}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Trade"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
