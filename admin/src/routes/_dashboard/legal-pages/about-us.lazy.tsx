import { AboutUs } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/legal-pages/about-us')({
    component: AboutUs,
})
