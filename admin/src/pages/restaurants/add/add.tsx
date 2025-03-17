import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import { Save } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { formSchema } from "../schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addRestaurant } from "../api"
import { toast } from "@/hooks/use-toast"
import RestaurantForm from "../form/restaurant-form"
import { AddFormType } from "../types"

function AddRestaurant() {
    const queryClient = useQueryClient()
    const navigate = useNavigate({ from: '' })

    const { mutate, isPending } = useMutation({
        mutationFn: addRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] })

            toast({
                variant: 'success',
                title: "Restaurant has been successfully added.",
            });

            navigate({ to: '/restaurants' })
        },
    })

    const form = useForm<AddFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            zip: "",
            url: undefined,
            coordinates: { latitude: "", longitude: "" },
            menu: [],
            // timings: { opening: "", closing: "" }
        },
    })

    // Define a submit handler.
    function onSubmit(values: AddFormType) {
        mutate(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center p-4 rounded-lg">
                        <h1 className="text-2xl font-medium">Add a new Restaurant</h1>

                        <div className="flex justify-end items-center gap-2">
                            <Button variant="outline" asChild ><Link to="/restaurants"> Cancel </Link></Button>
                            <Button variant="default" type="submit" disabled={isPending}>{isPending ? 'Saving...' : <><Save /> Save</>}</Button>
                        </div>
                    </div>

                    <RestaurantForm />
                </form>
            </Form>
        </>
    )
}

export default AddRestaurant