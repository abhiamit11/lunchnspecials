import { menuItemSchema } from '../../schema'
import { MenuItem } from "../../types"
import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ZodError } from 'zod'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useFormContext } from 'react-hook-form'

type ErrorObject = {
    _errors: string[]; // Array of errors, assumed to be strings
};

type ErrorsObject = {
    [key: string]: ErrorObject;
};


const RestaurantItemForm = ({ index, onOpenChange }: { index: number, onOpenChange(): void }) => {
    const form = useFormContext()
    const [errors, setErrors] = useState<ErrorsObject | undefined>()
    const [menu, setMenu] = useState<MenuItem>({
        name: '',
        description: '',
        day: '',
        price: '',
        category: '',
        timings: {
            opening: '',
            closing: ''
        }
    })

    const Resolver = () => {
        try {
            menuItemSchema.parse(menu);
            setErrors(undefined)
            return true
        } catch (error) {
            if (error instanceof ZodError) {
                console.error(error)
                setErrors(error.format() as unknown as ErrorsObject)
            }
        }
    }

    useEffect(() => {
        if (index > -1) {
            const values: MenuItem = form.getValues(`menu[${index}]`)
            if (values) setMenu((old) => ({ ...old, ...values }));
        }
        return () => {

        }
    }, [index])


    const onAddMenuItem = () => {
        try {
            if (Resolver()) {
                form.setValue(`menu[${index}]`, menu)
                onOpenChange()
            }
        } catch (error) {

        }
    }

    const weekdays = [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" }
    ];

    const categories = [
        { label: "Lunch", value: "lunch" },
        { label: "Drink", value: "drink" },
        { label: "Coffee/Tea", value: "ct" },
    ]

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (errors) {
            Resolver()
        }
        setMenu({
            ...menu,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const onTimingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (errors) {
            Resolver()
        }
        setMenu({
            ...menu,
            timings: {
                ...menu.timings,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }


    const onSelectChange = (value: string) => {
        if (errors) {
            Resolver()
        }
        setMenu({
            ...menu,
            day: value
        })
    }

    const onSelectCategory = (value: string) => {
        if (errors) {
            Resolver()
        }
        setMenu({
            ...menu,
            category: value
        })
    }
    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-foreground'>Restaurant Menu</DialogTitle>
            </DialogHeader>
            <div className='grid grid-cols-1 gap-3 text-foreground'>
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <Label className={cn(errors && errors['name'] && "text-destructive")}>Name</Label>
                        <Input name={`name`} placeholder="Name" onChange={onInputChange} className={cn('mt-2 ')} value={menu.name} />
                        <ErrorMessage error={errors && errors['name']} />
                    </div>
                    <div>
                        <Label className={cn(errors && errors['category'] && "text-destructive")}>Category</Label>
                        <Select onValueChange={onSelectCategory} value={menu.category}>
                            <SelectTrigger className={cn("mt-2 w-full")}>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((item, index) => (
                                    <SelectItem key={`weekday_${item.value}_${index}`} value={item.value}>{item.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <ErrorMessage error={errors && errors['category']} />
                    </div>
                </div>

                <div>
                    <Label className={cn(errors && errors['description'] && "text-destructive")}>Description</Label>
                    <Textarea name={`description`} placeholder="Description" className={cn('mt-2 resize-none')} onChange={onInputChange} value={menu.description} />
                    <ErrorMessage error={errors && errors['description']} />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <Label className={cn(errors && errors['day'] && "text-destructive")}>Day</Label>
                        <Select onValueChange={onSelectChange} value={menu.day}>
                            <SelectTrigger className={cn("mt-2 w-full")}>
                                <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                                {weekdays.map((day, index) => (
                                    <SelectItem key={`weekday_${day.value}_${index}`} value={day.value}>{day.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <ErrorMessage error={errors && errors['day']} />
                    </div>

                    <div>
                        <Label className={cn(errors && errors['price'] && "text-destructive")}>Price</Label>
                        <Input type='number' name={`price`} placeholder="Price" onChange={onInputChange} className={cn('mt-2')} value={menu.price} />
                        <ErrorMessage error={errors && errors['price']} />
                    </div>
                </div>

                <div>
                    <div className='flex justify-between items-center'>
                        <Label className="text-muted-foreground text-xs">Timings</Label>
                        <ErrorMessage error={errors && errors.timings && { _errors: ['Required'] }} />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div>
                            <Label className={cn(errors && errors['timings'] && "text-destructive")}>Start</Label>
                            <Input type="time" name="opening" placeholder="Opening" className={cn('mt-2')} onChange={onTimingsChange} value={menu.timings.opening || ""} />

                        </div>
                        <div>
                            <Label className={cn(errors && errors['timings'] && "text-destructive")}>Close</Label>
                            <Input type="time" name="closing" placeholder="Closing" className={cn('mt-2')} onChange={onTimingsChange} value={menu.timings.closing || ""} />
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button type="button" variant="default" onClick={onAddMenuItem}>
                    Add
                </Button>
            </DialogFooter>
        </>
    )
}


const ErrorMessage = ({ error }: { error: ErrorObject | undefined }) => {

    if (!error) {
        return null
    }

    return (
        <p
            id={error._errors.toString()}
            className={cn("mt-2 text-sm font-medium text-red-500 dark:text-red-900")}
        >
            {error._errors.toString()}
        </p>
    )
}

export default RestaurantItemForm;