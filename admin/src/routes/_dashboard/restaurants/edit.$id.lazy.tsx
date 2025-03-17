import { EditRestaurant } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/restaurants/edit/$id')({
    component: EditRestaurant,
})
