import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { importRestaurants } from "../api";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/loader";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import ErrorAlertDialog from "./error-alert-dialog";

const formSchema = z.object({
    csv: z.custom<FileList>((v) => v instanceof FileList)
});

type formType = {
    csv: FileList | undefined
}
const defaultValues = {
    csv: undefined
};

function FileUpload() {
    const queryClient = useQueryClient()
    const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues
    });
    const [errorAlert, setErrorAlert] = useState(false)
    const [errorObj, setErrorObj] = useState({
        title: "",
        description: "",
    })
    const { mutate, isPending } = useMutation({
        mutationFn: importRestaurants,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["import-histroy"] })
            toast({
                variant: 'success',
                title: "Restaurants Data has been successfully imported.",
            });
            form.reset(defaultValues)
        },
        onError: (e) => {
            toast({
                variant: 'destructive',
                title: "Oops! Something went wrong. Please try again later.",
            });
            if (e instanceof AxiosError && axios.isAxiosError(e)) {
                const { data } = e.response as { data: { description: string } };
                if (data) {
                    setErrorAlert(true)
                    setErrorObj({
                        title: "Oops! Something went wrong.",
                        description: data.description
                    })
                }
            };
        }
    })

    const file = form.watch('csv')

    const onSubmit = (data: formType) => {
        if (data.csv && data.csv.length > 0) {
            const form = new FormData();
            form.append('csv', data.csv[0])
            mutate(form)
        }
    };

    const resetForm = () => {
        setTimeout(() => {
            form.reset()
        }, 100);
    }
    return (
        <>
            {/*  */}
            <ErrorAlertDialog open={errorAlert} onOpenChange={setErrorAlert} {...errorObj} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-center w-full">
                        {(!file || !(file.item)) ? <>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">CSV file only.</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" {...form.register("csv", { required: "File is required" })} accept="text/csv" />
                            </label>
                        </>
                            :
                            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg">
                                {isPending ?
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <Loader className="w-16 h-16" />
                                        <p className="max-w-sm text-center">Your file is being uploaded, and the data is being imported into the system. Please wait for the operation to complete.</p>
                                    </div>

                                    : <>
                                        <Button>Upload & Import</Button>

                                        <Button variant={'link'} size={"sm"} className="p-0" type="button" onClick={resetForm}>Reset</Button>
                                    </>
                                }
                            </div>
                        }

                    </div>
                </form>
            </Form >
        </>
    )
}

export default FileUpload