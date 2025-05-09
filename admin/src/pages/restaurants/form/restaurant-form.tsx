import { FormInput, FormSwitch, FormTextarea } from "@/components/form"
import { FormLabel } from "@/components/ui/form"
import MenuForm from "./menu/menu-form"

function RestaurantForm() {
    return (
        <div className="grid xl:grid-cols-2 gap-x-4">
            <div className="rounded-lg bg-background mt-4 p-7 border border-foreground/20 shadow relative col-span-1">
                <div className="grid sm:grid-cols-2 gap-x-6 items-start">
                    <div className="grid grid-cols-1 gap-y-2.5">
                        <FormInput name="name" placeholder="Restaurant name" />

                        <FormInput name="url" label="URL" placeholder="Restaurant website" />

                        <div>
                            <FormLabel className="text-muted-foreground text-xs opacity-0">-</FormLabel>
                            <div className="grid sm:grid-cols-2 gap-x-4">
                                <FormInput type="number" name="phone" label="Phone" placeholder="Phone" />
                                <FormInput name="rating" label="Rating" placeholder="Rating" />
                            </div>
                        </div>

                        <FormTextarea name="description" className="resize-none" placeholder="Restaurant description" />
                    </div>

                    <div className="grid grid-cols-1 gap-y-2.5">
                        <FormInput name="address" label="Address" placeholder="Restaurant address" />

                        <FormInput type="number" name="zip" label="Zip" placeholder="Restaurant Zip" />

                        <div>
                            <FormLabel className="text-muted-foreground text-xs">Coordinates</FormLabel>
                            <div className="grid grid-cols-2 gap-x-4">
                                <FormInput type="number" name="coordinates.latitude" label="Latitude" placeholder="Latitude" />
                                <FormInput type="number" name="coordinates.longitude" label="Longitude" placeholder="Longitude" />
                            </div>
                        </div>

                        <div>
                            <FormLabel className="text-muted-foreground text-xs">Extra</FormLabel>
                            <FormSwitch name="isPartner" label="The business is a partner." />
                            <FormSwitch name="isNewOrRevised" label="The business is New/Revised." />
                        </div>

                    </div>


                </div>
            </div>
            <div className="rounded-lg bg-background mt-4 p-7 border border-foreground/20 shadow relative col-span-1">
                <MenuForm />
            </div>
        </div>

    )
}

export default RestaurantForm