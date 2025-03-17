import { TermsConditions } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/terms-conditions')({
  component: TermsConditions,
})