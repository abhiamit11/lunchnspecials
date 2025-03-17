import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { House } from "lucide-react"

function NotFound() {
    return (
        <section className="bg-background">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 h-dvh flex justify-center items-center">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-foreground dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-foreground">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <Button variant={"outline"} asChild>
                        <Link to={"/"} className="text-foreground">
                            <House />
                            Back to Homepage
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default NotFound