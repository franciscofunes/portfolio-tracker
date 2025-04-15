export type UserContextType = {
  user: { id: string; name: string; email: string } | null;
  isLoading: boolean;
  error: unknown;
};