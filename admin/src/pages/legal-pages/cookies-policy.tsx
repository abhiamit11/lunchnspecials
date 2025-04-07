import QuillEditor from "@/components/QuillEditor";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Eye, Save } from "lucide-react";
import Quill from "quill";
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { CookiesSchema, CookiesType } from "./schema";
import { getCookiesContent, updateCookiesContent } from "./api";
import { useNavigate } from "@tanstack/react-router";

const Delta = Quill.import('delta');

function CookiesPolicy() {
    const [_range, setRange] = useState();
    const [readOnly, _setReadOnly] = useState(false);
    // Use a ref to access the quill instance directly
    const quillRef = useRef<Quill | null>(null);

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["cookies-policy-content"], //Array according to Documentation
        queryFn: getCookiesContent
    })

    useEffect(() => {
        if (isSuccess) {
            if (quillRef.current && quillRef.current.root) {
                quillRef.current.root.innerHTML = data.content
            }
        }

        return () => {

        }
    }, [isSuccess])


    const form = useForm<CookiesType>({
        resolver: zodResolver(CookiesSchema),
        defaultValues: {
            cookiesHtml: ''
        }
    })

    const onTextChange = () => {
        if (quillRef.current && quillRef.current.root) {
            form.setValue('cookiesHtml', quillRef.current.root.innerHTML)
        }
    }
    const [showPreview, setShowPreview] = useState(true)


    const onSubmit = (data: CookiesType) => {
        mutate(data)
    }

    const { mutate } = useMutation({
        mutationFn: updateCookiesContent,
        onSuccess: () => {
            form.reset()
            toast({
                variant: 'success',
                title: "Page content update successfully!",
            });
            refetch()
        },
    })

    const value = form.watch("cookiesHtml") || data?.content || '';
    const navigate = useNavigate()
    const goBack = () => {
        navigate({ to: '/legal-pages' })
    }

    return (
        <>
            <div className="flex justify-between items-center py-4 rounded-lg">
                <div className="flex justify-start items-center gap-2">
                    <Button variant={'ghost'} size={'icon'} onClick={goBack}><ChevronLeft /></Button>
                    <h1 className="text-2xl font-medium">Cookies Policy Page</h1>
                </div>

                <div className="flex justify-end items-center gap-2">
                    <Button onClick={() => setShowPreview(!showPreview)} variant={'ghost'}><Eye /> Preview </Button>
                    <Button onClick={form.handleSubmit(onSubmit)}><Save /> Save </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className={`${!showPreview ? 'col-span-2' : ''}`}>
                    <QuillEditor
                        ref={quillRef}
                        readOnly={readOnly}
                        defaultValue={new Delta().insert(data?.content || '')}
                        onSelectionChange={setRange}
                        onTextChange={onTextChange}
                    />
                </div>

                {showPreview && <div className="text-foreground p-4 border dark:bg-white/80">
                    <div className="revert-tailwind font-montserrat" dangerouslySetInnerHTML={{ __html: value }}></div>
                </div>}

            </div>
        </>
    )
}

export default CookiesPolicy