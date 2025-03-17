import { Restaurants } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/restaurants/')({
  component: Restaurants,
})
