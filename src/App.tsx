import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Router from './Router'

function App() {
    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <Router />
                </ChakraProvider>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position='bottom-right'
                />
            </QueryClientProvider>
        </>
    )
}

export default App;
