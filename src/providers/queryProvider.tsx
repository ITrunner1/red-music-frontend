'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  })

interface QueryProviderProps { 
    children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({
    children
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider> 
    )
}

export default QueryProvider;