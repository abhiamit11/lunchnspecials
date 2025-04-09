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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { uploadLogo } from "../api"
import ImageUpload from "./logo-upload"
import { toast } from "@/hooks/use-toast"

const LogoSchema = z.object({
    logoFile: z.any(),
})

export type LogoType = z.infer<typeof LogoSchema>

function UpdateLogo() {
    const [open, setOpen] = useState(false)

    const { mutate: setLogo } = useMutation({
        mutationKey: ["set-logo"],
        mutationFn: uploadLogo,
        onSuccess: () => {
            setOpen(false)
            form.reset()
            toast({
                variant: 'success',
                title: "Site Logo update successfully!",
            });
        }
    })


    const form = useForm<LogoType>({
        resolver: zodResolver(LogoSchema),
        defaultValues: {
            logoFile: ''
        }
    })

    const onSubmit = (data: LogoType) => {
        if (data.logoFile && data.logoFile.length > 0) {
            const formdata = new FormData();
            formdata.append('logo', data.logoFile[0])
            setLogo(formdata)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"link"} className="p-0 h-auto">Update Logo</Button>
            </DialogTrigger>
            <DialogContent className="text-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Site Logo</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <div className='my-4'>
                            <ImageUpload />
                        </div>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="default" disabled={false}>
                                Upload
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateLogo