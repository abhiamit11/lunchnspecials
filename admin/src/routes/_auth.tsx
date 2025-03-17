import useAuth from '@/hooks/use-auth'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { token } = useAuth()
  useEffect(() => {
    if (token) {
      navigate({ to: "/" })
    }
  }, [token, navigate]) // Add 'token' as a dependency

  return (<Outlet />)
}
