import { AddRestaurant } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/restaurants/add')({
  component: AddRestaurant,
});