import { Dispatch, SetStateAction } from "react";

export interface NewTradeDialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
}
