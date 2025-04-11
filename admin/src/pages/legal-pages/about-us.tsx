import QuillEditor from "@/components/QuillEditor";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Code, Eye, EyeClosed, LetterText, Save } from "lucide-react";
import Quill from "quill";
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Toggle } from "@/components/ui/toggle";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getAboutContent, updateAboutContent } from "./api";
import { contentSchema, contentType } from "./schema";
import Loader from "@/components/loader";

function AboutUs() {
  const form = useForm<contentType>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: '',
      isHtml: true
    }
  })

  const [_range, setRange] = useState();
  const [readOnly, _setReadOnly] = useState(false);
  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill | null>(null);

  const { data, isSuccess, refetch, isLoading, isFetched } = useQuery({
    queryKey: ["about-content"], //Array according to Documentation
    queryFn: getAboutContent,
    placeholderData: keepPreviousData
  })

  const { mutate } = useMutation({
    mutationFn: updateAboutContent,
    onSuccess: () => {
      form.reset()
      toast({
        variant: 'success',
        title: "Page content update successfully!",
      });
      refetch()
    },
  })

  const [value, setValue] = useState(form.watch('content'))

  useEffect(() => {
    if (isSuccess && isFetched) {
      form.setValue('content', data.data.content)
      form.setValue('isHtml', data.data.isHtml)
      sethtmlOnly(data.data.isHtml)
      if (!data.data.isHtml)
        if (quillRef.current && quillRef.current.root) {
          quillRef.current.root.innerHTML = data.data.content
        }
    }
    return () => {

    }
  }, [isSuccess, isFetched])

  useEffect(() => {
    setValue(form.watch('content'))
    return () => {

    }
  }, [form.watch('content')])



  const [showPreview, setShowPreview] = useState(true)


  const onSubmit = (data: contentType) => {
    mutate(data)
  }

  const navigate = useNavigate()
  const goBack = () => {
    navigate({ to: '/legal-pages' })
  }
  const [htmlOnly, sethtmlOnly] = useState(true)

  const toggleHtmlOnly = () => {
    if (form.getValues('content')) {
      setOpenAlert(true)
      return;
    }
    onAccept();
  }

  const onAccept = () => {
    sethtmlOnly((x) => !x)
    form.setValue('isHtml', !htmlOnly)
    form.setValue('content', "")
  }

  const [openAlert, setOpenAlert] = useState(false)
  return (
    <>

      {isLoading &&
        <div className="flex justify-center items-center w-full h-full absolute text-center bg-background/90 px-2.5 top-0 z-50 left-0">
          <Loader className="h-12 w-12" />
        </div>
      }

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Format Change!</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your current content is in {htmlOnly ? 'HTML' : 'Text'} format. If you switch to {!htmlOnly ? 'HTML' : 'Text'} content, it will be lost, and if you press save, it will be saved as {!htmlOnly ? 'HTML' : 'Text'}. This may not display in the proper format.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-foreground">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onAccept}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-between items-center py-4 rounded-lg">
        <div className="flex justify-start items-center gap-2">
          <Button variant={'ghost'} size={'icon'} onClick={goBack}><ChevronLeft /></Button>
          <h1 className="text-2xl font-medium">About Site Page</h1>
        </div>

        <div className="flex justify-end items-center gap-2">
          <Toggle onPressedChange={toggleHtmlOnly} pressed={htmlOnly}>{
            htmlOnly ? <><Code /> HTML Format</> :
              <><LetterText /> Text Format </>
          }</Toggle>
          <Toggle onPressedChange={() => setShowPreview((x) => !x)} pressed={showPreview}>{showPreview ? <Eye /> : <EyeClosed />} Preview </Toggle>
          <Button onClick={form.handleSubmit(onSubmit)}><Save /> Save </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {!isLoading && <>
          <Form {...form}>
            {htmlOnly ?
              <FormField
                control={form.control}
                name={'content'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} className='dark:bg-white/80 dark:text-black rounded-none min-h-[650px] h-full max-h-dvh' />
                    </FormControl>
                  </FormItem>
                )}
              />

              : <div className={`${!showPreview ? 'col-span-2' : ''}`}>
                <FormField
                  control={form.control}
                  name={'content'}
                  render={({ field }) => (
                    <QuillEditor
                      ref={quillRef}
                      readOnly={readOnly}
                      defaultValue={field.value}
                      onSelectionChange={setRange}
                      onTextChange={field.onChange}
                    />)}
                />
              </div>}
          </Form>
        </>
        }

        {showPreview && <div className="p-4 border dark:bg-white/80 max-h-dvh overflow-auto">
          <div className="no-tailwind text-black" dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>}

      </div>
    </>
  )
}

export default AboutUs