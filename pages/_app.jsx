import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from "react-query"

if (typeof window !== 'undefined') require("../mocks");

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
