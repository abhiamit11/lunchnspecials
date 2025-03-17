import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '../ui/textarea'

interface Props extends React.ComponentProps<"textarea"> {
    name: string
    label?: string
}

function FormTextarea({
    name,
    label,
    ...rest
}: Props) {
    const form = useFormContext()
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='capitalize'>{label || name}</FormLabel>
                    <FormControl>
                        <Textarea {...field} {...rest} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormTextarea