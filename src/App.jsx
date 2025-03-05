import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/Router";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};
