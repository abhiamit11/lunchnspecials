import { Button } from "@/components/ui/button"
import RestaurantForm from "../form/restaurant-form"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { Save } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { editformSchema } from "../schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getRestaurant, updateRestaurant } from "../api"
import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"
import { EditformType } from "../types"

const defaultValues = {
    name: "",
    address: "",
    zip: "",
    url: "",
    coordinates: { latitude: "", longitude: "" },
    menu: [],
    // timings: { opening: "", closing: "" },
    description: ""
};

function EditRestaurant() {
    const queryClient = useQueryClient()
    const navigate = useNavigate({ from: '' })
    const { id: restaurantId } = useParams({ from: '' })

    const { data, isSuccess, isError } = useQuery({
        queryKey: ["restaurant", restaurantId], //Array according to Documentation
        queryFn: async () => await getRestaurant(restaurantId)
    });


    const form = useForm<EditformType>({
        resolver: zodResolver(editformSchema),
        defaultValues
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditformType) => updateRestaurant(restaurantId, data),
        onSuccess: () => {
            form.reset(defaultValues)
            queryClient.invalidateQueries({ queryKey: ["restaurant", restaurantId] })
            toast({
                variant: 'success',
                title: "Restaurant has been successfully updated.",
            });

            navigate({ to: '/restaurants' })
        },
    })

    // Define a submit handler.
    function onSubmit(values: EditformType) {
        mutate(values)
    }

    useEffect(() => {
        if (isSuccess) {
            const { data: restaurantData } = data
            form.reset(restaurantData)
        }

        return () => {

        }
    }, [isSuccess])

    if (isError) {
        return null;
    }
    if (isSuccess) {
        return (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center p-4 rounded-lg">
                            <h1 className="text-2xl font-medium">Edit Restaurant</h1>

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
}

export default EditRestaurant