import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useFormContext } from 'react-hook-form'
import { Switch } from '../ui/switch'

interface Props extends React.ComponentProps<"input"> {
    name: string
    label?: string
}

function FormSwitch({
    name,
    label,
}: Props) {
    const form = useFormContext()
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex justify-start items-center gap-2 my-2.5">
                        <FormLabel className=''>{label || name}</FormLabel>
                        <FormControl>
                            <Switch
                                checked={field.value || false}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    )
}

export default FormSwitch