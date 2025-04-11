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
import { Input } from "@/components/ui/input"
import generateString from "@/lib/random-strings"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { deleteRestaurants } from "./api"

function DeleteEverything() {
    const [open, setOpen] = useState(false)
    const [randomStrings, setRandomStrings] = useState('')
    const [input, setInput] = useState('')
    useEffect(() => {
        if (open) {
            setRandomStrings(generateString(7))
        }

        return () => {
            setRandomStrings('')
            setInput('')
        }
    }, [open])

    const { mutate } = useMutation({
        mutationFn: deleteRestaurants,
        mutationKey: ['delete-all-restaurants'],
        onSuccess: () => {
            setRandomStrings('')
            setInput('')
            setOpen(false)
        },
    })

    const onConfirmDelete = () => {
        if (randomStrings === input) {
            mutate()
        }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"link"} className="p-0 h-auto text-destructive dark:text-destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="text-foreground">
                <DialogHeader>
                    <DialogTitle className="text-destructive text-2xl">Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div>
                    Are you sure you want to delete everything from the system? This action is irreversible.
                </div>

                <div>
                    <h1>Confirm Actions:</h1>
                    <p className="text-sm px-2 text-muted-foreground">
                        To confirm execution of the action, please enter the word shown below into the text box.
                    </p>
                    <div className="my-2">
                        <div className="w-fit block mx-auto text-destructive-foreground text-sm font-medium px-2.5 py-1.5 rounded-sm bg-destructive">
                            {randomStrings}
                        </div>
                    </div>
                    <Input placeholder="Please type the word to confirm." value={input} onChange={(e) => setInput(e.target.value)} />
                </div>

                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="destructive" disabled={randomStrings !== input} onClick={onConfirmDelete}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteEverything