import useAuth from '@/hooks/use-auth'
import { DashboardLayout } from '@/layouts'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

const AuthenticatedComponent = () => {
  const navigate = Route.useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" })
    }
  }, [token, navigate]) // Add 'token' as a dependency

  if (!token) return null;

  return (<DashboardLayout />)
}

export const Route = createFileRoute('/_dashboard')({
  component: AuthenticatedComponent,
  notFoundComponent: () => {
    return <p className='text-red-400'>This dashboard page doesn't exist!</p>
  },
})

