import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

interface Props extends React.ComponentProps<"input"> {
    name: string
    label?: string
}

function FormPasswordInput({
    name,
    label,
    ...rest
}: Props) {
    const form = useFormContext()
    const [inputType, setInputType] = useState<"password" | "text">("password")
    const onTypeChange = () => {
        setInputType((type) => type === "password" ? "text" : "password")
    }
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='capitalize'>{label || name}</FormLabel>
                    <FormControl>
                        <div className='relative'>
                            <Input {...field} {...rest} type={inputType} />
                            <div className='absolute right-0 top-0 flex justify-center items-center h-10 z-20'>
                                <Button variant={"ghost"} size={'icon'} type='button' onClick={onTypeChange} className='rounded-l-none'>
                                    {inputType == 'text' ? <Eye className='' /> : <EyeClosed />}
                                </Button>
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormPasswordInput