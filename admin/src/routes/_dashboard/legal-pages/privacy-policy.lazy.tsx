import { PrivacyPolicy } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
    '/_dashboard/legal-pages/privacy-policy',
)({
    component: PrivacyPolicy,
})