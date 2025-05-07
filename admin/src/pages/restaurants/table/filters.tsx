import { Button } from '@/components/ui/button'
import { Settings2, UndoDot } from 'lucide-react'

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'

function Filters() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden h-8 lg:flex"
                >
                    <Settings2 />
                    Filters
                </Button>
            </DialogTrigger>
            <DialogContent className='text-foreground'>
                <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogDescription>
                        This action can help you obtain specific data based on your selected criteria.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-1 gap-y-2'>
                    <div className='grid grid-cols-3 justify-start items-center gap-2'>
                        <Label>
                            Creation date :
                        </Label>
                        <div className='col-span-2 flex justify-start items-center gap-1'>
                            <DatePickerWithRange />
                            <Button variant={'outline'} size={'icon'}><UndoDot /></Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-3  justify-start items-center gap-2'>
                        <Label>
                            Updated date :
                        </Label>
                        <div className='col-span-2 flex justify-start items-center gap-1'>
                            <DatePickerWithRange />
                            <Button variant={'outline'} size={'icon'}><UndoDot /></Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className='flex gap-2'>
                        <Button variant={'outline'}>Reset</Button>
                        <Button>Apply</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    )
}

export default Filters

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[255px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className='pt-2 px-4'>
                        <Select
                            onValueChange={(value) =>
                                console.log(addDays(new Date(), parseInt(value)))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="0">Today</SelectItem>
                                <SelectItem value="1">Tomorrow</SelectItem>
                                <SelectItem value="3">In 3 days</SelectItem>
                                <SelectItem value="7">In a week</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
