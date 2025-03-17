import NotFound from '@/components/not-found'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/context/auth-provider'
import ReactQueryProvider from '@/lib/react-query-provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <AuthProvider>
            <ReactQueryProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Outlet />
                </ThemeProvider>
                <Toaster />
               {/* <TanStackRouterDevtools /> */}
            </ReactQueryProvider>
        </AuthProvider>
    ),
    notFoundComponent: () => <NotFound />,
})
