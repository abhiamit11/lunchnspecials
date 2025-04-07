import { CookiesPolicy } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_dashboard/legal-pages/cookies-policy',
)({
  component: CookiesPolicy,
})