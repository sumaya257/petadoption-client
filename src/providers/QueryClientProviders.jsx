import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient()

const QueryClientProviders = ({children}) => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                
                    {children}
                
            </QueryClientProvider>
        </div>
    );
};

export default QueryClientProviders;