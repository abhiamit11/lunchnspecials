import { LegalPages } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/legal-pages/')({
    component: LegalPages,
})
