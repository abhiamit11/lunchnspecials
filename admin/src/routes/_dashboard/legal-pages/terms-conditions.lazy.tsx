import { TermsConditions } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
    '/_dashboard/legal-pages/terms-conditions',
)({
    component: TermsConditions,
})
