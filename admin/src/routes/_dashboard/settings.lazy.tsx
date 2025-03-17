import { Settings } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/settings')({
    component: Settings,
})