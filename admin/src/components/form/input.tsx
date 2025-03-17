import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'

interface Props extends React.ComponentProps<"input"> {
    name: string
    label?: string
}

function FormInput({
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
                        <Input {...field} {...rest} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInput