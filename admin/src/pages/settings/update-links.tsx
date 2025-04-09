import { FormInput } from "@/components/form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { getSocialLinks, setSocialLinks } from "./api"
import { toast } from "@/hooks/use-toast"

const SocialLinksSchema = z.object({
    email: z.string().email(),
    facebook: z.string().url(),
    instagram: z.string().url(),
})

export type SocialLinksType = z.infer<typeof SocialLinksSchema>

function UpdateLinks() {
    const [open, setOpen] = useState(false)

    const { data, isSuccess, mutate } = useMutation({
        mutationKey: ["get-social-links"],
        mutationFn: getSocialLinks
    })

    const { mutate: setLinks } = useMutation({
        mutationKey: ["set-social-links"],
        mutationFn: setSocialLinks,
        onSuccess: () => {
            setOpen(false)
            form.reset()
            toast({
                variant: 'success',
                title: "Social links update successfully!",
            });
        }
    })

    useEffect(() => {
        if (isSuccess) {
            const { facebook, instagram, email } = data.socialLinks
            form.setValue("email", email)
            form.setValue("facebook", facebook)
            form.setValue("instagram", instagram)
        }
    }, [isSuccess])


    const form = useForm<SocialLinksType>({
        resolver: zodResolver(SocialLinksSchema),
        defaultValues: {
            email: '',
            facebook: '',
            instagram: ''
        }
    })

    useEffect(() => {
        if (!open) {
            form.reset()
        }
        if (open) {
            mutate()
        }
        return () => {

        }
    }, [open])

    const onSubmit = (data: SocialLinksType) => {
        setLinks(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"link"} className="p-0 h-auto">Update Links</Button>
            </DialogTrigger>
            <DialogContent className="text-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Social Links</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <SocialLinksForm />
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="default" disabled={false}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateLinks

const SocialLinksForm = () => {
    return (
        <div className='my-4'>
            <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                    <FormInput name="email" label="Email" type="email" placeholder="Email" />
                </div>
                <div className="grid gap-2">
                    <FormInput name="facebook" label="Facebook Link" type="url" placeholder="Facebook" />
                </div>
                <div className="grid gap-2">
                    <FormInput name="instagram" label="Instagram Link" type="url" placeholder="Instagram" />
                </div>
            </div>
        </div>
    )
}