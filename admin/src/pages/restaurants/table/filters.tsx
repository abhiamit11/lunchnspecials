import { Button } from '@/components/ui/button'
import { Funnel, FunnelX, X } from 'lucide-react'

import * as React from "react"
import { format } from "date-fns"
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
import { Label } from '@/components/ui/label'
import { useNavigate, useSearch } from '@tanstack/react-router'

function Filters() {
    const [creationDate, setCreationDate] = React.useState<DateRange | undefined>(undefined)
    const [updatedDate, setUpdatedDate] = React.useState<DateRange | undefined>(undefined)
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate({ from: "" })
    const q = useSearch({ from: "" })

    React.useEffect(() => {
        if (open) {
            if (typeof q === 'object') {
                if (`createdAtStart` in q && `createdAtEnd` in q) {
                    setCreationDate({
                        from: q['createdAtStart'],
                        to: q['createdAtEnd']
                    })
                }
                if (`updatedAtStart` in q && `updatedAtEnd` in q) {
                    setUpdatedDate({
                        from: q['updatedAtStart'],
                        to: q['updatedAtEnd']
                    })
                }
            }
        }

        return () => {
            setCreationDate(undefined)
            setUpdatedDate(undefined)
        }
    }, [open])


    const onFiltersApply = () => {
        if (creationDate) {
            const createdAtStart = creationDate.from;
            const createdAtEnd = creationDate.to;

            navigate({
                search: (prev: any) => ({
                    ...prev,
                    createdAtStart,
                    createdAtEnd
                })
            })
        }

        if (updatedDate) {
            const updatedAtStart = updatedDate.from;
            const updatedAtEnd = updatedDate.to;

            navigate({
                search: (prev: any) => ({
                    ...prev,
                    updatedAtStart,
                    updatedAtEnd
                })
            })
        }

        setOpen(false)
    }

    const onFiltersReset = () => {
        navigate({
            search: (obj: any) => {
                delete obj.createdAtStart;
                delete obj.createdAtEnd;
                delete obj.updatedAtStart;
                delete obj.updatedAtEnd;
                return ({
                    ...obj
                })
            }
        })
        setOpen(false)
    }

    const onCreationReset = () => {
        navigate({
            search: (obj: any) => {
                delete obj.createdAtStart;
                delete obj.createdAtEnd;
                return ({
                    ...obj
                })
            }
        })
        setCreationDate(undefined)
    }

    const onUpdatedReset = () => {
        navigate({
            search: (obj: any) => {
                delete obj.updatedAtStart;
                delete obj.updatedAtEnd;
                return ({
                    ...obj
                })
            }
        })
        setUpdatedDate(undefined)
    }

    const onAllFiltersReset = () => {
        navigate({
            search: () => null
        })
        setUpdatedDate(undefined)
    }
    return (
        <>
            {(JSON.stringify(q) && JSON.stringify(q) != "{}") && <>
                <Button
                    variant="outline"
                    size="icon"
                    className="hidden h-8 lg:flex"
                    onClick={onAllFiltersReset}
                >
                    <FunnelX />
                </Button>
            </>}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden h-8 lg:flex"
                    >
                        <Funnel />
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
                            <div className='col-span-2 flex justify-start items-center gap-2'>
                                <DatePickerWithRange date={creationDate} setDate={setCreationDate} />
                                <Button variant={'outline'} size={'icon'} className='w-7 h-7' disabled={creationDate == undefined} onClick={onCreationReset}><X /></Button>
                            </div>
                        </div>
                        <div className='grid grid-cols-3  justify-start items-center gap-2'>
                            <Label>
                                Updated date :
                            </Label>
                            <div className='col-span-2 flex justify-start items-center gap-2'>
                                <DatePickerWithRange
                                    date={updatedDate}
                                    setDate={setUpdatedDate}
                                    fromDate={creationDate?.from}
                                    toDate={creationDate?.to} />
                                <Button variant={'outline'} size={'icon'} className='w-7 h-7' disabled={updatedDate == undefined} onClick={onUpdatedReset}><X /></Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className='flex gap-2'>
                            <Button variant={'outline'} onClick={onFiltersReset}>Reset</Button>
                            <Button onClick={onFiltersApply}>Apply</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Filters

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    date: DateRange | undefined,
    setDate: (d: DateRange | undefined) => void
    fromDate?: Date | undefined
    toDate?: Date | undefined
}

export function DatePickerWithRange({
    className,
    date,
    setDate,
    fromDate,
    toDate
}: Props) {
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
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        fromDate={fromDate}
                        toDate={toDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}