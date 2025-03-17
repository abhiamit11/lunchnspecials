import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialogProps } from "@radix-ui/react-alert-dialog"

interface Props extends AlertDialogProps {
    title: string,
    description: string,
}

function ErrorAlertDialog({ open, onOpenChange, title, description }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="text-destructive">
                <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-destructive-foreground">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-destructive">

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <p className="font-normal dark:text-destructive-foreground">{description}</p>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-destructive dark:text-destructive-foreground">Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ErrorAlertDialog