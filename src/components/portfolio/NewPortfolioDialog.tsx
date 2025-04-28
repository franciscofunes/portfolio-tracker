"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreatePortfolio } from "@/hooks/mutations/userCreatePortfolio";
import { useCurrentUser } from "@/hooks/queries/useCurrentUser";
import { ApiError } from "@/types/routes/routes";
import { NewPortfolioDialogProps } from "@/types/ui/NewPortfolioDialogProps";
import { portfolioSchema } from "@/validations/portfolio";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const NewPortfolioDialog = ({ open: externalOpen, setOpen: setExternalOpen, trigger }: NewPortfolioDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = externalOpen !== undefined && setExternalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? setExternalOpen : setInternalOpen;
  
  const {
    mutate,
    isPending: isCreating,
    error: createError,
  } = useCreatePortfolio();
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useCurrentUser();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(portfolioSchema.omit({ userId: true })),
  });

  const onSubmit = (data: { title: string }) => {
    if (!user?.id) {
      setErrorMessage("User information not available");
      return;
    }

    mutate(
      { title: data.title, userId: user.id },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
        onError: (err: ApiError) => {
          console.error("Mutation error:", err);
          setErrorMessage(
            err?.response?.data?.error || err?.message || "Failed to create portfolio"
          );
        },
      }
    );
  };

  useEffect(() => {
    if (!open) {
      reset();
      setErrorMessage(null);
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!trigger && !isControlled && (
        <DialogTrigger asChild>
          <Button variant="outline">+ Portfolio</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Portfolio</DialogTitle>
        </DialogHeader>

        {isLoadingUser ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="title">Name</Label>
              <Input
                id="title"
                placeholder="e.g. Tech Stocks, Dividend Growth"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title.message?.toString()}
                </p>
              )}
            </div>

            {(errorMessage || createError || userError) && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {errorMessage ||
                    (createError instanceof Error ? createError.message : "") ||
                    (userError instanceof Error
                      ? "Failed to load user information"
                      : "")}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isCreating || !user}>
              {isCreating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};