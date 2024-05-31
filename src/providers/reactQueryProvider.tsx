'use client';

import { QueryClient, QueryClientProvider } from "react-query";

interface ReactQueryProps { 
    children: React.ReactNode;
};

const ReactQueryProvider: React.FC<ReactQueryProps> = ({
    children
}) => {
    return (
        <QueryClientProvider client={new QueryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider;