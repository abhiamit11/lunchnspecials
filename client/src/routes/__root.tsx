import Footer from '@/components/Footer'
import { DEV } from '@/constant'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            {false && DEV && <TanStackRouterDevtools />}
            <Footer />
        </>
    ),
})