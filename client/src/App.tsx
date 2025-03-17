import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import axios from "axios";
import { API_URL } from "./constant";
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from "@tanstack/react-router";

axios.defaults.baseURL = API_URL;
const queryClient = new QueryClient()


// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App