import { CookiesPolicy } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/cookies-policy')({
  component: CookiesPolicy,
})
