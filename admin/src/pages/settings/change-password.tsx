import { FormPasswordInput } from "@/components/form"
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
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import passwordSchema, { passwordFormType } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { updatePassword } from "./api"


function ChangePassword() {
    const form = useForm<passwordFormType>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })
    const onSubmit = (data: passwordFormType) => {
        mutate(data)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            form.reset()
            setOpen(false)
            toast({
                variant: 'success',
                title: "Password changed successfully!",
            });

        },
    })

    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (!open) {
            form.reset()
        }
        return () => {

        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"link"} className="p-0 h-auto">Change password</Button>
            </DialogTrigger>
            <DialogContent className="text-foreground">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Change password</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <PasswordForm />
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" variant="default" disabled={isPending}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default ChangePassword

const PasswordForm = () => {
    return (
        <div className='my-4'>
            <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                    <FormPasswordInput name="currentPassword" label="Current Password" placeholder="Current Password" />
                </div>
                <div className="grid gap-2">
                    <FormPasswordInput name="newPassword" label="New Password" type="password" placeholder="Password" />
                </div>
                <div className="grid gap-2">
                    <FormPasswordInput name="confirmPassword" label="Confirm Password" type="password" placeholder="Password" />
                </div>
            </div>
        </div>
    )
}