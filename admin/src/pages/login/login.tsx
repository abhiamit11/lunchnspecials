import { useForm } from "react-hook-form"
import { LoginForm } from "./form"
import { Form } from "@/components/ui/form"
import { SigninformSchema, SigninFormType } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "@tanstack/react-router"
import { signin } from "./api"
import useAuth from "@/hooks/use-auth"

const defaultValues: SigninFormType = {
    email: "",
    password: ""
}
export default function Login() {
    const navigate = useNavigate({ from: '' })
    const { setToken } = useAuth()
    const form = useForm<SigninFormType>({
        resolver: zodResolver(SigninformSchema),
        defaultValues
    })

    const { mutate } = useMutation({
        mutationFn: signin,
        onError: () => {
            toast({
                variant: 'destructive',
                title: "Please enter valid credentials to log in!",
                description: "Make sure your email and password are correct."
            });
        },
        onSuccess: (data) => {
            setToken(data.data.token)
            navigate({ to: '/' })
        },
    })

    // Define a submit handler.
    function onSubmit(values: SigninFormType) {
        mutate(values)
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
            <div className="w-full max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <LoginForm />
                    </form>
                </Form>
            </div>
        </div >
    )
}
