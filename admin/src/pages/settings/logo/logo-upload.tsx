import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

function LogoUpload() {
    const form = useFormContext()
    // Handle drag over event
    const handleDragOver = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
        e.stopPropagation();
    };

    // Handle drop event
    const handleDrop = (e: { preventDefault: () => void; stopPropagation: () => void; dataTransfer: { files: FileList }; }) => {
        e.preventDefault();
        e.stopPropagation();
        const list = e.dataTransfer.files
        form.setValue("logoFile", list)
    };
    const images = form.watch("logoFile")
    const [preview, setPreview] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (images) {
            if (images instanceof FileList && images.length > 0) {
                const image = images[0]
                const objectUrl = URL.createObjectURL(image)
                setPreview(objectUrl)
            }
        }
        return () => {

        }
    }, [images])

    const onReset = () => {
        setPreview(undefined)
        form.reset()
    }

    return (
        <>
            {preview &&
                <>
                    <div className="flex justify-center items-center p-2">
                        <img src={preview} />
                    </div>
                    <div>
                        <Button onClick={onReset}> Reset</Button>
                    </div>
                </>
            }
            {
                !preview && <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-muted dark:bg-background hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG</p>
                        </div>
                        <input
                            {...form.register("logoFile", {
                                required: "Recipe picture is required",
                            })}
                            className="hidden"
                            type="file"
                            id="dropzone-file"
                            accept="image/*"
                        />
                    </label>
                </div>
            }
        </>
    )
}

export default LogoUpload